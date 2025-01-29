import { Elysia, t } from "elysia";

const User = t.Object({
  username: t.String(),
  password: t.String(),

  createdAt: t.Date(),
  updatedAt: t.Date(),
});
type User = typeof User.static;

const Product = t.Object({});
type Product = typeof Product.static;

const Purchase = t.Object({});
type Purchase = typeof Purchase.static;
