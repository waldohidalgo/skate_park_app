export default async function deleteParticipante(email) {
  try {
    return await axios.delete(`/borrar_participante`, email, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    return error;
  }
}
