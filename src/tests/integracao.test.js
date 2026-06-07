const { cadastrarLive, listarLives } = require("../services/liveService");
const { cadastrarJogo, listarJogos } = require("../services/jogoService");
const { gerarAgenda } = require("../services/agendaService");

describe("Teste de Integração", () => {
  test("deve cadastrar jogo, cadastrar live e gerar agenda", () => {
    const jogos = [];
    const lives = [];

    cadastrarJogo(jogos, {
      id: 1,
      nome: "Guardian Tales",
      genero: "RPG",
    });

    cadastrarLive(lives, {
      id: 1,
      titulo: "Live de Guardian Tales",
      data: "2026-06-10",
      horario: "20:00",
      jogoId: 1,
    });

    const agenda = gerarAgenda(lives);

    expect(listarJogos(jogos)).toHaveLength(1);
    expect(listarLives(lives)).toHaveLength(1);
    expect(agenda[0].titulo).toBe("Live de Guardian Tales");
  });
});