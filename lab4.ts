import { User, Todo, TodoFields, TodoOptionalFields } from "./types";

function getTodo(id: number): Promise<Todo | undefined> {
  // TODO: Replace the method body with code that fetches
  // the Todo and returns it.
  // If there is any error, the method should return undefined
  console.log(`getTodo(${id})`);
  return Promise.resolve(undefined); // DELETE ME
}

function deleteTodo(id: number): Promise<true | undefined> {
  // TODO: Replace the method body with code that deletes
  // the Todo. If the delete request succeeded, return true
  // otherwise return undefined.
  console.log(`deleteTodo(${id})`);
  return Promise.resolve(undefined); // DELETE ME
}

function createTodo(newTodo: TodoFields): Promise<Todo | undefined> {
  // TODO: Replace the method body with code that creates
  // a new Todo and returns it.
  // If there is any error, the method should return undefined
  console.log(`createTodo(${JSON.stringify(newTodo)})`);
  return Promise.resolve(undefined); // DELETE ME
}

function replaceTodo(newTodo: Todo): Promise<Todo | undefined> {
  // TODO: Replace the method body with code that replaces
  // and existing Todo completely and returns it.
  // If there is any error, the method should return undefined
  console.log(`replaceTodo(${JSON.stringify(newTodo)})`);
  return Promise.resolve(undefined); // DELETE ME
}

function updateTodo(
  id: number,
  updatedTodo: TodoOptionalFields,
): Promise<Todo | undefined> {
  // TODO: Replace the method body with code that updates
  // an existing Todo and returns it.
  // If there is any error, the method should return undefined
  // NOTE: There is a bug in the API. It will return 200 even
  // if the Todo does not exist. It should return 404. You do
  // not need write code for this case.
  console.log(`updateTodo(${id}, ${JSON.stringify(updatedTodo)})`);
  return Promise.resolve(undefined); // DELETE ME
}

function getUserTodos(userId: number): Promise<Todo[] | undefined> {
  // TODO: Replace the method body with code that fetches
  // all todos for the user and returns them.
  // If there is any error, the method should return undefined
  // NOTE: There is a bug in the API. It will return an empty
  // array if the user does not exist. This is OK, simply return
  // the empty array from this method.
  console.log(`getUserTodos(${userId})`);
  return Promise.resolve(undefined); // DELETE ME
}

function getUser(id: number): Promise<User | undefined> {
  // TODO: Replace the method body with code that fetches
  // a user and returns it.
  // If there is any error, the method should return undefined
  console.log(`getUser(${id})`);
  return Promise.resolve(undefined); // DELETE ME
}

export {
  getTodo,
  replaceTodo,
  updateTodo,
  getUserTodos,
  deleteTodo,
  createTodo,
  getUser,
};
