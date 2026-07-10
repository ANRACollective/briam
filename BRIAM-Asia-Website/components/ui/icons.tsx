/**
 * Thin line icons (24×24, currentColor) used for the value-prop sections —
 * quick visual scanning, in the spirit of the reference sites' icon tiles.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function IconDesign(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 20h16" />
      <path d="M6 20V8l6-4 6 4v12" />
      <path d="M9 20v-5h6v5" />
      <path d="M12 4v3" />
    </svg>
  );
}

export function IconFabrication(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 20h18" />
      <path d="M4 20V10l5 3V10l5 3V6l6 3v11" />
      <path d="M7.5 20v-3" />
      <path d="M12.5 20v-3" />
    </svg>
  );
}

export function IconInstallation(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 21V4l12 2" />
      <path d="M5 8l11 1.7" />
      <path d="M16 6l3 1v3" />
      <path d="M19 10l-3 2" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function IconConveying(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="6.5" cy="15" r="2.2" />
      <circle cx="17.5" cy="15" r="2.2" />
      <path d="M6.5 12.8h11" />
      <path d="M9 8h8m0 0-2.2-2.2M17 8l-2.2 2.2" />
    </svg>
  );
}

export function IconAeration(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M3 12h13a2.5 2.5 0 1 1-2.5 2.5" />
      <path d="M3 16h7a2 2 0 1 1-2 2" />
    </svg>
  );
}

export function IconMaintenance(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
    </svg>
  );
}

export function IconProjects(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 21V9l6-4 6 4v12" />
      <path d="M9 21v-4h2v4" />
      <path d="M7.5 9.5h.01M12.5 9.5h.01M7.5 13h.01M12.5 13h.01" />
      <path d="M16 21V11l4 2.5V21" />
      <path d="M4 21h18" />
    </svg>
  );
}

export function IconParts(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="M4 7l8 4 8-4" />
      <path d="M12 11v10" />
    </svg>
  );
}

export function IconAlliance(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
    </svg>
  );
}

// Ordered to match the Engineering Capabilities steps.
export const STEP_ICONS = [
  IconDesign,
  IconFabrication,
  IconInstallation,
  IconConveying,
  IconAeration,
  IconMaintenance,
];
