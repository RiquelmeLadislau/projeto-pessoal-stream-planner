const readline = require("readline");

const {
  cadastrarLive,
  listarLives,
  editarLive,
  excluirLive,
} = require("./services/liveService");

const {
  cadastrarJogo,
  listarJogos,
  editarJogo,
  excluirJogo,
} = require("./services/jogoService");

const {
  gerarAgenda,
  buscarPorTitulo,
} = require("./services/agendaService");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const jogos = [];
const lives = [];

function perguntar(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (resposta) => {
      resolve(resposta);
    });
  });
}

function mostrarMenu() {
  console.log("\n=== Stream Planner ===");
  console.log("1 - Cadastrar jogo");
  console.log("2 - Cadastrar live");
  console.log("3 - Listar jogos");
  console.log("4 - Listar lives");
  console.log("5 - Gerar agenda");
  console.log("6 - Buscar live por título");
  console.log("7 - Excluir live");
  console.log("8 - Excluir jogo");
  console.log("9 - Editar live");
  console.log("10 - Editar jogo");
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
  const data = await perguntar("Data da live (DD-MM-AAAA): ");
  const horario = await perguntar("Horário da live (HH:MM): ");
  const jogoId = Number(await perguntar("Digite o ID do jogo escolhido: "));

  const jogoExiste = jogos.find((jogo) => jogo.id === jogoId);

  if (!jogoExiste) {
    console.log("Jogo não encontrado. Cadastre a live novamente.");
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

function listarTodosJogos() {
  console.log("\nJogos cadastrados:");

  if (jogos.length === 0) {
    console.log("Nenhum jogo cadastrado.");
    return;
  }

  console.log(listarJogos(jogos));
}

function listarTodasLives() {
  console.log("\nLives cadastradas:");

  if (lives.length === 0) {
    console.log("Nenhuma live cadastrada.");
    return;
  }

  console.log(listarLives(lives));
}

function mostrarAgenda() {
  console.log("\nAgenda:");

  if (lives.length === 0) {
    console.log("Nenhuma live cadastrada.");
    return;
  }

  console.log(gerarAgenda(lives));
}

async function buscarLive() {
  const titulo = await perguntar("Digite parte do título: ");
  const resultado = buscarPorTitulo(lives, titulo);

  if (!resultado) {
    console.log("Nenhuma live encontrada.");
    return;
  }

  console.log("Live encontrada:");
  console.log(resultado);
}

async function removerLive() {
  if (lives.length === 0) {
    console.log("Nenhuma live cadastrada para remover.");
    return;
  }

  console.log("\nLives cadastradas:");
  lives.forEach((live) => {
    console.log(`${live.id} - ${live.titulo}`);
  });

  const id = Number(await perguntar("ID da live: "));

  excluirLive(lives, id);

  console.log("Live removida com sucesso!");
}

async function removerJogo() {
  if (jogos.length === 0) {
    console.log("Nenhum jogo cadastrado para remover.");
    return;
  }

  console.log("\nJogos cadastrados:");
  jogos.forEach((jogo) => {
    console.log(`${jogo.id} - ${jogo.nome}`);
  });

  const id = Number(await perguntar("ID do jogo: "));

  excluirJogo(jogos, id);

  console.log("Jogo removido com sucesso!");
}

async function alterarLive() {
  if (lives.length === 0) {
    console.log("Nenhuma live cadastrada para editar.");
    return;
  }

  console.log("\nLives cadastradas:");
  lives.forEach((live) => {
    console.log(`${live.id} - ${live.titulo}`);
  });

  const id = Number(await perguntar("ID da live: "));
  const novoTitulo = await perguntar("Novo título: ");

  editarLive(lives, id, {
    titulo: novoTitulo,
  });

  console.log("Live atualizada com sucesso!");
}

async function alterarJogo() {
  if (jogos.length === 0) {
    console.log("Nenhum jogo cadastrado para editar.");
    return;
  }

  console.log("\nJogos cadastrados:");
  jogos.forEach((jogo) => {
    console.log(`${jogo.id} - ${jogo.nome}`);
  });

  const id = Number(await perguntar("ID do jogo: "));
  const novoNome = await perguntar("Novo nome: ");

  editarJogo(jogos, id, {
    nome: novoNome,
  });

  console.log("Jogo atualizado com sucesso!");
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
        listarTodosJogos();
      } else if (opcao === "4") {
        listarTodasLives();
      } else if (opcao === "5") {
        mostrarAgenda();
      } else if (opcao === "6") {
        await buscarLive();
      } else if (opcao === "7") {
        await removerLive();
      } else if (opcao === "8") {
        await removerJogo();
      } else if (opcao === "9") {
        await alterarLive();
      } else if (opcao === "10") {
        await alterarJogo();
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