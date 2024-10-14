import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

export const list = createRoute({
  tags: ["Tasks"],
  method: "get",
  path: "/tasks",
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      z.array(z.object({
        name: z.string(),
        isDone: z.boolean(),
      })),
      "List of tasks",
    ),
  },
});

export type ListRoute = typeof list;
