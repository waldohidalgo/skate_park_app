import path from "path";
export default function render404(req, res) {
  res.render(path.resolve("api", "views", "pages", "404.hbs"));
}
