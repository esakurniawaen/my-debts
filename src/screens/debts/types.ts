import type { ElementColor } from "~/types";

export type DebtColor = Extract<ElementColor, "YELLOW" | "LIME">;
