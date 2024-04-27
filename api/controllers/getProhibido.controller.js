import path from "path";
export default function getProhibido(req, res) {
  res.render(path.resolve("api", "views", "pages", "prohibido.hbs"));
}
