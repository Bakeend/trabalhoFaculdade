// [file name]: tipos.ts
// ✅ NOVO ARQUIVO - Centraliza todas as interfaces

export interface ItemPedido {
  nome: string;
  preco: number;
  quantidade: number;
}

export interface Pedido {
  id: number;
  clienteId?: number;
  itens: ItemPedido[];
  total: number;
  pagamento: string;
  data: string;
  desconto?: number;
}

export interface Cliente {
  id: number;
  nome: string;
  idade: number;
  telefone: string;
  cpf: number;
  email?: string;
  endereco?: string;
}

export interface Produto {
  id: number;
  produto: string;
  tipo: string;
  valor: number;
  quantidade: number;
  ativo: boolean;
}

export interface Cupom {
  id: number;
  codigo: string;
  tipo: "percentual" | "valor";
  desconto: number;
  valido: boolean;
}