import path from "path";
export default function getLogin(req, res) {
  res.render(path.resolve("api", "views", "pages", "login.hbs"));
}
