// [file name]: fazerPedidos.ts
// 🔧 ARQUIVO MODIFICADO - Vinculação de pedidos a clientes com console.clear()

import promptSync from "prompt-sync";
import { loadData, saveData } from "./jsonDatabase";
import { listarCupons } from "./cadastro";
import { adicionarAoHistorico } from "./historicoService";
import { buscarClientePorId, listarClientes } from "./cadastro";
import { Pedido, ItemPedido } from "./tipos";
import { formatarMoeda } from "./utils";

const prompt = promptSync();
const PEDIDOS_FILE = "pedidos.json";
const HISTORICO_FILE = "historico.json";

export async function fazerPedido() {
  console.clear();
  const produtos = loadData<any>("produtos.json");

  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado no sistema!");
    return;
  }

  // Listar clientes para seleção
  console.log("======= SELECIONAR CLIENTE =======");
  const clientes = listarClientes();
  if (clientes.length > 0) {
    console.table(clientes.map(c => ({ id: c.id, nome: c.nome, telefone: c.telefone })));
  }
  
  let clienteId: number | undefined;
  const opcaoCliente = prompt("Digite o ID do cliente (ou Enter para pedido sem cadastro): ");
  if (opcaoCliente) {
    clienteId = parseInt(opcaoCliente);
    const cliente = buscarClientePorId(clienteId);
    if (!cliente) {
      console.log("Cliente não encontrado! Continuando com pedido sem cadastro.");
      clienteId = undefined;
    } else {
        console.clear();
      console.log(`Cliente: ${cliente.nome}`);
    }
  }

  console.log("======= CARDÁPIO =======");
  produtos.forEach((p, i) => {
    if (p.ativo && p.quantidade > 0) {
      console.log(`${i + 1}) ${p.produto} (${p.tipo}) - R$${p.valor} - Estoque: ${p.quantidade}`);
    }
  });

  const escolha = prompt("Escolha os itens separados por vírgula (ex: 1,3): ");
  const indices = escolha.split(",").map((n) => parseInt(n.trim()) - 1);

  let itens: ItemPedido[] = [];
  let total = 0;

  indices.forEach((i) => {
    if (i >= 0 && i < produtos.length && produtos[i].ativo && produtos[i].quantidade > 0) {
      const quantidadeItem = Number(prompt(`Quantidade para ${produtos[i].produto}: `)) || 1;
      
      if (quantidadeItem <= produtos[i].quantidade) {
        itens.push({ 
          nome: produtos[i].produto, 
          preco: produtos[i].valor, 
          quantidade: quantidadeItem 
        });
        total += produtos[i].valor * quantidadeItem;
        
        // Atualizar estoque
        produtos[i].quantidade -= quantidadeItem;
      } else {
        console.log(`Estoque insuficiente para ${produtos[i].produto}. Disponível: ${produtos[i].quantidade}`);
      }
    }
  });

  if (itens.length === 0) {
    console.log("Nenhum item válido selecionado!");
    return;
  }

  // Escolher forma de pagamento
  console.log("======= PAGAMENTO =======");
  console.log("1) Dinheiro");
  console.log("2) Cartão de Crédito");
  console.log("3) Cartão de Débito");
  console.log("4) PIX");
  const opcaoPg = Number(prompt("Escolha a forma de pagamento: "));

  // Perguntar cupom
  const codigoCupom = prompt("Digite o cupom de desconto (ou Enter para nenhum): ").toUpperCase();
  let descontoAplicado = 0;

  if (codigoCupom) {
    const cupons = listarCupons();
    const cupom = cupons.find(c => c.codigo === codigoCupom && c.valido);

    if (cupom) {
      if (cupom.tipo === "percentual") {
        descontoAplicado = (total * cupom.desconto) / 100;
      } else if (cupom.tipo === "valor") {
        descontoAplicado = cupom.desconto;
      }
      console.log(`Cupom aplicado: ${codigoCupom} (-${formatarMoeda(descontoAplicado)})`);
      total -= descontoAplicado;
      
      // Invalidar cupom de valor único
      if (cupom.tipo === "valor") {
        // Esta função precisa ser implementada em cadastro.ts
        // desativarCupom(cupom.id);
      }
    } else {
      console.log("⚠️ Cupom inválido, nenhum desconto aplicado.");
    }
  }

  let pagamento = "Dinheiro";
  switch (opcaoPg) {
    case 1: pagamento = "Dinheiro"; break;
    case 2: pagamento = "Cartão de Crédito"; break;
    case 3: pagamento = "Cartão de Débito"; break;
    case 4: pagamento = "PIX"; break;
    default: pagamento = "Dinheiro"; break;
  }

  const pedidos = loadData<Pedido>(PEDIDOS_FILE);
  const novoPedido: Pedido = {
    id: pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) + 1 : 1,
    clienteId,
    itens,
    total,
    pagamento,
    desconto: descontoAplicado,
    data: new Date().toISOString()
  };

  pedidos.push(novoPedido);
  saveData(PEDIDOS_FILE, pedidos);
  
  // Salvar atualização de estoque
 saveData("produtos.json", produtos);

  console.log("Pedido registrado com sucesso!");
  console.table(novoPedido.itens);
  if (descontoAplicado > 0) {
    console.log(`Desconto aplicado: -${formatarMoeda(descontoAplicado)}`);
  }
  console.log(`TOTAL: ${formatarMoeda(novoPedido.total)}`);
  console.log(`Pagamento: ${novoPedido.pagamento}`);

  // Simula preparo
  console.log("Preparando pedido...");
  await new Promise((resolve) => setTimeout(resolve, 7000));
  console.clear();
  console.log("Pedido pronto e entregue!");

  // NOTA FISCAL
  console.log("\n======= NOTA FISCAL =======");
  console.log(`Pedido Nº: ${novoPedido.id}`);
  console.log(`Data: ${new Date(novoPedido.data).toLocaleString('pt-BR')}`);
  if (clienteId) {
    const cliente = buscarClientePorId(clienteId);
    console.log(`Cliente: ${cliente?.nome}`);
  }
  console.table(novoPedido.itens.map(item => ({
    Produto: item.nome,
    Quantidade: item.quantidade,
    'Preço Unit.': formatarMoeda(item.preco),
    Subtotal: formatarMoeda(item.preco * item.quantidade)
  })));
  
  if (descontoAplicado > 0) {
    console.log(`Desconto aplicado: -${formatarMoeda(descontoAplicado)}`);
  }
  console.log(`Total a pagar: ${formatarMoeda(novoPedido.total)}`);
  console.log(`Pagamento: ${novoPedido.pagamento}`);
  console.log("CNPJ: 12.345.678/0001-99");
  console.log("Endereço: Av. das Pizzas, 123 - Centro");
  console.log("OBRIGADO PELA PREFERÊNCIA!");
  console.log("=============================\n");

  // Remove do pedidos.json (só mantém histórico)
  const atualizados = loadData<Pedido>(PEDIDOS_FILE).filter((p) => p.id !== novoPedido.id);
  saveData(PEDIDOS_FILE, atualizados);
  console.log("Pedido removido do sistema.");

  // Salvar no histórico
  adicionarAoHistorico(novoPedido);
  console.log("Pedido salvo no histórico!");
}