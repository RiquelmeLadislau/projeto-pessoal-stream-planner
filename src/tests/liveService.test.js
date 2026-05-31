const {
  cadastrarLive,
  listarLives,
  editarLive,
  excluirLive,
  buscarLivePorId,
} = require("../services/liveService");

describe("Live Service", () => {
  let lives;

  beforeEach(() => {
    lives = [];
  });

  test("deve cadastrar uma live válida", () => {
    cadastrarLive(lives, {
      id: 1,
      titulo: "Guardian Tales",
      data: "2026-06-10",
      horario: "20:00",
      jogoId: 1,
    });

    expect(lives).toHaveLength(1);
  });

  test("não deve cadastrar live sem título", () => {
    expect(() =>
      cadastrarLive(lives, {
        id: 1,
        titulo: "",
        data: "2026-06-10",
        horario: "20:00",
        jogoId: 1,
      })
    ).toThrow("Título é obrigatório");
  });

  test("não deve cadastrar live sem data", () => {
    expect(() =>
      cadastrarLive(lives, {
        id: 1,
        titulo: "Guardian Tales",
        data: "",
        horario: "20:00",
        jogoId: 1,
      })
    ).toThrow("Data é obrigatória");
  });

  test("não deve cadastrar live sem horário", () => {
    expect(() =>
      cadastrarLive(lives, {
        id: 1,
        titulo: "Guardian Tales",
        data: "2026-06-10",
        horario: "",
        jogoId: 1,
      })
    ).toThrow("Horário é obrigatório");
  });

  test("deve listar todas as lives cadastradas", () => {
    cadastrarLive(lives, {
      id: 1,
      titulo: "Guardian Tales",
      data: "2026-06-10",
      horario: "20:00",
      jogoId: 1,
    });

    cadastrarLive(lives, {
      id: 2,
      titulo: "Minecraft",
      data: "2026-06-11",
      horario: "21:00",
      jogoId: 2,
    });

    expect(listarLives(lives)).toHaveLength(2);
  });

  test("deve editar uma live existente", () => {
    cadastrarLive(lives, {
      id: 1,
      titulo: "Guardian Tales",
      data: "2026-06-10",
      horario: "20:00",
      jogoId: 1,
    });

    editarLive(lives, 1, {
      titulo: "Minecraft",
    });

    expect(lives[0].titulo).toBe("Minecraft");
  });

  test("deve excluir uma live existente", () => {
    cadastrarLive(lives, {
      id: 1,
      titulo: "Guardian Tales",
      data: "2026-06-10",
      horario: "20:00",
      jogoId: 1,
    });

    excluirLive(lives, 1);

    expect(lives).toHaveLength(0);
  });

  test("deve buscar uma live pelo id", () => {
    cadastrarLive(lives, {
      id: 1,
      titulo: "Guardian Tales",
      data: "2026-06-10",
      horario: "20:00",
      jogoId: 1,
    });

    const live = buscarLivePorId(lives, 1);

    expect(live.titulo).toBe("Guardian Tales");
  });
});