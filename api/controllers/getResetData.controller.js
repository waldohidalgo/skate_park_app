import resetDataQuery from "../queries/getResetDataQuery.js";
import { promises as fs } from "fs";
import path from "path";
export default async function resetData(req, res) {
  try {
    const data = await resetDataQuery();
    if (data === "exito") {
      const files = await fs.readdir(path.resolve("public", "imagenes"));
      for (const file of files) {
        await fs.unlink(path.resolve("public", "imagenes", file));
      }
      res.status(200).send("Data Reseteada con exito !");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
