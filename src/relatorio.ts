import { loadData, saveData } from "./jsonDatabase";
interface Pedido {
  id: number;
  itens: { nome: string; preco: number; quantidade: number }[];
  total: number;
  pagamento: string;
  data: string; // ISO string com data/hora do pedido
}
export function gerarRelatorio(tipo: "mes" | "dia") {
  const historico = loadData<Pedido>("./historico.json");

  if (historico.length === 0) {
    console.log("Nenhum pedido no histórico.");
    return;
  }

  if (tipo === "mes") {
    const porMes: { [key: string]: number } = {};
    historico.forEach(p => {
      const mes = new Date(p.data).toISOString().slice(0, 7); // YYYY-MM
      porMes[mes] = (porMes[mes] || 0) + p.total;
    });
    console.log("======= RELATÓRIO POR MÊS =======");
    console.table(porMes);
  }

  if (tipo === "dia") {
    const porDia: { [key: string]: number } = {};
    historico.forEach(p => {
      const dia = new Date(p.data).toISOString().slice(0, 10); // YYYY-MM-DD
      porDia[dia] = (porDia[dia] || 0) + p.total;
    });
    console.log("======= RELATÓRIO POR DIA =======");
    console.table(porDia);
  }
}
