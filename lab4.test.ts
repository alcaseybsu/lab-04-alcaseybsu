import * as lab4 from "./lab4";
import { AllOptional, TodoMethods, TodoOptionalFields } from "./types";

import { omit, every } from "lodash";

import { jest, describe, expect, it } from "@jest/globals";

// This is to verify types; do not remove or change this
// If you have an error on this line it means that you have
// changed the types of these methods which is not acceptable
const {
  replaceTodo,
  updateTodo,
  createTodo,
  getTodo,
  deleteTodo,
  getUserTodos,
  getUser,
}: TodoMethods = lab4;

jest.useFakeTimers();

type FetchType = typeof fetch;

function makeResponseMock(overrides: AllOptional<Response>): Response {
  return jest.fn(() => {
    return {
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      ok: true,
      redirected: false,
      json: () => Promise.resolve({}),
      ...overrides,
    } as unknown as Response;
  })();
}

function mockHttpError(status: number = 404): jest.Mock<FetchType> {
  const fetchMock = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.reject(),
      ok: false,
      status,
    } as Response),
  );
  global.fetch = fetchMock as FetchType;
  return fetchMock;
}

function mockJsonResolves<T>(result?: T): jest.Mock<FetchType> {
  const fetchMock = jest.fn(() =>
    Promise.resolve(
      makeResponseMock({
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        json: () => Promise.resolve(result),
      }),
    ),
  );
  global.fetch = fetchMock as FetchType;
  return fetchMock;
}

function mockJsonReject(error?: Error): jest.Mock<FetchType> {
  if (!error) {
    error = new Error("Rejected");
  }
  const fetchMock: jest.Mock<FetchType> = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.reject(error),
    } as Response),
  );
  global.fetch = fetchMock as FetchType;
  return fetchMock;
}

function mockFetchReject(error?: Error): jest.Mock<FetchType> {
  if (!error) {
    error = new Error("Rejected");
  }
  const fetchMock: jest.Mock<FetchType> = jest.fn(() => Promise.reject(error));
  global.fetch = fetchMock as FetchType;
  return fetchMock;
}

describe.each([
  ["getTodo", () => getTodo(300)],
  [
    "createTodo",
    () =>
      createTodo({
        title: "Make coffee",
        userId: 8,
        completed: false,
      }),
  ],
  [
    "replaceTodo",
    () =>
      replaceTodo({
        id: 93,
        title: "Grade Project 2",
        userId: 9,
        completed: false,
      }),
  ],
  [
    "updateTodo",
    () =>
      updateTodo(300, {
        userId: 8,
        title: "Finish homework",
      }),
  ],
  ["deleteTodo", () => deleteTodo(300)],
  ["getUserTodos", () => getUserTodos(2)],
  /* eslint-disable @typescript-eslint/no-explicit-any */
])("%s with mocked fetch", (name: string, fn: () => Promise<any>) => {
  let origFetch: typeof fetch;

  beforeEach(() => {
    origFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = origFetch;
  });

  it("returns undefined on HTTP error", async () => {
    const fetchMock = mockHttpError();
    const response = await fn();
    expect(fetchMock).toHaveBeenCalled();
    expect(response).toBeUndefined();
  });

  it("returns undefined on json reject", async () => {
    const fetchMock = mockJsonReject();
    const response = await fn();
    expect(fetchMock).toHaveBeenCalled();
    expect(response).toBeUndefined();
  });

  it("returns undefined on fetch reject", async () => {
    const fetchMock = mockFetchReject();
    const response = await fn();
    expect(fetchMock).toHaveBeenCalled();
    expect(response).toBeUndefined();
  });
});

describe("with mocked fetch", () => {
  let origFetch: typeof fetch;

  beforeEach(() => {
    origFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = origFetch;
  });

  describe("getTodo with mocked fetch", () => {
    it("called fetch with correct parameters", async () => {
      const newTodo = {
        id: 102,
        title: "Go for a jog",
        userId: 6,
        completed: true,
      };
      const fetchMock = mockJsonResolves(newTodo);
      const response = await getTodo(102);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const fetchCall = fetchMock.mock.calls[0];
      expect(fetchCall[0]).toBe(
        "https://jsonplaceholder.typicode.com/todos/102",
      );
      if (fetchCall[1] && "method" in fetchCall[1]) {
        expect(fetchCall[1]).toMatchObject({
          method: expect.stringMatching(/get/i),
        });
      }
      expect(response).toEqual(newTodo);
    });
  });

  describe("createTodo with mocked fetch", () => {
    it("called fetch with correct parameters", async () => {
      const newTodo = {
        id: 310,
        title: "Go for a jog",
        userId: 6,
        completed: true,
      };
      const fetchMock = mockJsonResolves(newTodo);
      const response = await createTodo({
        ...omit(newTodo, ["id"]),
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const fetchCall = fetchMock.mock.calls[0];
      expect(fetchCall[0]).toBe("https://jsonplaceholder.typicode.com/todos");
      expect(fetchCall[1]).toMatchObject({
        method: expect.stringMatching(/post/i),
      });
      const headers = fetchCall[1]?.headers || {};
      if ("content-type" in headers) {
        expect(headers).toHaveProperty(
          "content-type",
          expect.stringMatching(/^application\/json/),
        );
      } else {
        expect(headers).toHaveProperty(
          "Content-Type",
          expect.stringMatching(/^application\/json/),
        );
      }
      expect(response).toEqual(newTodo);
    });
  });
});

describe("getTodo with actual fetch calls", () => {
  it("fetches todo 200", async () => {
    const response = await getTodo(200);
    expect(response).toEqual({
      id: 200,
      userId: 10,
      title: "ipsam aperiam voluptates qui",
      completed: false,
    });
  });

  it("fetches todo 102", async () => {
    const response = await getTodo(102);
    expect(response).toEqual({
      id: 102,
      userId: 6,
      title: "sed ab consequatur",
      completed: false,
    });
  });

  it("returns undefined if todo does not exist", async () => {
    const response = await getTodo(205);
    expect(response).toBeUndefined();
  });
});

describe("updateTodo with actual fetch calls", () => {
  it("update todo 52", async () => {
    const updatedTodo: TodoOptionalFields = {
      userId: 8,
      title: "Finish homework",
    };
    const response = await updateTodo(52, updatedTodo);
    expect(response).toEqual({
      id: 52,
      userId: 8,
      title: "Finish homework",
      completed: false,
    });
  });

  it("updates todo 32", async () => {
    const updatedTodo: TodoOptionalFields = {
      userId: 2,
      title: "Make tea",
    };
    const response = await updateTodo(35, updatedTodo);
    expect(response).toEqual({
      id: 35,
      userId: 2,
      title: "Make tea",
      completed: true,
    });
  });

  it("returns new fields only if todo doesn't exist", async () => {
    // This is a bug, it should return 404
    const updatedTodo: TodoOptionalFields = {
      userId: 2,
      title: "Make tea",
    };
    const response = await updateTodo(300, updatedTodo);
    expect(response).toEqual(updatedTodo);
  });
});

describe("replaceTodo with actual fetch calls", () => {
  it("replaces todo 93", async () => {
    const newTodo = {
      id: 93,
      title: "Grade Project 2",
      userId: 9,
      completed: false,
    };
    const response = await replaceTodo(newTodo);
    expect(response).toEqual(newTodo);
  });

  it("replace todo 85", async () => {
    const newTodo = {
      id: 85,
      title: "Make coffee",
      userId: 8,
      completed: false,
    };
    const response = await replaceTodo(newTodo);
    expect(response).toEqual(newTodo);
  });

  it("returns undefined if todo doesn't exist", async () => {
    const newTodo = {
      id: 300,
      title: "Make coffee",
      userId: 8,
      completed: false,
    };
    const response = await replaceTodo(newTodo);
    expect(response).toBeUndefined();
  });
});

describe("createTodo with actual fetch calls", () => {
  it("creates todo", async () => {
    const newTodo = {
      title: "Make coffee",
      userId: 8,
      completed: false,
    };
    const response = await createTodo(newTodo);
    expect(response).toMatchObject(newTodo);
    // json placeholder always gives new todo objects id 201
    expect(response).toHaveProperty("id", 201);
  });

  it("ignores id on new todo", async () => {
    const newTodo = {
      id: 120,
      title: "Make coffee",
      userId: 8,
      completed: false,
    };
    const response = await createTodo(newTodo);
    expect(response).toMatchObject({
      title: "Make coffee",
      userId: 8,
      completed: false,
    });
    expect(response).toHaveProperty("id", 201);
  });
});

describe("deleteTodo with actual fetch calls", () => {
  it("returns true if todo deleted", async () => {
    const response = await deleteTodo(193);
    expect(response).toBe(true);
  });

  it("returns true if todo doesn't exist", async () => {
    // This is a bug in the API
    const response = await deleteTodo(310);
    expect(response).toBe(true);
  });
});

describe("getUserTodos with actual fetch calls", () => {
  it("fetches user 3 todos", async () => {
    const response = await getUserTodos(3);
    expect(response).toHaveLength(20);
    expect(every(response, (todo) => todo.userId === 3)).toBeTruthy();
  });

  it("returns empty array if user does not exist", async () => {
    // This is a bug in the API
    const response = await getUserTodos(15);
    expect(response).toEqual([]);
  });
});

describe("getUser with actual fetch calls", () => {
  it("fetches user 3", async () => {
    const response = await getUser(7);
    expect(response).toMatchObject({
      id: 7,
      name: "Kurtis Weissnat",
      email: "Telly.Hoeger@billy.biz",
    });
  });

  it("returns empty array if user does not exist", async () => {
    const response = await getUser(15);
    expect(response).toBeUndefined();
  });
});
