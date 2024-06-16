import { user } from "./routes/user";
import { createContext, router } from "./trpc";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { createOpenApiExpressMiddleware } from "trpc-openapi";

const app = express();

export const appRouter = router({
  user,
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use(
  "/",
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  createOpenApiExpressMiddleware({
    router: appRouter,
    createContext,
    responseMeta: null,
    onError: null,
    maxBodySize: null,
  }),
);

export { app };
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;