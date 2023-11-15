import { User, Todo, TodoFields, TodoOptionalFields } from "./types";
import fetch from "node-fetch";

//const API_URL = "https://jsonplaceholder.typicode.com";


function getTodo(id: number): Promise<Todo | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
      return undefined;
    });
}
 

function deleteTodo(id: number): Promise<true | undefined> {
  // fetch Todo and delete it
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  })
  .then((response) => {
    // if delete request succeeded, return true
    if (response.ok) {
      console.log(`deleteTodo(${id})`);
      return true;
    // otherwise, return undefined  
    } else {
      console.error(`Delete ${id} failed: ${response.status}`);
      return undefined;
    }
  })
  .catch((error) => {
    console.error('There was an error!', error);
    return undefined;
  });
}

function createTodo(newTodo: TodoFields): Promise<Todo | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/todos/`, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Create Todo failed: ${response.status}`);
    }
    console.log(`createTodo(${JSON.stringify(newTodo)})`);
    return response.json();
  })
  .catch(error => {
    console.error(error);
    return undefined;
  });
}

function replaceTodo(newTodo: Todo): Promise<Todo | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${newTodo.id}`, {
    method: "PUT",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Replace Todo failed: ${response.status}`);
    }
    console.log(`replaceTodo(${JSON.stringify(newTodo)})`);
    return response.json();
  })
  .catch(error => {
    console.error(error);
    return undefined;
  });
}

// NOTE: There is a bug in the API. It will return 200 even
// if the Todo does not exist. It should return 404. You do
// not need to write code for this case.  
function updateTodo(
  id: number,
  updatedTodo: TodoOptionalFields,
): Promise<Todo | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedTodo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Update Todo failed: ${response.status}`);
    }
    console.log(`updateTodo(${id}, ${JSON.stringify(updatedTodo)})`);
    return response.json();
  })
  .catch(error => {
    console.error(error);
    return undefined;
  });
}

// NOTE: There is a bug in the API. It will return an empty
// array if the user does not exist. This is OK, simply return
// the empty array from this method. 
function getUserTodos(userId: number): Promise<Todo[] | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`, {
    method: "GET",
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Get User Todos failed: ${response.status}`);
    }
    console.log(`getUserTodos(${userId})`);
    return response.json();
  })
  .catch(error => {
    console.error(error);
    return undefined;
  });
}


function getUser(id: number): Promise<User | undefined> {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "GET",
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Get User failed: ${response.status}`);
    }
    console.log(`getUser(${id})`);
    return response.json();
  })
  .catch(error => {
    console.error(error);
    return undefined;
  });
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
