// BIBLIOTECAS
import promptSync from "prompt-sync";

const prompt = promptSync();




function main () {
    let loop = true

    while(loop) {
    console.log("=====================================");
    console.log("         PDV - PIZZALOG              ");
    console.log("=====================================");

    console.log("Main\n");
    console.log("1) - Cadastros");
    console.log("2) - Pedidos ");
    console.log("3) Administração");
    console.log("4) Sair")
    const escolha = Number(prompt("Escolha: "));
    
    switch (escolha) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            loop = false;
            break;
        default:
            console.log("Escolhe uma opção valída!");
            break;
    }

    }
}