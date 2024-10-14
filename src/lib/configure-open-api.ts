import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json";

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: packageJSON.name,
      version: packageJSON.version,
    },
  });

  app.get("/reference", apiReference({
    theme: "kepler",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },
    layout: "classic",
    spec: {
      url: "/doc",
    },
  }));
}
