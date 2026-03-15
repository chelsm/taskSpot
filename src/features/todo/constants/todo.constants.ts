// src/features/todo/constants/todo.constants.ts

export const COLORS_PASTEL = ["#ecc7c6", "#f6e0c4", "#d5d2fa", "#c9efdd"] as const;

export const DASHBOARD_CONTENT = {
  lists: {
    title: "Things to do",
    subtitle: "Welcome to your dashboard! View and manage your todo lists.",
  },
  create: {
    title: "Create a new list",
    subtitle: "Add tasks and organize your work.",
  },
  details: {
    title: "List details",
    subtitle: "Manage tasks inside your list.",
  },
} as const;
