let lsFiguras = ['😊','😎','😍','🤣','🤐','🤯','😤','🤑','😉','😴','😘','😝','😨'];//];
let txt = lsFiguras[0];
let qtItens = 3;
for (let i = 1; i < lsFiguras.length; i++) {
    txt += `,${lsFiguras[i]}`;
    if (i % qtItens == 0 && i <lsFiguras.length-1) txt += "\n"+lsFiguras[0];
}
let baralho = txt.split("\n");

for (let i = 0; i < baralho.length; i++) {
    baralho[i] = baralho[i].split(",");
}

let grupo = 1;
while (baralho.length < lsFiguras.length) {
    let carta = [lsFiguras[grupo].toString()];
    baralho.push(carta);
    incluirFigura(carta);
    if (Math.floor(baralho.length % qtItens == 1)) grupo++;
}

function incluirFigura(carta) {
    let ii = (baralho.length - 1) % qtItens;
    if (ii == 0) ii = qtItens;
    let linha = ((grupo - 1) * qtItens) + 1
    for (let i = linha; i < linha + qtItens; i++) {
        carta.push(baralho[i][ii]);
        ii++;
        if (ii > qtItens) ii = 1;
    }
}
console.log(baralho);