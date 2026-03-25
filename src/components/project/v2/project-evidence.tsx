import type { ProjectMetric } from "@/types/project";

type ProjectEvidenceProps = {
  metrics: ProjectMetric[];
};

export function ProjectEvidence({ metrics }: ProjectEvidenceProps) {
  return (
    <section className="bg-background px-8 py-24 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto max-w-[1800px]">
        <span
          className="reveal-illuminate text-micro uppercase tracking-[0.22em]"
          style={{ color: "hsl(var(--accent))" }}
        >
          Números
        </span>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`reveal-rise flex flex-col gap-3 ${i > 0 ? "md:border-l md:pl-8" : ""}`}
              style={i > 0 ? { borderColor: "hsl(var(--accent) / 0.2)" } : undefined}
            >
              <span className="text-monumental font-extrabold text-foreground">
                {metric.value}
              </span>
              <span
                className="text-micro uppercase tracking-[0.22em]"
                style={{ color: "hsl(var(--accent))" }}
              >
                {metric.label}
              </span>
              <p className="text-caption text-muted-foreground">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
