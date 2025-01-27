import { Elysia, t } from "elysia";

const User = t.Object({
  username: t.String(),
  password: t.String(),

  createdAt: t.Date(),
  updatedAt: t.Date(),
});
type IUser = typeof User.static;

const Product = t.Object({});
type IProduct = typeof Product.static;

const Purchase = t.Object({});
type IPurchase = typeof Purchase.static;
