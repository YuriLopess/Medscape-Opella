interface Props {
  count: number;
  active: number;
  onSelect: (i: number) => void;
  className?: string;
}

/** Um ponto por item; o ativo recebe aria-current. */
export function CarouselDots({ count, active, onSelect, className }: Props) {
  return (
    <div className={['carousel-dots', className].filter(Boolean).join(' ')}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Ir para o item ${i + 1} de ${count}`}
          aria-current={i === active ? 'true' : 'false'}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}
