# [file name]: README.md
# ✅ NOVO ARQUIVO - Documentação principal

# Sistema de Pizzaria

Sistema completo de gerenciamento para pizzarias, desenvolvido em TypeScript.

## Funcionalidades

- ✅ Cadastro completo de clientes (CRUD)
- ✅ Cadastro completo de produtos (CRUD)  
- ✅ Sistema de pedidos com múltiplas formas de pagamento
- ✅ Cupons de desconto (percentual e valor fixo)
- ✅ Relatórios de vendas (diário, mensal, por cliente, personalizado)
- ✅ Histórico de compras por cliente
- ✅ Controle de estoque
- ✅ Emissão de nota fiscal

## Estrutura do Projeto
pizzaria-system/
├── src/
│ ├── main.ts # Ponto de entrada da aplicação
│ ├── cadastro.ts # Funções de CRUD para clientes, produtos e cupons
│ ├── relatorio.ts # Geração de relatórios de vendas
│ ├── fazerPedidos.ts # Processo de realização de pedidos
│ ├── historicoService.ts # Serviço de histórico de compras
│ ├── tipos.ts # Interfaces TypeScript
│ ├── utils.ts # Funções utilitárias
│ └── jsonDatabase.ts # Funções de persistência em JSON
├── data/
│ ├── clientes.json # Base de dados de clientes
│ ├── produtos.json # Base de dados de produtos
│ ├── pedidos.json # Pedidos em andamento
│ ├── historico.json # Histórico de pedidos finalizados
│ └── cupons.json # Cupons de desconto
└── documentation/
├── manual-uso.md # Manual de utilização
└── diagramas/ # Diagramas do sistema
text

## Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd pizzaria-system

# Instale as dependências
npm install
Execução
bash
# Executar via terminal
npm start

# Ou executar via npx
npx ts-node src/main.ts
Dependências
•	prompt-sync: Para entrada de dados via terminal
•	@types/node: Tipos TypeScript para Node.js
Instalar dependências:
bash
npm install prompt-sync
npm install -D @types/node typescript ts-node
Scripts Disponíveis
•	npm start: Executa a aplicação
•	npm run build: Compila o TypeScript para JavaScript
•	npm run dev: Executa em modo de desenvolvimento
Diagramas
Consulte a pasta documentation/diagramas para:
•	Fluxograma do sistema (fluxograma.drawio)
•	Mapa mental da estrutura (estrutura.xmind)
text

```markdown
# [file name]: manual-uso.md
# ✅ NOVO ARQUIVO - Manual de utilização

# Manual de Utilização - Sistema de Pizzaria

## 1. Menu Principal

Ao iniciar o sistema, você verá o menu principal com as opções:

1. **Pedidos**: Realizar novo pedido
2. **Cadastros**: Gerenciar clientes e produtos
3. **Administração**: Relatórios, cupons e histórico
4. **Sair**: Encerrar o sistema

## 2. Realizando Pedidos

### 2.1. Seleção do Cliente
- O sistema lista clientes cadastrados
- É possível pular esta etapa para clientes não cadastrados

### 2.2. Seleção de Produtos
- Cardápio é exibido com produtos disponíveis
- Digite os números dos produtos separados por vírgula
- Informe a quantidade desejada de cada item

### 2.3. Forma de Pagamento
- Dinheiro
- Cartão de Crédito
- Cartão de Débito
- PIX

### 2.4. Cupons de Desconto
- Digite o código do cupom (se aplicável)
- Descontos percentuais ou de valor fixo

### 2.5. Confirmação e Nota Fiscal
- Sistema exibe resumo do pedido
- Gera nota fiscal automaticamente
- Atualiza estoque de produtos

## 3. Gerenciando Cadastros

### 3.1. Clientes
- **Novo cliente**: Cadastra com dados completos
- **Listar clientes**: Visualiza todos cadastrados
- **Atualizar cliente**: Altera dados existentes
- **Excluir cliente**: Remove cadastro

### 3.2. Produtos
- **Novo produto**: Adiciona item ao cardápio
- **Listar produtos**: Visualiza todos os produtos
- **Atualizar produto**: Modifica preço, estoque, etc.
- **Excluir produto**: Remove item (exclusão lógica)

## 4. Administração

### 4.1. Relatórios
- **Por mês**: Vendas agregadas por mês
- **Por dia**: Vendas agregadas por dia
- **Por cliente**: Histórico e estatísticas de cliente específico
- **Personalizado**: Período customizado

### 4.2. Cupons
- **Adicionar cupom**: Cria novo código de desconto
- **Listar cupons**: Visualiza cupons ativos
- **Desativar cupom**: Invalida cupom existente

### 4.3. Histórico de Clientes
- Consulta por ID do cliente
- Exibe total gasto, ticket médio e produtos comprados
- Mostra últimos pedidos realizados

## 5. Funcionalidades Avançadas

### 5.1. Validação de CPF
- Sistema valida digitos verificadores
- Impede cadastro de CPFs inválidos

### 5.2. Controle de Estoque
- Diminui automaticamente ao realizar pedidos
- Impede pedidos com quantidade superior ao estoque

### 5.3. Histórico de Compras
- Todos os pedidos ficam salvos permanentemente
- Permite análise de comportamento de compra

## 6. Dicas de Uso

1. **Cadastre todos os clientes** para habilitar histórico personalizado
2. **Mantenha o estoque atualizado** para evitar indisponibilidades
3. **Use relatórios mensais** para análise de desempenho
4. **Cupons de valor fixo** são automaticamente invalidados após uso

## 7. Solução de Problemas

### 7.1. Erro de estoque insuficiente
- Verifique o estoque atual do produto
- Atualize a quantidade disponível se necessário

### 7.2. Cliente não encontrado
- Verifique se o cliente está cadastrado
- Confirme o ID informado

### 7.3. Cupom inválido
- Verifique se o código está correto
- Confirme se o cupom ainda está válido

