import type { WorkflowContent } from "./workflow.types";

const cta = { label: "Get Started", href: "/sign-up" } as const;

const workflowContent = {
  title: "Your workflow, streamlined",
  description:
    "From brief to launch, every stage lives in one place so work keeps moving.",
  steps: [
    {
      id: "plan",
      tabLabel: "Plan Your Projects",
      stepLabel: "Step 1",
      title: "Plan your projects",
      description:
        "Work together in real time with shared updates, instant feedback, and seamless handoffs.",
      cta,
      nodes: [
        {
          id: "brief",
          label: "Project brief",
          detail: "Scope approved",
          status: "done",
          x: 22,
          y: 18,
        },
        {
          id: "research",
          label: "Research",
          detail: "3 of 4 tasks",
          status: "active",
          x: 22,
          y: 52,
        },
        {
          id: "milestones",
          label: "Milestones",
          detail: "Set 5 goals",
          status: "todo",
          x: 70,
          y: 30,
        },
        {
          id: "timeline",
          label: "Timeline",
          detail: "Due Oct 12",
          status: "todo",
          x: 70,
          y: 66,
        },
        {
          id: "kickoff",
          label: "Kickoff",
          detail: "Invite the team",
          status: "todo",
          x: 22,
          y: 86,
        },
      ],
      edges: [
        ["brief", "research"],
        ["research", "milestones"],
        ["research", "timeline"],
        ["research", "kickoff"],
      ],
    },
    {
      id: "assign",
      tabLabel: "Create Tasks & Assign",
      stepLabel: "Step 2",
      title: "Create tasks & assign",
      description:
        "Break work into clear tasks, set owners and due dates, and let automations route the rest.",
      cta,
      nodes: [
        {
          id: "backlog",
          label: "Backlog",
          detail: "18 tasks",
          status: "done",
          x: 22,
          y: 30,
        },
        {
          id: "design",
          label: "Design",
          detail: "Assigned to Mia",
          status: "active",
          x: 70,
          y: 18,
        },
        {
          id: "copy",
          label: "Copywriting",
          detail: "Assigned to Leo",
          status: "active",
          x: 70,
          y: 50,
        },
        {
          id: "dev",
          label: "Development",
          detail: "Unassigned",
          status: "todo",
          x: 70,
          y: 82,
        },
        {
          id: "rules",
          label: "Auto-assign",
          detail: "By skill",
          status: "done",
          x: 22,
          y: 70,
        },
      ],
      edges: [
        ["backlog", "design"],
        ["backlog", "copy"],
        ["rules", "dev"],
        ["backlog", "rules"],
      ],
    },
    {
      id: "collaborate",
      tabLabel: "Collaborate Seamlessly",
      stepLabel: "Step 3",
      title: "Collaborate seamlessly",
      description:
        "Comment on work in context, review versions side by side, and keep every decision traceable.",
      cta,
      nodes: [
        {
          id: "draft",
          label: "Draft v2",
          detail: "Uploaded",
          status: "done",
          x: 22,
          y: 24,
        },
        {
          id: "review",
          label: "Design review",
          detail: "4 comments",
          status: "active",
          x: 70,
          y: 24,
        },
        {
          id: "revise",
          label: "Revisions",
          detail: "2 open",
          status: "active",
          x: 70,
          y: 62,
        },
        {
          id: "signoff",
          label: "Client sign-off",
          detail: "Pending",
          status: "todo",
          x: 22,
          y: 72,
        },
      ],
      edges: [
        ["draft", "review"],
        ["review", "revise"],
        ["revise", "signoff"],
      ],
    },
    {
      id: "launch",
      tabLabel: "Launch Confidently",
      stepLabel: "Step 4",
      title: "Launch confidently",
      description:
        "Run final checks, ship on schedule, and report results to stakeholders in one click.",
      cta,
      nodes: [
        {
          id: "qa",
          label: "QA checklist",
          detail: "12 of 12",
          status: "done",
          x: 22,
          y: 22,
        },
        {
          id: "approve",
          label: "Approval",
          detail: "Signed off",
          status: "done",
          x: 22,
          y: 62,
        },
        {
          id: "ship",
          label: "Go live",
          detail: "Today, 10:00",
          status: "active",
          x: 70,
          y: 42,
        },
        {
          id: "report",
          label: "Results report",
          detail: "Auto-shared",
          status: "todo",
          x: 70,
          y: 80,
        },
      ],
      edges: [
        ["qa", "approve"],
        ["approve", "ship"],
        ["ship", "report"],
      ],
    },
  ],
} as const satisfies WorkflowContent;

export function getWorkflowContent(): WorkflowContent {
  return workflowContent;
}
