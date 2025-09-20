// [file name]: relatorio.ts
// 🔧 ARQUIVO MODIFICADO - Corrigindo importação

import { loadData } from "./jsonDatabase";
import { Pedido } from "./tipos";
import { obterHistoricoPorPeriodo, obterHistoricoPorCliente, obterEstatisticasCliente } from "./historicoService";
import { formatarMoeda, formatarData } from "./utils";

export function gerarRelatorio(tipo: "mes" | "dia" | "cliente" | "personalizado", filtro?: any) {
const historico = loadData<Pedido>("historico.json");

    if (historico.length === 0) {
        console.log("Nenhum pedido no histórico.");
        return;
    }

    switch (tipo) {
        case "mes":
            gerarRelatorioMensal(historico);
            break;
        case "dia":
            gerarRelatorioDiario(historico);
            break;
        case "cliente":
            if (!filtro || !filtro.clienteId) {
                console.log("ID do cliente é necessário para este relatório");
                return;
            }
            gerarRelatorioCliente(filtro.clienteId);
            break;
        case "personalizado":
            if (!filtro || !filtro.dataInicio || !filtro.dataFim) {
                console.log("Datas de início e fim são necessárias para este relatório");
                return;
            }
            gerarRelatorioPersonalizado(new Date(filtro.dataInicio), new Date(filtro.dataFim));
            break;
        default:
            console.log("Tipo de relatório não reconhecido");
    }
}

function gerarRelatorioMensal(historico: Pedido[]) {
    const porMes: { [key: string]: { total: number, pedidos: number, produtos: {[key: string]: number} } } = {};
    
    historico.forEach(p => {
        const mes = new Date(p.data).toISOString().slice(0, 7); // YYYY-MM
        if (!porMes[mes]) {
            porMes[mes] = { total: 0, pedidos: 0, produtos: {} };
        }
        
        porMes[mes].total += p.total;
        porMes[mes].pedidos += 1;
        
        // Contabilizar produtos vendidos
        p.itens.forEach(item => {
            porMes[mes].produtos[item.nome] = (porMes[mes].produtos[item.nome] || 0) + item.quantidade;
        });
    });
    
    console.log("======= RELATÓRIO POR MÊS =======");
    for (const mes in porMes) {
        console.log(`\n--- ${mes} ---`);
        console.log(`Total de vendas: ${formatarMoeda(porMes[mes].total)}`);
        console.log(`Número de pedidos: ${porMes[mes].pedidos}`);
        console.log("Produtos vendidos:");
        for (const produto in porMes[mes].produtos) {
            console.log(`  ${produto}: ${porMes[mes].produtos[produto]} unidades`);
        }
    }
}

function gerarRelatorioDiario(historico: Pedido[]) {
    const porDia: { [key: string]: { total: number, pedidos: number } } = {};
    
    historico.forEach(p => {
        const dia = new Date(p.data).toISOString().slice(0, 10); // YYYY-MM-DD
        porDia[dia] = porDia[dia] || { total: 0, pedidos: 0 };
        porDia[dia].total += p.total;
        porDia[dia].pedidos += 1;
    });
    
    console.log("======= RELATÓRIO POR DIA =======");
    console.table(porDia);
}

function gerarRelatorioCliente(clienteId: number) {
    const historicoCliente = obterHistoricoPorCliente(clienteId);
    const estatisticas = obterEstatisticasCliente(clienteId);
    
    console.log("======= RELATÓRIO DO CLIENTE =======");
    console.log(`ID do Cliente: ${clienteId}`);
    console.log(`Total de pedidos: ${estatisticas.totalPedidos}`);
    console.log(`Total gasto: ${formatarMoeda(estatisticas.totalGasto)}`);
    console.log(`Ticket médio: ${formatarMoeda(estatisticas.ticketMedio)}`);
    console.log("\nProdutos comprados:");
    
    for (const produto in estatisticas.produtosComprados) {
        console.log(`  ${produto}: ${estatisticas.produtosComprados[produto]} unidades`);
    }
    
    console.log("\nÚltimos pedidos:");
    historicoCliente.slice(-5).forEach(pedido => {
        console.log(`\nPedido #${pedido.id} - ${formatarData(pedido.data)}`);
        console.log(`Total: ${formatarMoeda(pedido.total)}`);
        console.log(`Forma de pagamento: ${pedido.pagamento}`);
    });
}

function gerarRelatorioPersonalizado(dataInicio: Date, dataFim: Date) {
    const historicoPeriodo = obterHistoricoPorPeriodo(dataInicio, dataFim);
    let totalPeriodo = 0;
    let totalPedidos = historicoPeriodo.length;
    const produtosVendidos: {[key: string]: number} = {};
    const formasPagamento: {[key: string]: number} = {};
    
    historicoPeriodo.forEach(pedido => {
        totalPeriodo += pedido.total;
        formasPagamento[pedido.pagamento] = (formasPagamento[pedido.pagamento] || 0) + 1;
        
        pedido.itens.forEach(item => {
            produtosVendidos[item.nome] = (produtosVendidos[item.nome] || 0) + item.quantidade;
        });
    });
    
    console.log("======= RELATÓRIO PERSONALIZADO =======");
    console.log(`Período: ${formatarData(dataInicio.toISOString())} à ${formatarData(dataFim.toISOString())}`);
    console.log(`Total de vendas: ${formatarMoeda(totalPeriodo)}`);
    console.log(`Número de pedidos: ${totalPedidos}`);
    
    console.log("\nFormas de pagamento:");
    for (const forma in formasPagamento) {
        console.log(`  ${forma}: ${formasPagamento[forma]} pedidos`);
    }
    
    console.log("\nProdutos vendidos:");
    for (const produto in produtosVendidos) {
        console.log(`  ${produto}: ${produtosVendidos[produto]} unidades`);
    }
}