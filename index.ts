import {
  replaceTodo,
  getTodo,
  createTodo,
  updateTodo,
  getUserTodos,
  deleteTodo,
  getUser,
} from "./lab4";

/**
 * This file is for you to test your methods or make fetch calls
 * Run this file with `npm start` or:
 *
 * ```
 * npx ts-node index.ts
 * ```
 */

getUser(8).then((result) => {
  console.log("getUser(8) result:", result);
});

getUserTodos(8).then((result) => {
  console.log("getUserTodos(8) result:", result);
});

getTodo(45).then((result) => {
  console.log("getTodo() 45 result:", result);
});

createTodo({ title: "Make coffee", userId: 6, completed: true }).then(
  (result) => {
    console.log("createTodo() result:", result);
  },
);

replaceTodo({ id: 14, title: "Make coffee", userId: 6, completed: true }).then(
  (result) => {
    console.log("replaceTodo(14) result:", result);
  },
);

updateTodo(14, { completed: false }).then((result) => {
  console.log("updateTodo(14) result:", result);
});

deleteTodo(14).then((result) => {
  console.log("deleteTodo(14) result:", result);
});
