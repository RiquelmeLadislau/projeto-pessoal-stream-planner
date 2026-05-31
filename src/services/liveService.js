const {
  validarTitulo,
  validarData,
  validarHorario,
} = require("../utils/validacoes");

function cadastrarLive(lista, live) {
  validarTitulo(live.titulo);
  validarData(live.data);
  validarHorario(live.horario);

  lista.push(live);
}

function listarLives(lista) {
  return lista;
}

module.exports = {
  cadastrarLive,
  listarLives,
};