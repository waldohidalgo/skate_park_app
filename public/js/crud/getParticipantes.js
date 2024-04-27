export async function getParticipantes() {
  const response = await axios.get("/participantes");
  const data = response.data;
  return data;
}
