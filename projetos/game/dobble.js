let lsFiguras = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let txt = "1";

for (let i = 1; i < lsFiguras.length; i++) {
    txt += `,${lsFiguras[i]}`;
    if (i % 3 == 0) txt += "\n1";
}
txt = txt.substr(0, txt.length - 2);
let baralho = txt.split("\n");

for (let i = 0; i < baralho.length; i++) {
    baralho[i] = baralho[i].split(",");
}

let grupo = 1;
while (baralho.length < lsFiguras.length) {
    let carta = [lsFiguras[grupo].toString()];
    baralho.push(carta);
    incluirFigura(carta);
    if (Math.floor(baralho.length % 3 == 1)) grupo++;
}

function incluirFigura(carta) {
    let ii = (baralho.length - 1) % 3;
    if (ii == 0) ii = 3;
    let linha = ((grupo - 1) * 3) + 1
    for (let i = linha; i < linha + 3; i++) {
        carta.push(baralho[i][ii]);
        ii++;
        if (ii > 3) ii = 1;
    }
}
console.log(baralho);