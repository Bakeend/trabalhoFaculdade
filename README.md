# 🍕 Sistema de Pizzaria

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node.js](https://img.shields.io/badge/node-%3E%3D14-green)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D4-blue)
![Downloads](https://img.shields.io/npm/dt/pizzaria-system)
![Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)

Sistema completo de gerenciamento para pizzarias, desenvolvido em **TypeScript**. Permite cadastro de clientes, produtos, pedidos, cupons, relatórios e histórico de vendas.

---

## 🎬 Demonstração

![Demo](https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif)
*GIF ilustrativo mostrando fluxo de pedidos e cadastro de clientes.*

---

## 🚀 Funcionalidades

* ✅ Cadastro completo de clientes (CRUD)
* ✅ Cadastro completo de produtos (CRUD)
* ✅ Sistema de pedidos com múltiplas formas de pagamento (Dinheiro, Cartão, PIX)
* ✅ Cupons de desconto (percentual e valor fixo)
* ✅ Relatórios de vendas (diário, mensal, por cliente, personalizado)
* ✅ Histórico de compras por cliente
* ✅ Controle de estoque automático
* ✅ Emissão de nota fiscal

---

## 📂 Estrutura do Projeto

```
pizzaria-system/
├── src/
│   ├── main.ts
│   ├── cadastro.ts
│   ├── relatorio.ts
│   ├── fazerPedidos.ts
│   ├── historicoService.ts
│   ├── tipos.ts
│   ├── utils.ts
│   └── jsonDatabase.ts
├── data/
│   ├── clientes.json
│   ├── produtos.json
│   ├── pedidos.json
│   ├── historico.json
│   └── cupons.json
└── documentation/
    ├── manual-uso.md
    └── diagramas/
```

---

## ⚙️ Pré-requisitos

* Node.js ≥ 14
* npm ou yarn

---

## 💻 Instalação Rápida

```bash
# Clonar repositório
git clone <url-do-repositorio>

# Entrar na pasta do projeto
cd pizzaria-system

# Instalar dependências
npm install
```

### Execução com npx

```bash
# Executar aplicação rapidamente
npx ts-node src/main.ts
```

---

## 📦 Dependências

* `prompt-sync` → Entrada de dados no terminal
* `@types/node` → Tipos TypeScript para Node.js (dev)
* `typescript` e `ts-node` → Compilar e executar TypeScript

Instalação:

```bash
npm install prompt-sync
npm install -D @types/node typescript ts-node
```

---

## 🛠 Scripts

* `npm start` → Executa a aplicação
* `npm run build` → Compila TypeScript para JavaScript
* `npm run dev` → Executa em modo de desenvolvimento

---

## 📊 Diagramas

Na pasta `documentation/diagramas`:

* Fluxograma do sistema (`fluxograma.drawio`)
* Mapa mental da estrutura (`estrutura.xmind`)

---

## 📝 Manual de Uso

Para instruções detalhadas: [manual-uso.md](documentation/manual-uso.md)

---

## 🤝 Contribuição

1. Faça um fork deste repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça commit das alterações: `git commit -m "Minha contribuição"`
4. Envie para a branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## ⚠️ Avisos

* Mantenha o estoque sempre atualizado.
* Cadastre todos os clientes para histórico completo.
* Cupons de valor fixo são invalidados após uso.

---

## 📌 Issues e Suporte

* Abra issues para bugs ou sugestões: [Issues](https://github.com/<usuario>/<repositorio>/issues)

---

## 📜 Licença

MIT License
