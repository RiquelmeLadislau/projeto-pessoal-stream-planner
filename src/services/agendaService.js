function converterData(data) {
  const partes = data.split("/");
  const dia = partes[0];
  const mes = partes[1];
  const ano = partes[2];

  return `${ano}-${mes}-${dia}`;
}

function gerarAgenda(lives) {
  return [...lives].sort((a, b) => {
    const dataA = converterData(a.data);
    const dataB = converterData(b.data);

    if (dataA === dataB) {
      return a.horario.localeCompare(b.horario);
    }

    return dataA.localeCompare(dataB);
  });
}

function filtrarPorDia(lives, data) {
  return lives.filter((live) => live.data === data);
}

function buscarPorTitulo(lives, titulo) {
  return lives.find((live) =>
    live.titulo.toLowerCase().includes(titulo.toLowerCase())
  );
}

function buscarLivesPorJogo(lives, jogoId) {
  return lives.filter((live) => live.jogoId === jogoId);
}

module.exports = {
  gerarAgenda,
  filtrarPorDia,
  buscarPorTitulo,
  buscarLivesPorJogo,
};