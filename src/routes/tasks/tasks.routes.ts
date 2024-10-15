import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

export const list = createRoute({
  tags: ["Tasks"],
  method: "get",
  path: "/tasks",
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      z.array(selectTasksSchema),
      "List of tasks",
    ),
  },
});

export const create = createRoute({
  tags: ["Tasks"],
  method: "post",
  path: "/tasks",
  request: {
    body: jsonContentRequired(insertTasksSchema, "Task to create"),
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      selectTasksSchema,
      "Task created",
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "Validation error",
    ),
  },
});

export const getOne = createRoute({
  tags: ["Tasks"],
  method: "get",
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(selectTasksSchema, "The requested task"),
    [HttpStatusCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid Id Error",
    ),
  },
});

export const patch = createRoute({
  tags: ["Tasks"],
  method: "patch",
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchTasksSchema, "Task to update"),
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      selectTasksSchema,
      "Task updated",
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(patchTasksSchema),
        createErrorSchema(IdParamsSchema),
      ],
      "The validation error or invalid id error",
    ),
    [HttpStatusCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
  },
});

export const remove = createRoute({
  tags: ["Tasks"],
  method: "delete",
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCode.NO_CONTENT]: {
      description: "Task deleted",
    },
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid Id Error",
    ),
    [HttpStatusCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
