
import { beforeAll, describe, expect, it } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";

import { type IApp } from "./app";
import app from "./app";

const client = edenTreaty<IApp>("http://localhost:8080");

describe("Elysia", () => {
  beforeAll(() => {
    const _app = app;
  });

  it("return ok status", async () => {
    const response = await client.api.health.get();

    expect(response.data).toEqual({ status: "ok" });
  });
});
