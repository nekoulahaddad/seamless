const points = [
  'Pharmaceutical specialization',
  'Market-specific understanding across the Arab region',
  'Registration and dossier readiness',
  'Entry strategies tailored to the portfolio',
  'Access to potential importers, distributors and manufacturers',
  'Relationship development for sustained market entry',
] as const;

export function renderDifferentiators(): string {
  return `<section id="why-work-with-us" class="section credibility" data-scene="credibility"><div class="inset split">
    <div><p class="kicker">Why work with us</p><h2>Regional context for pharmaceutical decisions.</h2></div>
    <ul class="principles">${points.map((point)=>`<li>${point}</li>`).join('')}</ul>
    </div></section>`;
}
