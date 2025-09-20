// [file name]: main.ts
// 🔧 ARQUIVO MODIFICADO - Menu completo com console.clear()

import promptSync from "prompt-sync";
import { 
  inserirCliente, 
  inserirProduto, 
  listarClientes, 
  atualizarCliente,
  excluirCliente,
  buscarClientePorId,
  listarProdutos,
  atualizarProduto,
  excluirProduto,
  inserirCupom, 
  listarCupons, 
  desativarCupom 
} from "./cadastro";
import { fazerPedido } from "./fazerPedidos";
import { gerarRelatorio } from "./relatorio";
import { obterHistoricoPorCliente, obterEstatisticasCliente } from "./historicoService";
import { validarCPF, validarEmail } from "./utils";

const prompt = promptSync();

async function main() {
    console.clear();
    let loop = true;
    while (loop) {
        console.clear();
        console.log("======= PDV PIZZARIA ==========");
        console.log("1) Pedidos");
        console.log("2) Cadastros");
        console.log("3) Administração");
        console.log("4) Sair");
        let resposta = Number(prompt("Escolha: "));
        console.clear();
        
        switch (resposta) {
            case 1:
                console.log("======= PEDIDOS ==========");
                await fazerPedido();
                break;

            case 2:
                console.log("======= CADASTRO ==========");
                console.log("1) Gerenciar clientes");
                console.log("2) Gerenciar produtos");
                console.log("3) Voltar");
                resposta = Number(prompt("Escolha: "));
                console.clear();
                
                switch (resposta) {
                    case 1:
                        gerenciarClientes();
                        break;

                    case 2:
                        gerenciarProdutos();
                        break;

                    case 3:
                        break;

                    default:
                        console.log("Opção inválida");
                        break;
                }
                break;

            case 3:
                console.log("======= ADMINISTRAÇÃO ==========");
                console.log("1) Relatórios");
                console.log("2) Gerenciar cupons");
                console.log("3) Histórico de clientes");
                console.log("4) Voltar");
                resposta = Number(prompt("Escolha: "));

                switch (resposta) {
                    case 1:
                        console.clear();
                        console.log("1) Relatório por mês");
                        console.log("2) Relatório por dia");
                        console.log("3) Relatório por cliente");
                        console.log("4) Relatório personalizado");
                        const relatorioOpcao = Number(prompt("Escolha: "));
                        
                        if (relatorioOpcao === 1) {
                            gerarRelatorio("mes");
                        } else if (relatorioOpcao === 2) {
                            gerarRelatorio("dia");
                        } else if (relatorioOpcao === 3) {
                            const clienteId = Number(prompt("ID do cliente: "));
                            gerarRelatorio("cliente", { clienteId });
                        } else if (relatorioOpcao === 4) {
                            const dataInicio = prompt("Data início (YYYY-MM-DD): ");
                            const dataFim = prompt("Data fim (YYYY-MM-DD): ");
                            gerarRelatorio("personalizado", { dataInicio, dataFim });
                        }
                        break;
                        
                    case 2:
                        console.clear();
                        console.log("1) Adicionar cupom");
                        console.log("2) Listar cupons");
                        console.log("3) Desativar cupom");
                        const cupomOpcao = Number(prompt("Escolha: "));
                        
                        if (cupomOpcao === 1) {
                            const codigo = prompt("Digite o código do cupom: ");
                            const tipo = prompt("Tipo (percentual/valor): ") as "percentual" | "valor";
                            const desconto = Number(prompt("Digite o valor do desconto: "));
                            const id = inserirCupom(codigo, tipo, desconto);
                            console.log(`Cupom criado! id: ${id}`);
                        } else if (cupomOpcao === 2) {
                            console.table(listarCupons());
                        } else if (cupomOpcao === 3) {
                            const id = Number(prompt("Digite o ID do cupom para desativar: "));
                            if (desativarCupom(id)) {
                                console.log("Cupom desativado com sucesso!");
                            } else {
                                console.log("Cupom não encontrado.");
                            }
                        }
                        break;
                        
                    case 3:
                        console.clear();
                        const clienteId = Number(prompt("ID do cliente para consultar histórico: "));
                        const historico = obterHistoricoPorCliente(clienteId);
                        const estatisticas = obterEstatisticasCliente(clienteId);
                        
                        console.log(`\n=== HISTÓRICO DO CLIENTE #${clienteId} ===`);
                        console.log(`Total de pedidos: ${estatisticas.totalPedidos}`);
                        console.log(`Total gasto: R$${estatisticas.totalGasto.toFixed(2)}`);
                        console.log(`Ticket médio: R$${estatisticas.ticketMedio.toFixed(2)}`);
                        
                        console.log("\nÚltimos pedidos:");
                        historico.slice(-5).forEach(pedido => {
                            console.log(`\nPedido #${pedido.id} - ${new Date(pedido.data).toLocaleDateString('pt-BR')}`);
                            console.log(`Total: R$${pedido.total.toFixed(2)}`);
                            console.log(`Forma de pagamento: ${pedido.pagamento}`);
                        });
                        break;
                        
                    case 4:
                        break;
                }
                break;

            case 4:
                loop = false;
                console.log("======= PDV PIZZARIA ==========");
                console.log("Saindo.....");
                break;

            default:
                console.log("Opção inválida");
                break;
        }
        
        if (loop) {
            prompt("Pressione Enter para continuar...");
            console.clear();
        }
    }
}

function gerenciarClientes() {
    let loop = true;
    while (loop) {
        console.clear();
        console.log("======= GERENCIAR CLIENTES ==========");
        console.log("1) Novo cliente");
        console.log("2) Listar clientes");
        console.log("3) Atualizar cliente");
        console.log("4) Excluir cliente");
        console.log("5) Voltar");
        const resposta = Number(prompt("Escolha: "));
        
        switch (resposta) {
            case 1:
                console.clear();
                console.log("======= CADASTRO CLIENTE ==========");
                const nome = prompt("Nome do cliente: ");
                const idade = Number(prompt("Idade do cliente: "));
                const telefone = prompt("Número de telefone: ");
                const cpf = Number(prompt("CPF (apenas números): "));
                const email = prompt("E-mail (opcional): ");
                const endereco = prompt("Endereço (opcional): ");
                
                if (!validarCPF(cpf)) {
                    console.log("CPF inválido!");
                    break;
                }
                
                if (email && !validarEmail(email)) {
                    console.log("E-mail inválido!");
                    break;
                }
                
                try {
                    const id = inserirCliente(nome, idade, telefone, cpf, email, endereco);
                    console.log(`Cliente cadastrado com ID: ${id}`);
                } catch (error: any) {
                    console.error("Erro ao cadastrar cliente:", error.message);
                }
                break;
                
            case 2:
                try {
                    console.clear();
                    const clientes = listarClientes();
                    console.log("======= CLIENTES CADASTRADOS ==========");
                    console.table(clientes);
                } catch (error) {
                    console.error("Erro ao listar clientes:", error);
                }
                break;
                
            case 3:
                console.clear();
                const idAtualizar = Number(prompt("ID do cliente para atualizar: "));
                const cliente = buscarClientePorId(idAtualizar);
                
                if (!cliente) {
                    console.log("Cliente não encontrado!");
                    break;
                }
                
                console.log("Deixe em branco para manter o valor atual");
                const novoNome = prompt(`Nome [${cliente.nome}]: `) || cliente.nome;
                const novaIdade = Number(prompt(`Idade [${cliente.idade}]: `) || cliente.idade);
                const novoTelefone = prompt(`Telefone [${cliente.telefone}]: `) || cliente.telefone;
                const novoEmail = prompt(`E-mail [${cliente.email || ""}]: `) || cliente.email;
                const novoEndereco = prompt(`Endereço [${cliente.endereco || ""}]: `) || cliente.endereco;
                
                if (atualizarCliente(idAtualizar, {
                    nome: novoNome,
                    idade: novaIdade,
                    telefone: novoTelefone,
                    email: novoEmail,
                    endereco: novoEndereco
                })) {
                    console.log("Cliente atualizado com sucesso!");
                } else {
                    console.log("Erro ao atualizar cliente!");
                }
                break;
                
            case 4:
                console.clear();
                const idExcluir = Number(prompt("ID do cliente para excluir: "));
                if (excluirCliente(idExcluir)) {
                    console.log("Cliente excluído com sucesso!");
                } else {
                    console.log("Cliente não encontrado!");
                }
                break;
                
            case 5:
                loop = false;
                break;
                
            default:
                console.log("Opção inválida");
                break;
        }
        
        if (loop && resposta !== 5) {
            prompt("Pressione Enter para continuar...");
            console.clear();
        }
    }
}

function gerenciarProdutos() {
    let loop = true;
    while (loop) {
        console.clear();
        console.log("======= GERENCIAR PRODUTOS ==========");
        console.log("1) Novo produto");
        console.log("2) Listar produtos");
        console.log("3) Atualizar produto");
        console.log("4) Excluir produto");
        console.log("5) Voltar");
        const resposta = Number(prompt("Escolha: "));
        
        switch (resposta) {
            case 1:
                console.clear();
                console.log("======= CADASTRO PRODUTO ==========");
                const produto = prompt("Digite nome do produto: ");
                const tipo = prompt("Digite o tipo do produto: ").toLowerCase();
                const valor = Number(prompt("Digite o valor do produto: "));
                const quantidade = Number(prompt("Digite a quantidade no estoque: "));
                
                try {
                    const id = inserirProduto(produto, tipo, valor, quantidade);
                    console.log(`Novo produto criado! id: ${id}`);
                } catch (error) {
                    console.error("Erro ao cadastrar produto:", error);
                }
                break;
                
            case 2:
                try {
                    console.clear();
                    const produtos = listarProdutos(false);
                    console.log("======= PRODUTOS CADASTRADOS ==========");
                    console.table(produtos);
                } catch (error) {
                    console.error("Erro ao listar produtos:", error);
                }
                break;
                
            case 3:
                console.clear();
                const idAtualizar = Number(prompt("ID do produto para atualizar: "));
                const produtoAntigo = listarProdutos(false).find(p => p.id === idAtualizar);
                
                if (!produtoAntigo) {
                    console.log("Produto não encontrado!");
                    break;
                }
                
                console.log("Deixe em branco para manter o valor atual");
                const novoProduto = prompt(`Nome [${produtoAntigo.produto}]: `) || produtoAntigo.produto;
                const novoTipo = prompt(`Tipo [${produtoAntigo.tipo}]: `) || produtoAntigo.tipo;
                const novoValor = Number(prompt(`Valor [${produtoAntigo.valor}]: `) || produtoAntigo.valor);
                const novaQuantidade = Number(prompt(`Quantidade [${produtoAntigo.quantidade}]: `) || produtoAntigo.quantidade);
                
                if (atualizarProduto(idAtualizar, {
                    produto: novoProduto,
                    tipo: novoTipo,
                    valor: novoValor,
                    quantidade: novaQuantidade
                })) {
                    console.log("Produto atualizado com sucesso!");
                } else {
                    console.log("Erro ao atualizar produto!");
                }
                break;
                
            case 4:
                console.clear();
                const idExcluir = Number(prompt("ID do produto para excluir: "));
                if (excluirProduto(idExcluir)) {
                    console.log("Produto excluído com sucesso!");
                } else {
                    console.log("Produto não encontrado!");
                }
                break;
                
            case 5:
                loop = false;
                break;
                
            default:
                console.log("Opção inválida");
                break;
        }
        
        if (loop && resposta !== 5) {
            prompt("Pressione Enter para continuar...");
            console.clear();
        }
    }
}

main().catch(console.error);