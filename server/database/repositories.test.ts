import { describe, it } from "bun:test";

import postgres from "postgres";

const sql = postgres();

describe("UsersReposity", () => {
  it("should return user by email", () => {
    const user = UsersRepository();
  });
  it("should return user purches", () => { });
  it("should return user products", () => { });
});
