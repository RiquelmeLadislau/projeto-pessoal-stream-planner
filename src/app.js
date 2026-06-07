const readline = require("readline");

const { cadastrarLive } = require("./services/liveService");
const { cadastrarJogo, listarJogos } = require("./services/jogoService");

const {
  gerarAgenda,
  buscarLivesPorJogo,
} = require("./services/agendaService");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const jogos = [];
const lives = [];

function perguntar(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (resposta) => resolve(resposta));
  });
}

function mostrarMenu() {
  console.log("\n=== Stream Planner ===");
  console.log("1 - Cadastrar jogo");
  console.log("2 - Cadastrar live");
  console.log("3 - Listar jogos");
  console.log("4 - Gerar agenda ordenada");
  console.log("5 - Buscar lives por jogo");
  console.log("0 - Sair");
}

async function cadastrarNovoJogo() {
  const nome = await perguntar("Nome do jogo: ");
  const genero = await perguntar("Gênero do jogo: ");

  cadastrarJogo(jogos, {
    id: jogos.length + 1,
    nome,
    genero,
  });

  console.log("Jogo cadastrado com sucesso!");
}

async function cadastrarNovaLive() {
  if (jogos.length === 0) {
    console.log("Cadastre um jogo antes de cadastrar uma live.");
    return;
  }

  console.log("\nJogos disponíveis:");
  jogos.forEach((jogo) => {
    console.log(`${jogo.id} - ${jogo.nome} (${jogo.genero})`);
  });

  const titulo = await perguntar("Título da live: ");
  const data = await perguntar("Data da live (DD/MM/AAAA): ");
  const horario = await perguntar("Horário da live (HH:MM): ");
  const jogoId = Number(await perguntar("Digite o ID do jogo escolhido: "));

  const jogoExiste = jogos.find((jogo) => jogo.id === jogoId);

  if (!jogoExiste) {
    console.log("Jogo não encontrado.");
    return;
  }

  cadastrarLive(lives, {
    id: lives.length + 1,
    titulo,
    data,
    horario,
    jogoId,
  });

  console.log("Live cadastrada com sucesso!");
}

function mostrarJogos() {
  if (jogos.length === 0) {
    console.log("Nenhum jogo cadastrado.");
    return;
  }

  console.log("\nJogos cadastrados:");
  console.log(listarJogos(jogos));
}

function mostrarAgenda() {
  if (lives.length === 0) {
    console.log("Nenhuma live cadastrada.");
    return;
  }

  console.log("\nAgenda ordenada:");
  console.log(gerarAgenda(lives));
}

async function buscarPorJogo() {
  if (jogos.length === 0) {
    console.log("Nenhum jogo cadastrado.");
    return;
  }

  console.log("\nJogos disponíveis:");
  jogos.forEach((jogo) => {
    console.log(`${jogo.id} - ${jogo.nome}`);
  });

  const jogoId = Number(await perguntar("Digite o ID do jogo: "));
  const resultado = buscarLivesPorJogo(lives, jogoId);

  if (resultado.length === 0) {
    console.log("Nenhuma live encontrada para esse jogo.");
    return;
  }

  console.log("Lives encontradas:");
  console.log(resultado);
}

async function iniciarApp() {
  let opcao = "";

  while (opcao !== "0") {
    mostrarMenu();
    opcao = await perguntar("Escolha uma opção: ");

    try {
      if (opcao === "1") {
        await cadastrarNovoJogo();
      } else if (opcao === "2") {
        await cadastrarNovaLive();
      } else if (opcao === "3") {
        mostrarJogos();
      } else if (opcao === "4") {
        mostrarAgenda();
      } else if (opcao === "5") {
        await buscarPorJogo();
      } else if (opcao === "0") {
        console.log("Encerrando o sistema...");
      } else {
        console.log("Opção inválida.");
      }
    } catch (erro) {
      console.log("Erro:", erro.message);
    }
  }

  rl.close();
}

iniciarApp();