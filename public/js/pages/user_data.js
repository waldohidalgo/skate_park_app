import putEditParticipante from "../crud/putEditParticipante.js";

const form = document.getElementById("user_data_form");
const user_email = document.getElementById("user_email");

const deleteButton = document.getElementById("delete_participante");
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);

  const { password, password2 } = Object.fromEntries(formData);

  if (password !== password2) {
    Swal.fire({
      title: "Error",
      text: "Las contraseñas no coinciden",
      icon: "error",
    });
    return;
  }
  try {
    const respuesta = await putEditParticipante({
      ...Object.fromEntries(formData),
      email: user_email.value,
    });

    if (respuesta.status === 200) {
      Swal.fire({
        title: "Exito",
        text: "Participante actualizado con exito",
        icon: "success",
      });
      return;
    }
    throw respuesta;
  } catch (error) {
    const status = error.response.status;
    const data = error.response.data;
    if (status === 401 && data === "El token ha expirado") {
      if (data === "El token ha expirado") {
        Swal.fire({
          title: "Error",
          text: "El token ha expirado, vuelve a iniciar sesion",
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Error",
        text: "No autorizado",
        icon: "error",
      });
      return;
    }

    if (status === 400) {
      if (data === "Faltan datos") {
        Swal.fire({
          title: "Error",
          text: "Faltan datos",
          icon: "error",
        });
        return;
      }
      if (data === "Las contraseñas no coinciden") {
        Swal.fire({
          title: "Error",
          text: "Las contraseñas no coinciden",
          icon: "error",
        });
        return;
      }
      if (data === "El participante no existe") {
        Swal.fire({
          title: "Error",
          text: "El participante no existe",
          icon: "error",
        });
        return;
      }
    }
    Swal.fire({
      title: "Error",
      text: "Algo salio mal",
      icon: "error",
    });
  }
});

deleteButton.addEventListener("click", async function (event) {
  try {
    const email = deleteButton.dataset.email;
    const respuesta = await axios.delete("/participante", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      data: { email },
    });
    if (respuesta.status === 200) {
      Swal.fire({
        title: "Exito",
        text: "Participante eliminado con exito",
        icon: "success",
      });
      return;
    }
    throw respuesta;
  } catch (error) {
    const status = error.response.status;
    const data = error.response.data;
    if (status === 404) {
      Swal.fire({
        title: "Error",
        text: "El participante no existe",
        icon: "error",
      });
      return;
    }
    if (status === 401) {
      if (data === "El token ha expirado") {
        Swal.fire({
          title: "Error",
          text: "El token ha expirado, vuelve a iniciar sesion",
          icon: "error",
        });
        return;
      }
      if (data === "Token inválido") {
        Swal.fire({
          title: "Error",
          text: "Token inválido",
          icon: "error",
        });
        return;
      }
    }
    if (status === 500 && data === "Error al borrar la imagen") {
      Swal.fire({
        title: "Error",
        text: "Error al borrar la imagen",
        icon: "error",
      });
      return;
    }
    Swal.fire({
      title: "Error",
      text: "Error al borrar al usuario",
      icon: "error",
    });
  }
});
