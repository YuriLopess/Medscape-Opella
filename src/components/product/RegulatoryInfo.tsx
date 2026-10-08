import type { ReactNode } from 'react';

export function RegulatoryInfo({ paragraphs }: { paragraphs: ReactNode[] }) {
  return (
    <section className="p-regulatory" aria-labelledby="regulatory-title">
      <h2 className="p-regulatory__title" id="regulatory-title">
        Informações Regulatórias
      </h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="p-regulatory__text">
          {p}
        </p>
      ))}
    </section>
  );
}
