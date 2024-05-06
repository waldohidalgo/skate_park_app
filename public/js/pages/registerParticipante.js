import { postParticipante } from "../crud/postParticipante.js";

window.onload = () => {
  const form = document.getElementById("register_form");

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
      const respuesta = await postParticipante(form);

      if (respuesta.status === 200) {
        Swal.fire({
          title: "Exito",
          text: "Participante registrado con exito",
          icon: "success",
        });
        form.reset();
        return;
      }
      throw respuesta;
    } catch (error) {
      console.log(error);
      if (error.response.status === 413) {
        Swal.fire({
          title: "Error",
          text: "La imagen es demasiado grande",
          icon: "error",
        });
        return;
      }
      if (error.response.status === 415) {
        Swal.fire({
          title: "Error",
          text: "El formato de la imagen no es válido",
          icon: "error",
        });
        return;
      }
      if (error.response.status === 400) {
        if (error.response.data === "El email ya existe") {
          Swal.fire({
            title: "Error",
            text: "El email ya existe",
            icon: "error",
          });
          return;
        }
        if (error.response.data === "Las contraseñas no coinciden") {
          Swal.fire({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "error",
          });
          return;
        }
        Swal.fire({
          title: "Error",
          text: "Error en la solicitud de registro",
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Error",
        text: "No se pudo registrar el participante",
        icon: "error",
      });
    }
  });
};
