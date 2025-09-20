// [file name]: cadastro.ts
// 🔧 ARQUIVO MODIFICADO - Funções completas de CRUD

import { loadData, saveData } from "./jsonDatabase";
import { Cliente, Produto, Cupom } from "./tipos";

const CUPONS_FILE = "cupons.json";
const CLIENTES_FILE = "clientes.json";
const PRODUTOS_FILE = "produtos.json";


// CLIENTES - CRUD COMPLETO
export function inserirCliente(nome: string, idade: number, telefone: string, cpf: number, email?: string, endereco?: string): number {
  const clientes = loadData<Cliente>(CLIENTES_FILE);
  
  // Verificar se CPF já existe
  const cpfExistente = clientes.find(c => c.cpf === cpf);
  if (cpfExistente) {
    throw new Error("CPF já cadastrado no sistema");
  }
  
  const novoCliente: Cliente = {
    id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
    nome,
    idade,
    telefone,
    cpf,
    email,
    endereco
  };
  
  clientes.push(novoCliente);
  saveData(CLIENTES_FILE, clientes);
  return novoCliente.id;
}

export function listarClientes(): Cliente[] {
  return loadData<Cliente>(CLIENTES_FILE);
}

export function atualizarCliente(id: number, dados: Partial<Cliente>): boolean {
  const clientes = loadData<Cliente>(CLIENTES_FILE);
  const index = clientes.findIndex(c => c.id === id);
  
  if (index === -1) return false;
  
  // Atualiza apenas os campos fornecidos
  clientes[index] = { ...clientes[index], ...dados };
  saveData(CLIENTES_FILE, clientes);
  return true;
}

export function excluirCliente(id: number): boolean {
  const clientes = loadData<Cliente>(CLIENTES_FILE);
  const index = clientes.findIndex(c => c.id === id);
  
  if (index === -1) return false;
  
  clientes.splice(index, 1);
  saveData(CLIENTES_FILE, clientes);
  return true;
}

export function buscarClientePorId(id: number): Cliente | undefined {
  const clientes = loadData<Cliente>(CLIENTES_FILE);
  return clientes.find(c => c.id === id);
}

// PRODUTOS - CRUD COMPLETO
export function inserirProduto(produto: string, tipo: string, valor: number, quantidade: number): number {
  const produtos = loadData<Produto>(PRODUTOS_FILE);
  
  const novoProduto: Produto = {
    id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
    produto,
    tipo,
    valor,
    quantidade,
    ativo: true
  };
  
  produtos.push(novoProduto);
  saveData(PRODUTOS_FILE, produtos);
  return novoProduto.id;
}

export function listarProdutos(apenasAtivos: boolean = true): Produto[] {
  const produtos = loadData<Produto>(PRODUTOS_FILE);
  return apenasAtivos ? produtos.filter(p => p.ativo) : produtos;
}

export function atualizarProduto(id: number, dados: Partial<Produto>): boolean {
  const produtos = loadData<Produto>(PRODUTOS_FILE);
  const index = produtos.findIndex(p => p.id === id);
  
  if (index === -1) return false;
  
  produtos[index] = { ...produtos[index], ...dados };
  saveData(PRODUTOS_FILE, produtos);
  return true;
}

export function excluirProduto(id: number): boolean {
  // Exclusão lógica (apenas marca como inativo)
  return atualizarProduto(id, { ativo: false });
}

export function buscarProdutoPorId(id: number): Produto | undefined {
  const produtos = loadData<Produto>(PRODUTOS_FILE);
  return produtos.find(p => p.id === id);
}

// CUPONS - CRUD COMPLETO
export function inserirCupom(codigo: string, tipo: "percentual" | "valor", desconto: number): number {
  const cupons = loadData<Cupom>(CUPONS_FILE);
  
  const novoCupom: Cupom = {
    id: cupons.length > 0 ? Math.max(...cupons.map(c => c.id)) + 1 : 1,
    codigo: codigo.toUpperCase(),
    tipo,
    desconto,
    valido: true
  };
  
  cupons.push(novoCupom);
  saveData(CUPONS_FILE, cupons);
  return novoCupom.id;
}

export function listarCupons(apenasValidos: boolean = true): Cupom[] {
  const cupons = loadData<Cupom>(CUPONS_FILE);
  return apenasValidos ? cupons.filter(c => c.valido) : cupons;
}

export function desativarCupom(id: number): boolean {
  const cupons = loadData<Cupom>(CUPONS_FILE);
  const index = cupons.findIndex(c => c.id === id);
  
  if (index === -1) return false;
  
  cupons[index].valido = false;
  saveData(CUPONS_FILE, cupons);
  return true;
}