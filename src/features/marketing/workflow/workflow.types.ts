import type { Cta } from "@/shared/types";

export type FlowNodeStatus = "done" | "active" | "todo";

/** A card on the flow canvas. `x`/`y` are the card's centre, in % of the canvas. */
export type FlowNode = {
  id: string;
  label: string;
  detail: string;
  status: FlowNodeStatus;
  x: number;
  y: number;
};

export type WorkflowStep = {
  id: string;
  tabLabel: string;
  stepLabel: string;
  title: string;
  description: string;
  cta: Cta;
  nodes: readonly FlowNode[];
  /** Connections as [fromNodeId, toNodeId]. */
  edges: readonly (readonly [string, string])[];
};

export type WorkflowContent = {
  title: string;
  description: string;
  steps: readonly WorkflowStep[];
};
