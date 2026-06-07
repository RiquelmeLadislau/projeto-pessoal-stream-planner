# 🎮 Stream Planner

> Sistema de gerenciamento e planejamento de transmissões ao vivo para criadores de conteúdo.
> arquivo em pdf:
---

## 📋 Sumário

- [Introdução](#introdução)
- [Problema](#problema)
- [Objetivo](#objetivo)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [Casos de Teste](#casos-de-teste)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [CI/CD](#cicd)
- [Fluxo de Branches](#fluxo-de-branches)
- [Equipe](#equipe)

---

## Introdução

O **Stream Planner** é um sistema desenvolvido para auxiliar criadores de conteúdo e streamers na organização de transmissões ao vivo. A aplicação permite cadastrar jogos, cadastrar lives, consultar informações e gerar uma agenda organizada de transmissões.

O projeto foi desenvolvido utilizando lógica de programação, testes automatizados e práticas de integração e entrega contínua (CI/CD), garantindo maior qualidade e confiabilidade do software.

---

## Problema

Muitos streamers enfrentam dificuldades para organizar suas transmissões ao vivo, especialmente quando trabalham com diferentes jogos e horários ao longo da semana.

A ausência de uma ferramenta simples para planejamento pode causar:

- Conflitos de horário
- Desorganização da programação
- Dificuldade para visualizar a agenda completa de lives

---

## Objetivo

O objetivo do **Stream Planner** é fornecer uma solução prática para o gerenciamento da programação de lives.

O sistema permite:

- ✅ Cadastrar jogos
- ✅ Cadastrar lives
- ✅ Consultar jogos cadastrados
- ✅ Buscar lives por jogo
- ✅ Gerar uma agenda organizada por data e horário

Dessa forma, o usuário consegue visualizar e planejar suas transmissões de maneira mais eficiente.

---

## Requisitos Funcionais

| ID | Requisito | Descrição |
|----|-----------|-----------|
| RF01 | Cadastro de Jogos | O sistema deve permitir o cadastro de jogos que poderão ser utilizados na programação das lives. |
| RF02 | Cadastro de Lives | O sistema deve permitir o cadastro de lives contendo informações como jogo, data e horário. |
| RF03 | Listagem de Jogos | O sistema deve permitir visualizar todos os jogos cadastrados. |
| RF04 | Geração de Agenda | O sistema deve gerar uma agenda ordenada com todas as lives cadastradas. |
| RF05 | Busca de Lives por Jogo | O sistema deve permitir consultar todas as lives relacionadas a um jogo específico. |

---

## Requisitos Não Funcionais

| ID | Requisito |
|----|-----------|
| RNF01 | O sistema deve ser desenvolvido utilizando **JavaScript**. |
| RNF02 | O sistema deve executar em ambiente **Node.js**. |
| RNF03 | O sistema deve utilizar **Jest** para execução dos testes automatizados. |
| RNF04 | O sistema deve utilizar **Git** para controle de versão. |
| RNF05 | O sistema deve utilizar **GitHub** para hospedagem do código. |
| RNF06 | O sistema deve utilizar **GitHub Actions** para automação do processo de CI/CD. |
| RNF07 | O sistema deve possuir **build automatizado**. |
| RNF08 | O sistema deve possuir **pipeline de integração contínua**. |
| RNF09 | O sistema deve utilizar **branches** para organização do desenvolvimento. |
| RNF10 | O sistema deve utilizar **Pull Request** para integração das funcionalidades. |

---

## Casos de Teste

### 🎮 Jogo Service — `jogo.test.js`

| ID | Descrição | Entrada | Resultado Esperado | Tipo |
|----|-----------|---------|-------------------|------|
| CT01 | Deve cadastrar um jogo válido | `id:1, nome:"Guardian Tales", genero:"RPG"` | Lista com 1 jogo | ✅ Válido |
| CT02 | Não deve cadastrar jogo sem nome | `nome: ""` | Lança exceção: `"Nome do jogo é obrigatório"` | ❌ Inválido |
| CT03 | Deve listar todos os jogos | Guardian Tales + Minecraft cadastrados | Lista com 2 jogos | ✅ Válido |
| CT04 | Deve editar um jogo existente | `editarJogo(jogos, 1, { nome: "Minecraft" })` | `jogos[0].nome === "Minecraft"` | ✅ Válido |
| CT05 | Deve excluir um jogo existente | `excluirJogo(jogos, 1)` | Lista vazia | ✅ Válido |
| CT06 | Deve buscar um jogo pelo id | `buscarJogoPorId(jogos, 1)` | `jogo.nome === "Guardian Tales"` | ✅ Válido |

---

### 📺 Live Service — `live.test.js`

| ID | Descrição | Entrada | Resultado Esperado | Tipo |
|----|-----------|---------|-------------------|------|
| CT07 | Deve cadastrar uma live válida | `titulo:"Guardian Tales", data:"2026-06-10", horario:"20:00"` | Lista com 1 live | ✅ Válido |
| CT08 | Não deve cadastrar live sem título | `titulo: ""` | Lança exceção: `"Título é obrigatório"` | ❌ Inválido |
| CT09 | Não deve cadastrar live sem data | `data: ""` | Lança exceção: `"Data é obrigatória"` | ❌ Inválido |
| CT10 | Não deve cadastrar live sem horário | `horario: ""` | Lança exceção: `"Horário é obrigatório"` | ❌ Inválido |
| CT11 | Deve listar todas as lives cadastradas | Guardian Tales + Minecraft cadastrados | Lista com 2 lives | ✅ Válido |
| CT12 | Deve editar uma live existente | `editarLive(lives, 1, { titulo: "Minecraft" })` | `lives[0].titulo === "Minecraft"` | ✅ Válido |
| CT13 | Deve excluir uma live existente | `excluirLive(lives, 1)` | Lista vazia | ✅ Válido |
| CT14 | Deve buscar uma live pelo id | `buscarLivePorId(lives, 1)` | `live.titulo === "Guardian Tales"` | ✅ Válido |

---

### 📅 Agenda Service — `agenda.test.js`

| ID | Descrição | Entrada | Resultado Esperado | Tipo |
|----|-----------|---------|-------------------|------|
| CT15 | Deve gerar agenda ordenada por data e horário | 3 lives em datas/horários diferentes | Ordem: Valorant → Guardian Tales → Minecraft | ✅ Válido |
| CT16 | Deve filtrar lives por dia | `filtrarPorDia(lives, "2026-06-10")` | 2 lives retornadas | ✅ Válido |
| CT17 | Deve buscar live pelo título | `buscarPorTitulo(lives, "Guardian")` | `resultado.titulo === "Live de Guardian Tales"` | ✅ Válido |
| CT18 | Deve buscar lives por jogo | `buscarLivesPorJogo(lives, 1)` | 1 live com título `"Live de Guardian Tales"` | ✅ Válido |

---

### 🔗 Teste de Integração — `integracao.test.js`

| ID | Descrição | Fluxo | Resultado Esperado | Tipo |
|----|-----------|-------|-------------------|------|
| CT19 | Deve cadastrar jogo, live e gerar agenda | `cadastrarJogo` → `cadastrarLive` → `gerarAgenda` | 1 jogo, 1 live e agenda com título correto | ✅ Válido |

---

### 📊 Resumo dos Casos de Teste

| Módulo | Total | ✅ Válidos | ❌ Inválidos |
|--------|-------|-----------|------------|
| Jogo Service | 6 | 5 | 1 |
| Live Service | 8 | 5 | 3 |
| Agenda Service | 4 | 4 | 0 |
| Integração | 1 | 1 | 0 |
| **TOTAL** | **19** | **15** | **4** |

---

## Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Linguagem principal do projeto |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Ambiente de execução |
| ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white) | Testes automatizados |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) | Controle de versão |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) | Hospedagem do código |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white) | Automação de CI/CD |

---

## Estrutura do Projeto

```
stream-planner/
├── src/
│   ├── jogo.js
│   ├── live.js
│   └── agenda.js
│
├── tests/
│   ├── jogo.test.js
│   ├── live.test.js
│   ├── agenda.test.js
│   └── integracao.test.js
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── package.json
├── README.md
└── .gitignore
```

---

## CI/CD

O projeto utiliza práticas de **Integração Contínua e Entrega Contínua (CI/CD)** através do GitHub Actions.

### Pipeline

O pipeline automatiza a execução dos processos de verificação sempre que alterações são enviadas ao repositório, executando as seguintes etapas:

```
Push / Pull Request
        ↓
  Checkout do código
        ↓
  Instalação do Node.js
        ↓
  Instalação de dependências
        ↓
  Execução dos testes (Jest)
        ↓
  Execução do build
```

### Jobs e Steps

**Job: test-and-build**

| Step | Descrição |
|------|-----------|
| 1 | Checkout do código |
| 2 | Instalação do Node.js |
| 3 | Instalação das dependências |
| 4 | Execução dos testes automatizados |
| 5 | Execução do build |

### Pull Request

As funcionalidades desenvolvidas são integradas ao projeto através de **Pull Request**, permitindo revisão e validação antes da junção do código ao branch principal.

---

## Fluxo de Branches

```
main
 └── develop
       └── feature/busca-live
```

### Processo de Desenvolvimento

1. A branch `develop` foi utilizada para integração das funcionalidades.
2. A branch `feature/busca-live` foi criada para desenvolvimento da funcionalidade de busca de lives.
3. Após a implementação e execução dos testes, as alterações foram enviadas para o GitHub.
4. Foi aberto um **Pull Request** para revisão da funcionalidade.
5. Após aprovação, a funcionalidade foi integrada à branch `develop`.
6. Posteriormente, as alterações foram enviadas para a branch `main`.

---

## Equipe

| Membro | Responsabilidades |
|--------|-------------------|
| **Riquelme** | Configuração do CI/CD · GitHub Actions · Criação do pipeline · Configuração dos jobs e steps · Organização das branches · Documentação do projeto · Processo de Pull Request |
| **Gustavo Silva** | Desenvolvimento das funcionalidades · Cadastro de jogos e lives · Busca de lives por jogo · Geração da agenda · Testes automatizados · Correção de bugs e validações |

---

## Conclusão

O projeto **Stream Planner** atingiu o objetivo de solucionar a dificuldade de organização de transmissões ao vivo, permitindo o gerenciamento de jogos, lives e agendas de forma simples e eficiente.

Além das funcionalidades desenvolvidas, o projeto aplicou conceitos profissionais de qualidade de software, incluindo testes automatizados, build, jobs, steps, branches, pipeline, Pull Request e GitHub Actions, seguindo as práticas de CI/CD.

Ao todo, foram implementados **19 casos de teste** cobrindo os módulos de Jogo, Live, Agenda e Integração, garantindo a corretude das funcionalidades e a robustez das validações do sistema.

---

<p align="center">Desenvolvido com 💜 para streamers e criadores de conteúdo</p>
