// [file name]: utils.ts
// ✅ NOVO ARQUIVO - Funções utilitárias

export function formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

export function formatarData(dataISO: string): string {
    return new Date(dataISO).toLocaleDateString('pt-BR');
}

export function validarCPF(cpf: number): boolean {
    const cpfStr = cpf.toString().padStart(11, '0');
    if (cpfStr.length !== 11 || /^(\d)\1{10}$/.test(cpfStr)) {
        return false;
    }
    
    // Validação de dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpfStr.charAt(i)) * (10 - i);
    }
    
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfStr.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpfStr.charAt(i)) * (11 - i);
    }
    
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfStr.charAt(10))) return false;
    
    return true;
}

export function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função auxiliar para o relatorio.ts
export function formatarDataCompleta(dataISO: string): string {
    return new Date(dataISO).toLocaleString('pt-BR');
}