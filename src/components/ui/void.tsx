type VoidProps = {
  height?: string;
  className?: string;
};

export function Void({ height = "20vh", className = "" }: VoidProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ height }}
    />
  );
}
