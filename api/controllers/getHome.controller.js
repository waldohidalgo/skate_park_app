import getParticipantesQuery from "../queries/getParticipantesQuery.js";
export default async function getHome(req, res) {
  try {
    const data = await getParticipantesQuery();
    res.render("index.hbs", { data, length: data.length });
  } catch (error) {
    res.render("index.hbs");
  }
}
