import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const app = express();

// Global middleware
app.use(cors());

// Simple auth middleware — in real apps verify tokens/JWTS
app.use((req, _res, next) => {
  const auth = req.headers["authorization"];
  if (auth) {
    // Attach a fake user for demo purposes
    req.user = { id: "demo", name: "Demo User" };
  }
  next();
});

// Parse JSON for non-GraphQL routes only (avoid double-parsing the GraphQL stream)
app.use((req, res, next) => {
  if (req.path === "/graphql") return next();
  express.json()(req, res, next);
});

// Custom routes (example handlers included inline)
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.post("/auth", (req, res) => res.json({ message: "login", body: req.body }));
app.post("/webhook", (req, res) => res.json({ message: "webhook received", body: req.body }));

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
  });
  await server.start();

  // Make sure to disable apollo's CORS handling (we use global CORS)
  server.applyMiddleware({ app, path: "/graphql", cors: false });

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
    console.log("GraphQL at http://localhost:4000/graphql");
  });
}

start();
