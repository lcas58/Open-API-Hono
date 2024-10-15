import { describe, expect, it } from "vitest";

import { createTestApp } from "@/lib/create-app";

import router from "./tasks.index";

describe("tasks", () => {
  it("should be able to list tasks", async () => {
    const testRouter = createTestApp(router);
    const response = await testRouter.request("/tasks");
    expect(response.status).toBe(200);
  });
});
