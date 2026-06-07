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

function editarLive(lista, id, dadosAtualizados) {
  const live = lista.find((live) => live.id === id);

  if (!live) {
    throw new Error("Live não encontrada");
  }

  Object.assign(live, dadosAtualizados);
}

function excluirLive(lista, id) {
  const indice = lista.findIndex((live) => live.id === id);

  if (indice === -1) {
    throw new Error("Live não encontrada");
  }

  lista.splice(indice, 1);
}

function buscarLivePorId(lista, id) {
  return lista.find((live) => live.id === id);
}

module.exports = {
  cadastrarLive,
  listarLives,
  editarLive,
  excluirLive,
  buscarLivePorId,
};