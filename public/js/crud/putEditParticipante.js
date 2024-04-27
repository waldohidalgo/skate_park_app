export default async function putEditParticipante(form) {
  try {
    return await axios.put("/participante", form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    return error;
  }
}
