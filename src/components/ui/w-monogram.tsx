import { type SVGProps } from "react";

/**
 * W.VIANA monogram mark — two overlapping V shapes forming the distinctive W.
 * Based on the official brand manual geometry.
 */
export function WMonogram({
  size = 24,
  color = "currentColor",
  ...props
}: { size?: number; color?: string } & Omit<SVGProps<SVGSVGElement>, "width" | "height">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-monogram js-w-monogram ${props.className || ""}`}
      {...props}
    >
      {/* First V — left */}
      <path
        d="M8 20L30 80L50 32"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Second V — right, overlapping */}
      <path
        d="M50 32L70 80L92 20"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
