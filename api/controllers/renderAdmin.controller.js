import path from "path";
import getParticipantesQuery from "../queries/getParticipantesQuery.js";
export default async function renderAdmin(req, res) {
  try {
    const data = await getParticipantesQuery();

    res.render(path.resolve("api", "views", "pages", "admin.hbs"), {
      participantes: data,
      helpers: {
        arrayVacio: function (array) {
          return array.length === 0;
        },
        addOne: function (number) {
          return number + 1;
        },
        isChecked: function (value) {
          if (value === true) {
            return 1;
          } else {
            return false;
          }
        },
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
