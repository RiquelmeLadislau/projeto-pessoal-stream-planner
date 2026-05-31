const {
  cadastrarLive,
  listarLives,
} = require("./services/liveService");

const {
  cadastrarJogo,
  listarJogos,
} = require("./services/jogoService");

const {
  gerarAgenda,
  filtrarPorDia,
  buscarPorTitulo,
} = require("./services/agendaService");

const jogos = [];
const lives = [];

cadastrarJogo(jogos, {
  id: 1,
  nome: "Guardian Tales",
  genero: "RPG",
});

cadastrarJogo(jogos, {
  id: 2,
  nome: "Minecraft",
  genero: "Sandbox",
});

cadastrarLive(lives, {
  id: 1,
  titulo: "Live de Guardian Tales",
  data: "2026-06-10",
  horario: "20:00",
  jogoId: 1,
});

cadastrarLive(lives, {
  id: 2,
  titulo: "Live de Minecraft",
  data: "2026-06-11",
  horario: "21:00",
  jogoId: 2,
});

console.log("Jogos cadastrados:");
console.log(listarJogos(jogos));

console.log("\nLives cadastradas:");
console.log(listarLives(lives));

console.log("\nAgenda gerada:");
console.log(gerarAgenda(lives));

console.log("\nLives do dia 2026-06-10:");
console.log(filtrarPorDia(lives, "2026-06-10"));

console.log("\nBusca por título:");
console.log(buscarPorTitulo(lives, "Guardian"));