import { describe, expect, it } from "bun:test";
import { passwordHash } from "./libs";

import UsersJson from "../../users.json";

describe("hashPassword", () => {
  it("should hash the password", async () => {
    const password = "admin";
    const user = UsersJson.find((u) => u.originPassword === password);
    if (!user) throw new Error("User not found");

    const hash = await passwordHash(password);
    const isVerify = await Bun.password.verify(password, hash);
    expect(isVerify).toBeTrue();
  });
});
