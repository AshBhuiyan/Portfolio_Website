import {
  Code2,
  Database,
  Wrench,
  GraduationCap,
  Music4,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Icon registry keyed by string. Data files reference icons by name so that
// data (plain, serializable objects) can be passed from Server Components into
// Client Components without crossing the function-prop boundary that Next.js
// disallows. Client cards resolve the name back into a component here.
export const iconMap = {
  code2: Code2,
  database: Database,
  wrench: Wrench,
  graduationCap: GraduationCap,
  music4: Music4,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;
