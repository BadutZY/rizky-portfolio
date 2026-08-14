const MARQUEE_TAGS = [
  "html",
  "css",
  "javascript",
  "react",
  "tailwind",
  "java",
  "fabric",
  "unity",
  "c#",
];

export function TechMarquee() {
  return (
    <div className="overflow-hidden border-b-4 border-border bg-primary py-3">
      <div className="anim-marquee flex w-max">
        {[0, 1, 2, 3].map((dup) => (
          <div key={dup} className="flex shrink-0">
            {MARQUEE_TAGS.map((t) => (
              <span
                key={t + dup}
                className="pixel-label px-6 text-primary-foreground"
                style={{ fontSize: 10 }}
              >
                {t} &nbsp;&#9632;
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}