import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import exphbs from "express-handlebars";
import { promises as fs } from "fs";
import resetDataQuery from "./queries/getResetDataQuery.js";
import router from "./router/router.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.resolve("api", "views"));

app.use(
  fileUpload({
    useTempFiles: false,
  })
);

app.use(express.json());

app.use("/public", express.static(path.resolve("public")));
app.use(
  "/bootstrap_icons",
  express.static(path.resolve("node_modules", "bootstrap-icons", "font"))
);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

setInterval(async () => {
  try {
    const data = await resetDataQuery();
    if (data === "exito") {
      const files = await fs.readdir(path.resolve("public", "imagenes"));
      for (const file of files) {
        await fs.unlink(path.resolve("public", "imagenes", file));
      }
      console.log("Data Reseteada con exito !");
    }
  } catch (error) {
    console.log("Error al resetear la data", error.message);
  }
}, 1800000);
