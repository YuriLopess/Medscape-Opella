import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, PointerEvent } from 'react';
import { useReducedMotion } from './useReducedMotion';

const DURATION = 450;
const EASING = 'cubic-bezier(.22,.61,.36,1)';

interface Options {
  count: number;
  /** avanço automático a cada N ms (0 = desligado) */
  autoplay?: number;
}

/**
 * Carrossel circular. Os itens são renderizados em ordem rotacionada (`order`),
 * começando pelo item ativo; cada avanço desliza a trilha uma posição e, ao
 * fim da transição, a rotação é atualizada e a trilha volta para 0 antes do
 * próximo frame — então o carrossel nunca "acaba".
 *
 * Autoplay pausa com o mouse ou o foco dentro, com a aba oculta, quando o
 * usuário prefere menos movimento e pelo botão de pausar (`toggle`).
 */
export function useCarousel({ count, autoplay = 0 }: Options) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const busy = useRef(false);
  /** ao voltar, a trilha precisa começar deslocada antes de animar até 0 */
  const pendingFrom = useRef<number | null>(null);

  const [stopped, setStopped] = useState(() => reduceMotion);
  const [held, setHeld] = useState(0);
  const [pageHidden, setPageHidden] = useState(false);

  const order = Array.from({ length: count }, (_, i) => (index + i) % count);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return (track.children[0] as HTMLElement).getBoundingClientRect().width + gap;
  }, []);

  const animate = useCallback(
    (from: number, to: number, done: () => void) => {
      const track = trackRef.current;
      if (!track) return done();
      track.style.transition = 'none';
      track.style.transform = `translateX(${from}px)`;
      void track.getBoundingClientRect(); // força reflow antes da transição
      if (reduceMotion) {
        track.style.transform = `translateX(${to}px)`;
        return done();
      }
      track.style.transition = `transform ${DURATION}ms ${EASING}`;
      track.style.transform = `translateX(${to}px)`;
      let finished = false;
      const end = () => {
        if (finished) return;
        finished = true;
        track.removeEventListener('transitionend', end);
        done();
      };
      track.addEventListener('transitionend', end);
      window.setTimeout(end, DURATION + 80);
    },
    [reduceMotion],
  );

  // Depois de cada rotação: ou anima a volta (prev), ou zera a trilha (next).
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (pendingFrom.current !== null) {
      const from = pendingFrom.current;
      pendingFrom.current = null;
      animate(from, 0, () => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        busy.current = false;
      });
    } else {
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      busy.current = false;
    }
  }, [index, animate]);

  /** n > 0 avança, n < 0 volta */
  const move = useCallback(
    (n: number) => {
      if (busy.current || n === 0 || count < 2) return;
      busy.current = true;
      const s = step();
      if (n > 0) {
        // a trava (busy) é liberada no layout effect, já com a nova ordem
        animate(0, -s * n, () => setIndex((i) => (i + n) % count));
      } else {
        pendingFrom.current = s * n;
        setIndex((i) => (((i + n) % count) + count) % count);
      }
    },
    [animate, count, step],
  );

  const goTo = useCallback(
    (target: number) => {
      let diff = target - index;
      // caminho mais curto ao redor do círculo
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      move(diff);
    },
    [count, index, move],
  );

  // ---------- autoplay ----------
  useEffect(() => {
    if (reduceMotion) setStopped(true);
  }, [reduceMotion]);

  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (!autoplay || stopped || held > 0 || pageHidden) return;
    const t = window.setTimeout(() => move(1), autoplay);
    return () => window.clearTimeout(t);
  }, [autoplay, stopped, held, pageHidden, index, move]);

  const hold = () => setHeld((h) => h + 1);
  const release = () => setHeld((h) => Math.max(0, h - 1));

  // ---------- props para os elementos ----------
  const rootProps = {
    onKeyDown: (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('a')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
    },
    ...(autoplay
      ? {
          onMouseEnter: hold,
          onMouseLeave: release,
          onFocus: (e: FocusEvent) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) hold(); },
          onBlur: (e: FocusEvent) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) release(); },
        }
      : {}),
  };

  // swipe (touch / caneta)
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const viewportProps = {
    onPointerDown: (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') swipe.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: (e: PointerEvent) => {
      const start = swipe.current;
      swipe.current = null;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
    },
    onPointerCancel: () => { swipe.current = null; },
  };

  return {
    index,
    order,
    trackRef,
    next: () => move(1),
    prev: () => move(-1),
    goTo,
    rootProps,
    viewportProps,
    stopped,
    toggle: () => setStopped((s) => !s),
  };
}
