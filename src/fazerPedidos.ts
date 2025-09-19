import promptSync from "prompt-sync";
import { loadData, saveData } from "./jsonDatabase";
import { listarCupons } from "./cadastro"; // ✅ IMPORTAÇÃO CORRIGIDA

const prompt = promptSync();
const PEDIDOS_FILE = "./pedidos.json";
const HISTORICO_FILE = "./historico.json";

interface Pedido {
  id: number;
  itens: { nome: string; preco: number; quantidade: number }[];
  total: number;
  pagamento: string;
  data: string; // ISO string com data/hora do pedido
  desconto?: number; // ✅ adicionamos campo opcional
}

export async function fazerPedido() {
  const produtos = loadData<any>("./produtos.json");

  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado no sistema!");
    return;
  }

  console.log("======= CARDÁPIO =======");
  produtos.forEach((p, i) => {
    console.log(`${i + 1}) ${p.produto} (${p.tipo}) - R$${p.valor}`);
  });

  const escolha = prompt("Escolha os itens separados por vírgula (ex: 1,3): ");
  const indices = escolha.split(",").map((n) => parseInt(n.trim()) - 1);

  let itens: { nome: string; preco: number; quantidade: number }[] = [];
  let total = 0;

  indices.forEach((i) => {
    if (i >= 0 && i < produtos.length) {
      itens.push({ nome: produtos[i].produto, preco: produtos[i].valor, quantidade: 1 });
      total += produtos[i].valor;
    }
  });

  if (itens.length === 0) {
    console.log("Nenhum item válido selecionado!");
    return;
  }

  // Escolher forma de pagamento
  console.log("======= PAGAMENTO =======");
  console.log("1) Dinheiro");
  console.log("2) Cartão");
  console.log("3) PIX");
  const opcaoPg = Number(prompt("Escolha a forma de pagamento: "));

  // Perguntar cupom
  const codigoCupom = prompt("Digite o cupom de desconto (ou Enter para nenhum): ").toUpperCase();
  let descontoAplicado = 0;

  if (codigoCupom) {
    const cupons = listarCupons();
    const cupom = cupons.find(c => c.codigo === codigoCupom);

    if (cupom) {
      if (cupom.tipo === "percentual") {
        descontoAplicado = (total * cupom.desconto) / 100;
      } else if (cupom.tipo === "valor") {
        descontoAplicado = cupom.desconto;
      }
      console.log(`Cupom aplicado: ${codigoCupom} (-R$${descontoAplicado.toFixed(2)})`);
      total -= descontoAplicado;
    } else {
      console.log("⚠️ Cupom inválido, nenhum desconto aplicado.");
    }
  }

  let pagamento = "Dinheiro";
  switch (opcaoPg) {
    case 1: pagamento = "Dinheiro"; break;
    case 2: pagamento = "Cartão"; break;
    case 3: pagamento = "PIX"; break;
    default: pagamento = "Dinheiro"; break;
  }

  const pedidos = loadData<Pedido>(PEDIDOS_FILE);
  const novoPedido: Pedido = {
    id: pedidos.length > 0 ? pedidos[pedidos.length - 1].id + 1 : 1,
    itens,
    total,
    pagamento,
    desconto: descontoAplicado,
    data: new Date().toISOString()
  };

  pedidos.push(novoPedido);
  saveData(PEDIDOS_FILE, pedidos);

  console.log("Pedido registrado com sucesso!");
  console.table(novoPedido.itens);
  if (descontoAplicado > 0) {
    console.log(`Desconto aplicado: -R$${descontoAplicado.toFixed(2)}`);
  }
  console.log(`TOTAL: R$${novoPedido.total.toFixed(2)}`);
  console.log(`Pagamento: ${novoPedido.pagamento}`);

  // Simula preparo
  console.log("Preparando pedido...");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("Pedido pronto e entregue!");

  // ==== NOTA FISCAL FALSA ====
  console.log("\n======= NOTA FISCAL =======");
  console.log(`Pedido Nº: ${novoPedido.id}`);
  console.table(novoPedido.itens);
  if (descontoAplicado > 0) {
    console.log(`Desconto aplicado: -R$${descontoAplicado.toFixed(2)}`);
  }
  console.log(`Total a pagar: R$${novoPedido.total.toFixed(2)}`);
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
  const historico = loadData<Pedido>(HISTORICO_FILE);
  historico.push(novoPedido);
  saveData(HISTORICO_FILE, historico);
  console.log("Pedido salvo no histórico!");
}
