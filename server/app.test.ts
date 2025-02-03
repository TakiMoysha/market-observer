
import { beforeAll, describe, expect, it } from "bun:test";
import { edenTreaty } from "@elysiajs/eden";

import { type IApp } from "./app";
import App from "./app";

const client = edenTreaty<IApp>("http://127.0.0.1:8080");

describe("Elysia", () => {
  beforeAll(() => {
    const _app = App;
  });

  it("return ok status", async () => {
    const response = await client.api.health.get();

    expect(response.data).toEqual({ status: "ok" });
  });
});
