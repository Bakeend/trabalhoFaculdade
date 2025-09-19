import promptSync from "prompt-sync";
import { 
  inserirCliente, 
  inserirProduto, 
  listarClientes, 
  inserirCupom, 
  listarCupons, 
  excluirCupom 
} from "./cadastro";
import { fazerPedido } from "./fazerPedidos";
import { gerarRelatorio } from "./relatorio"; // arquivo relatorio.ts

const prompt = promptSync();

async function main() {
    let loop = true;
    while (loop) {
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
                await fazerPedido(); // precisa do await porque é async
                break;

            case 2:
                console.log("======= CADASTRO ==========");
                console.log("1) Novo cliente");
                console.log("2) Novo produto");
                console.log("3) Atualizar dados (sem funcionamento)");
                console.log("4) Listar clientes");
                console.log("5) Voltar");
                resposta = Number(prompt("Escolha: "));
                console.clear();
                
                switch (resposta) {
                    case 1: 
                        console.log("======= CADASTRO CLIENTE ==========");
                        const nome = prompt("Nome do cliente: ");
                        const idade = Number(prompt("Idade do cliente: "));
                        const telefone = prompt("Número de telefone: ");
                        const cpf = Number(prompt("Digite o cpf (sem pontuação)"));
                        
                        try {
                            const id = inserirCliente(nome, idade, telefone, cpf);
                            console.log(`Cliente cadastrado com ID: ${id}`);
                        } catch (error) {
                            console.error("Erro ao cadastrar cliente:", error);
                        }
                        break;

                    case 2:
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

                    case 3:
                        console.log("Funcionalidade em desenvolvimento");
                        break;

                    case 4:
                        try {
                            const clientes = listarClientes();
                            console.log("======= CLIENTES CADASTRADOS ==========");
                            console.table(clientes);
                        } catch (error) {
                            console.error("Erro ao listar clientes:", error);
                        }
                        break;

                    case 5:
                        break;

                    default:
                        console.log("Opção inválida");
                        break;
                }
                break;

            case 3:
                console.log("======= ADMINISTRAÇÃO ==========");
                console.log("1) Relatório por mês");
                console.log("2) Relatório por dia");
                console.log("3) Gerenciar cupons");
                resposta = Number(prompt("Escolha: "));

                if (resposta === 1) {
                    gerarRelatorio("mes");
                } else if (resposta === 2) {
                    gerarRelatorio("dia");
                } else if (resposta === 3) {
                    console.log("1) Adicionar cupom");
                    console.log("2) Listar cupons");
                    console.log("3) Excluir cupom");
                    const opc = Number(prompt("Escolha: "));
                    if (opc === 1) {
                        const codigo = prompt("Digite o código do cupom: ");
                        const tipo = prompt("Tipo (percentual/valor): ") as "percentual" | "valor";
                        const desconto = Number(prompt("Digite o valor do desconto: "));
                        const id = inserirCupom(codigo, tipo, desconto);
                        console.log(`Cupom criado! id: ${id}`);
                    } else if (opc === 2) {
                        console.table(listarCupons());
                    } else if (opc === 3) {
                        const id = Number(prompt("Digite o ID do cupom para excluir: "));
                        if (excluirCupom(id)) {
                            console.log("Cupom excluído com sucesso!");
                        } else {
                            console.log("Cupom não encontrado.");
                        }
                    }
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

main().catch(console.error);
