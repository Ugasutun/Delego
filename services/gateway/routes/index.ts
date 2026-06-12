import type { Route } from "@delego/utils";
import { route } from "@delego/utils";
import { healthHandler } from "./health.js";
import { apiV1Handler } from "./api-v1.js";

/** Register all gateway routes */
export function registerRoutes(): Route[] {
  return [
    route("GET", "/health", healthHandler),
    route("GET", "/api/v1/status", apiV1Handler),
    // TODO: Add delegation, order, wallet proxy routes
  ];
}
