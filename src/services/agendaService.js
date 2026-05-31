function gerarAgenda(lives) {
  return [...lives].sort((a, b) => {
    if (a.data === b.data) {
      return a.horario.localeCompare(b.horario);
    }

    return a.data.localeCompare(b.data);
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

module.exports = {
  gerarAgenda,
  filtrarPorDia,
  buscarPorTitulo,
};