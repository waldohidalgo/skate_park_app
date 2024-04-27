import { getParticipantes } from "../crud/getParticipantes.js";

window.onload = () => {
  const tbody_participantes = document.getElementById("tbody_participantes");

  async function printParticipantes() {
    try {
      const participantes = await getParticipantes();
      if (participantes.length === 0) {
        tbody_participantes.innerHTML = `
        <tr>
        <td colspan='6' class="text-center">No hay participantes</td>
        </tr>`;
      } else {
        tbody_participantes.innerHTML = "";
        participantes.forEach((participante, index) => {
          tbody_participantes.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td> <div class="participante_foto"><img src="/public/imagenes/${
          participante.foto
        }" alt="foto de ${participante.nombre}"/></div></td>
        <td>${participante.nombre}</td>
        <td>${participante.anos_experiencia}</td>
        <td>${participante.especialidad}</td>
        ${
          participante.estado
            ? '<td class="text-success font-weight-bold">Aprobado</td>'
            : '<td class="text-warning font-weight-bold">En revisión</td>'
        }
        `;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  printParticipantes();
};
