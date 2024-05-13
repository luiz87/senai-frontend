// lista dos itens que estarão no jogo
let lsEmoticons = ["😀","😎","😴","😍","🤯","🤑","🤣","😭"];

// replicar os itens na tabela
const tamanho = lsEmoticons.length;
for (let i = 0; i < tamanho; i++) {
    lsEmoticons.push(lsEmoticons[i])    
}