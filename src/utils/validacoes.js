function validarTitulo(titulo) {
  if (!titulo || titulo.trim() === "") {
    throw new Error("Título é obrigatório");
  }
}

function validarData(data) {
  if (!data || data.trim() === "") {
    throw new Error("Data é obrigatória");
  }
}

function validarHorario(horario) {
  if (!horario || horario.trim() === "") {
    throw new Error("Horário é obrigatório");
  }
}

module.exports = {
  validarTitulo,
  validarData,
  validarHorario,
};