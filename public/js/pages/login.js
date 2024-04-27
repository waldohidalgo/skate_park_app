import postLogin from "../crud/postLogin.js";

window.onload = () => {
  const form = document.querySelector(".login_page_form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const respuesta = await postLogin(form);

      if (respuesta.status === 200) {
        const { token } = respuesta.data;
        sessionStorage.setItem("token", token);

        axios
          .get("/user_data", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            document.body.innerHTML = response.data;
            const scriptACargar = document.createElement("script");
            scriptACargar.src = "/public/js/pages/user_data.js";
            scriptACargar.type = "module";
            document.body.appendChild(scriptACargar);
            Swal.fire({
              title: "Exito",
              text: "Sesion iniciada con exito",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Algo salio mal",
              icon: "error",
            });
          });
      }
      if (respuesta.status !== 200) {
        throw respuesta;
      }
    } catch (error) {
      console.log(error);
      const mensaje = error.response.data;
      const status = error.response.status;
      if (status === 400 && mensaje === "Faltan datos") {
        Swal.fire({
          title: "Error",
          text: "Faltan datos",
          icon: "error",
        });
        return;
      }
      if (status === 400 && mensaje === "El email no existe") {
        Swal.fire({
          title: "Error",
          text: "El email no existe",
          icon: "error",
        });
        return;
      }
      if (status === 400 && mensaje === "La contraseña es incorrecta") {
        Swal.fire({
          title: "Error",
          text: "La contraseña es incorrecta",
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Error",
        text: "Algo salio mal",
        icon: "error",
      });
    }
  });
};
