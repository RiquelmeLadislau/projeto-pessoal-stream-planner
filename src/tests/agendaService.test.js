const {
  gerarAgenda,
  filtrarPorDia,
  buscarPorTitulo,
} = require("../services/agendaService");

describe("Agenda Service", () => {
  let lives;

  beforeEach(() => {
    lives = [
      {
        id: 1,
        titulo: "Live de Minecraft",
        data: "2026-06-12",
        horario: "21:00",
        jogoId: 2,
      },
      {
        id: 2,
        titulo: "Live de Guardian Tales",
        data: "2026-06-10",
        horario: "20:00",
        jogoId: 1,
      },
      {
        id: 3,
        titulo: "Live de Valorant",
        data: "2026-06-10",
        horario: "18:00",
        jogoId: 3,
      },
    ];
  });

  test("deve gerar agenda ordenada por data e horário", () => {
    const agenda = gerarAgenda(lives);

    expect(agenda[0].titulo).toBe("Live de Valorant");
    expect(agenda[1].titulo).toBe("Live de Guardian Tales");
    expect(agenda[2].titulo).toBe("Live de Minecraft");
  });

  test("deve filtrar lives por dia", () => {
    const resultado = filtrarPorDia(lives, "2026-06-10");

    expect(resultado).toHaveLength(2);
  });

  test("deve buscar live pelo título", () => {
    const resultado = buscarPorTitulo(lives, "Guardian");

    expect(resultado.titulo).toBe("Live de Guardian Tales");
  });
});