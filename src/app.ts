import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
// import { swaggerUI } from "@hono/swagger-ui";
import page from "@/page";

const app = new Hono();

const msg = `Hello Hono\n\n`;

const corsOptions = {
  origin: "*",
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
  maxAge: 600,
  credentials: true,
};

app.use("/*", cors(corsOptions));

app.use(logger());

app.get("/", (c) => {
  // console.log(c.req instanceof Request);
  return c.text(msg);
});

app.get("/page", (c) => {
  return c.html(page);
});

app.notFound((c) => {
  return c.json({ error: "Yuk" }, 404);
});

app.get("/error", (c) => {
  throw new Error("Error");
});

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "App Error" }, 500);
});

// app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
