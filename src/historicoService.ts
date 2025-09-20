// [file name]: historicoService.ts
// 🔧 ARQUIVO MODIFICADO - Garantindo exportação correta

import { loadData, saveData } from "./jsonDatabase";
import { Pedido } from "./tipos";

const HISTORICO_FILE = "historico.json";

export function obterHistoricoCompleto(): Pedido[] {
    return loadData<Pedido>(HISTORICO_FILE);
}

export function obterHistoricoPorCliente(clienteId: number): Pedido[] {
    const historico = loadData<Pedido>(HISTORICO_FILE);
    return historico.filter(pedido => pedido.clienteId === clienteId);
}

export function obterHistoricoPorPeriodo(dataInicio: Date, dataFim: Date): Pedido[] {
    const historico = loadData<Pedido>(HISTORICO_FILE);
    return historico.filter(pedido => {
        const dataPedido = new Date(pedido.data);
        return dataPedido >= dataInicio && dataPedido <= dataFim;
    });
}

export function obterEstatisticasCliente(clienteId: number) {
    const historicoCliente = obterHistoricoPorCliente(clienteId);
    
    const totalGasto = historicoCliente.reduce((total, pedido) => total + pedido.total, 0);
    const totalPedidos = historicoCliente.length;
    const produtosComprados = historicoCliente.flatMap(pedido => 
        pedido.itens.map(item => ({ nome: item.nome, quantidade: item.quantidade }))
    );
    
    // Agrupar produtos por nome para obter totais
    const produtosAgrupados: {[key: string]: number} = {};
    produtosComprados.forEach(produto => {
        produtosAgrupados[produto.nome] = (produtosAgrupados[produto.nome] || 0) + produto.quantidade;
    });
    
    return {
        totalGasto,
        totalPedidos,
        produtosComprados: produtosAgrupados,
        ticketMedio: totalPedidos > 0 ? totalGasto / totalPedidos : 0
    };
}

export function adicionarAoHistorico(pedido: Pedido): void {
    const historico = loadData<Pedido>(HISTORICO_FILE);
    historico.push(pedido);
    saveData(HISTORICO_FILE, historico);
}