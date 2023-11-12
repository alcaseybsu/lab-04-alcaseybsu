// Create a new type but make all of the properties optional
export type AllOptional<Type> = {
  [Property in keyof Type]?: Type[Property];
};

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface TodoFields {
  userId: number;
  title: string;
  completed: boolean;
}

export type TodoOptionalFields = AllOptional<TodoFields>;

export interface User {
  id: number;
  name: string;
  email: string;
  // there are more properties on User but we will not use them
}

export type GetTodo = (id: number) => Promise<Todo | undefined>;
export type GetUser = (id: number) => Promise<User | undefined>;
export type CreateTodo = (newTodo: TodoFields) => Promise<Todo | undefined>;
export type DeleteTodo = (id: number) => Promise<boolean | undefined>;
export type GetUserTodos = (userId: number) => Promise<Todo[] | undefined>;
export type ReplaceTodo = (newTodo: Todo) => Promise<Todo | undefined>;
export type UpdateTodo = (
  id: number,
  updatedTodo: TodoOptionalFields,
) => Promise<Todo | undefined>;

export interface TodoMethods {
  getTodo: GetTodo;
  createTodo: CreateTodo;
  replaceTodo: ReplaceTodo;
  updateTodo: UpdateTodo;
  deleteTodo: DeleteTodo;
  getUser: GetUser;
  getUserTodos: GetUserTodos;
}

export function enforceTypes(impl: TodoMethods): TodoMethods {
  return impl;
}
