const {
  cadastrarJogo,
  listarJogos,
  editarJogo,
  excluirJogo,
  buscarJogoPorId,
} = require("../services/jogoService");

describe("Jogo Service", () => {
  let jogos;

  beforeEach(() => {
    jogos = [];
  });

  test("deve cadastrar um jogo válido", () => {
    cadastrarJogo(jogos, {
      id: 1,
      nome: "Guardian Tales",
      genero: "RPG",
    });

    expect(jogos).toHaveLength(1);
  });

  test("não deve cadastrar jogo sem nome", () => {
    expect(() =>
      cadastrarJogo(jogos, {
        id: 1,
        nome: "",
        genero: "RPG",
      })
    ).toThrow("Nome do jogo é obrigatório");
  });

  test("deve listar todos os jogos", () => {
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

    expect(listarJogos(jogos)).toHaveLength(2);
  });

  test("deve editar um jogo existente", () => {
    cadastrarJogo(jogos, {
      id: 1,
      nome: "Guardian Tales",
      genero: "RPG",
    });

    editarJogo(jogos, 1, {
      nome: "Minecraft",
    });

    expect(jogos[0].nome).toBe("Minecraft");
  });

  test("deve excluir um jogo existente", () => {
    cadastrarJogo(jogos, {
      id: 1,
      nome: "Guardian Tales",
      genero: "RPG",
    });

    excluirJogo(jogos, 1);

    expect(jogos).toHaveLength(0);
  });

  test("deve buscar um jogo pelo id", () => {
    cadastrarJogo(jogos, {
      id: 1,
      nome: "Guardian Tales",
      genero: "RPG",
    });

    const jogo = buscarJogoPorId(jogos, 1);

    expect(jogo.nome).toBe("Guardian Tales");
  });
});