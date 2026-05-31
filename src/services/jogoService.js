function cadastrarJogo(lista, jogo) {
  if (!jogo.nome || jogo.nome.trim() === "") {
    throw new Error("Nome do jogo é obrigatório");
  }

  lista.push(jogo);
}

function editarJogo(lista, id, dadosAtualizados) {
  const jogo = lista.find((jogo) => jogo.id === id);

  if (!jogo) {
    throw new Error("Jogo não encontrado");
  }

  Object.assign(jogo, dadosAtualizados);
}

function excluirJogo(lista, id) {
  const indice = lista.findIndex((jogo) => jogo.id === id);

  if (indice === -1) {
    throw new Error("Jogo não encontrado");
  }

  lista.splice(indice, 1);
}

function listarJogos(lista) {
  return lista;
}

function buscarJogoPorId(lista, id) {
  return lista.find((jogo) => jogo.id === id);
}

module.exports = {
  cadastrarJogo,
  editarJogo,
  excluirJogo,
  listarJogos,
  buscarJogoPorId,
};