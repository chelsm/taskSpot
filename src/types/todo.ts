export interface TodoList {
  id: string
  title: string
  ownerId: string
  users: string[]
  createdAt: Date
  modifiedAt: Date
}

export interface Task {
  id: string
  description: string
  completed: boolean
  createdAt: Date
  modifiedAt: Date
}
