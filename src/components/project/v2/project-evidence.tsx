import type { ProjectMetric } from "@/types/project";

type ProjectEvidenceProps = {
  metrics: ProjectMetric[];
};

export function ProjectEvidence({ metrics }: ProjectEvidenceProps) {
  return (
    <section className="bg-background px-8 py-24 md:px-16 md:py-32 lg:px-24">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-8 md:grid-cols-3">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="reveal-rise flex flex-col gap-3"
              style={{
                borderLeft: i > 0 ? "1px solid hsl(var(--accent) / 0.2)" : "none",
                paddingLeft: i > 0 ? "2rem" : "0",
              }}
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
              <p className="text-sm text-muted-foreground">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
