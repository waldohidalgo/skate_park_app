import path from "path";
export default function getRegister(req, res) {
  res.render(path.resolve("api", "views", "pages", "register.hbs"));
}
