/*
 * Carrossel circular reutilizável.
 *
 * Marcação esperada:
 *   [data-carousel]
 *     [data-carousel-prev] / [data-carousel-next]
 *     [data-carousel-viewport] > [data-carousel-track] > itens
 *     [data-carousel-dots]
 *
 * Cada avanço desloca um item; ao final da transição o item que saiu é
 * movido para a outra ponta, então o carrossel nunca "acaba". Um ponto
 * por item indica qual está na primeira posição.
 */
(function () {
  'use strict';

  var DURATION = 450;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function Carousel(root) {
    this.root = root;
    this.track = root.querySelector('[data-carousel-track]');
    this.viewport = root.querySelector('[data-carousel-viewport]');
    this.dotsWrap = root.querySelector('[data-carousel-dots]');
    this.items = Array.prototype.slice.call(this.track.children);
    this.count = this.items.length;
    this.index = 0;
    this.busy = false;

    this.items.forEach(function (item, i) { item.dataset.carouselIndex = i; });

    this.buildDots();
    this.bind();
    this.update();
  }

  Carousel.prototype.step = function () {
    var first = this.track.children[0];
    var gap = parseFloat(getComputedStyle(this.track).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  };

  Carousel.prototype.buildDots = function () {
    if (!this.dotsWrap) return;
    var self = this;
    this.dots = this.items.map(function (item, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Ir para o item ' + (i + 1) + ' de ' + self.count);
      b.addEventListener('click', function () { self.goTo(i); });
      self.dotsWrap.appendChild(b);
      return b;
    });
  };

  Carousel.prototype.update = function () {
    var self = this;
    if (this.dots) {
      this.dots.forEach(function (d, i) {
        d.setAttribute('aria-current', i === self.index ? 'true' : 'false');
      });
    }
  };

  Carousel.prototype.animate = function (from, to, done) {
    var track = this.track;
    var instant = reduceMotion.matches;
    track.style.transition = 'none';
    track.style.transform = 'translateX(' + from + 'px)';
    track.getBoundingClientRect(); // força reflow antes da transição
    if (instant) {
      track.style.transform = 'translateX(' + to + 'px)';
      done();
      return;
    }
    track.style.transition = 'transform ' + DURATION + 'ms cubic-bezier(.22,.61,.36,1)';
    track.style.transform = 'translateX(' + to + 'px)';
    var finished = false;
    function end() {
      if (finished) return;
      finished = true;
      track.removeEventListener('transitionend', end);
      done();
    }
    track.addEventListener('transitionend', end);
    setTimeout(end, DURATION + 80);
  };

  Carousel.prototype.reset = function () {
    this.track.style.transition = 'none';
    this.track.style.transform = 'translateX(0)';
  };

  // n > 0 avança, n < 0 volta
  Carousel.prototype.move = function (n) {
    if (this.busy || n === 0) return;
    this.busy = true;
    var self = this;
    var step = this.step();
    var i;

    if (n > 0) {
      this.animate(0, -step * n, function () {
        for (i = 0; i < n; i++) self.track.appendChild(self.track.children[0]);
        self.reset();
        self.busy = false;
      });
    } else {
      for (i = 0; i < -n; i++) self.track.insertBefore(self.track.lastElementChild, self.track.children[0]);
      this.animate(step * n, 0, function () {
        self.reset();
        self.busy = false;
      });
    }

    this.index = ((this.index + n) % this.count + this.count) % this.count;
    this.update();
  };

  Carousel.prototype.goTo = function (target) {
    var diff = target - this.index;
    // caminho mais curto ao redor do círculo
    if (diff > this.count / 2) diff -= this.count;
    if (diff < -this.count / 2) diff += this.count;
    this.move(diff);
  };

  Carousel.prototype.bind = function () {
    var self = this;
    var prev = this.root.querySelector('[data-carousel-prev]');
    var next = this.root.querySelector('[data-carousel-next]');
    if (prev) prev.addEventListener('click', function () { self.move(-1); });
    if (next) next.addEventListener('click', function () { self.move(1); });

    this.root.addEventListener('keydown', function (e) {
      if (e.target.closest('a')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); self.move(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); self.move(1); }
    });

    // swipe (touch / caneta)
    var startX = null;
    var startY = null;
    this.viewport.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      startX = e.clientX;
      startY = e.clientY;
    });
    this.viewport.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      startX = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) self.move(dx < 0 ? 1 : -1);
    });
    this.viewport.addEventListener('pointercancel', function () { startX = null; });
  };

  document.querySelectorAll('[data-carousel]').forEach(function (el) {
    new Carousel(el);
  });
})();
