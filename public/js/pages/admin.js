window.onload = () => {
  const checkboxs = document.querySelectorAll(".aprobado_checkbox");
  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("change", async (event) => {
      try {
        const res = await axios({
          method: "patch",
          url: "/participante",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            email: checkbox.dataset.email,
            estado: event.target.checked,
          },
        });
        if (res.status === 200) {
          Swal.fire({
            title: "Exito",
            text: "Participante actualizado con exito",
            icon: "success",
          });
          return;
        }
        throw res;
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el participante",
          icon: "error",
        });
      }
    });
  });
};
