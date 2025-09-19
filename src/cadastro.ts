import { loadData, saveData } from "./jsonDatabase";

interface Cliente {
  id: number;
  nome: string;
  idade: number;
  telefone: string;
  cpf: number; 
}
interface Produto {
    id: number;
    produto: string;
    tipo: string;
    valor: number;
    quantidade: number
}
interface Cupom {
  id: number;
  codigo: string;
  tipo: "percentual" | "valor";
  desconto: number;
}

const CUPONS_FILE = "./cupons.json";

const CLIENTES_FILE = "./clientes.json";
const PRODUTOS_FILE = "./produtos.json";
const EXTRATO_FILE = "./estrato.json";

export function inserirCliente(nome: string, idade: number, telefone: string, cpf: number): number {
  const clientes = loadData<Cliente>(CLIENTES_FILE);
  const novoCliente: Cliente = {
    id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
    nome,
    idade,
    telefone,
    cpf
  };
  clientes.push(novoCliente);
  saveData(CLIENTES_FILE, clientes);
  return novoCliente.id;
}

export function listarClientes(): Cliente[] {
  return loadData<Cliente>(CLIENTES_FILE);
}


// PRODUTOS

export function inserirProduto(produto: string, tipo: string, valor: number, quantidade: number) {
    const produtos = loadData<Produto>(PRODUTOS_FILE);
    const novoProduto: Produto = {
    id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
    produto,
    tipo,
    valor,
    quantidade

  };
  produtos.push(novoProduto);
  saveData(PRODUTOS_FILE, produtos);
  return novoProduto.id;
}

//cupons

// Inserir cupom
// CUPONS

export function inserirCupom(codigo: string, tipo: "percentual" | "valor", desconto: number): number {
  const cupons = loadData<Cupom>(CUPONS_FILE);
  const novoCupom: Cupom = {
    id: cupons.length > 0 ? cupons[cupons.length - 1].id + 1 : 1,
    codigo: codigo.toUpperCase(),
    tipo,
    desconto
  };
  cupons.push(novoCupom);
  saveData(CUPONS_FILE, cupons);
  return novoCupom.id;
}

export function listarCupons(): Cupom[] {
  return loadData<Cupom>(CUPONS_FILE);
}

export function excluirCupom(id: number): boolean {
  const cupons = loadData<Cupom>(CUPONS_FILE);
  const index = cupons.findIndex(c => c.id === id);
  if (index !== -1) {
    cupons.splice(index, 1);
    saveData(CUPONS_FILE, cupons);
    return true;
  }
  return false;
}