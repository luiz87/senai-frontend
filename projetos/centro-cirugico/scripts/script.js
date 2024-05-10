document.getElementById('bt-apagar').addEventListener('click', apagar);
document.getElementById('bt-gravar').addEventListener('click', gravar);
document.getElementById('bt-novo').addEventListener('click', limparForm);
let lista = [];

let tpStatus = {
    "Em Fila": "text-bg-info",
    "Iniciado": "text-bg-success",
    "Concluido": "text-bg-danger"
}

function gravar() {
    let indice = document.getElementById('indice').value;
    let _lineNumber = document.getElementById('_lineNumber').value;
    let nome = document.getElementById('nome').value;
    let status = document.getElementById('status').value;
    if (nome != '' && status != '') {
        let obj = {};
        obj.nome = nome;
        obj.status = status;
        if (indice == "") {
            createRow(obj).then((o) => {
                lista.push(o);
                ataulizarTabela();
            });
        } else {
            patchRow(_lineNumber, obj).then((o) => {
                lista[indice] = o;
                ataulizarTabela();
            });
        }
        console.table(lista);
        
        limparForm();
    } else {
        alert('Item e Status devem estar preenchidos')
    }
}

function ataulizarTabela() {
    localStorage.setItem("lista",JSON.stringify(lista));
    let tbody = '';
    if (lista.length > 0) {
        let i = 0;
        for (const obj of lista) {
            if(obj.nome != ""){
                tbody += `<tr onclick='editar(${i})'><td class="${tpStatus[obj.status]}">${obj.nome}</td></tr>`;
            }
            i++;
        }
    } else {
        tbody = `<tr><td>Lista vazia</td></tr>`;
    }
    document.getElementById('tbody').innerHTML = tbody;
}

function limparForm() {
    document.getElementById('indice').value = "";
    document.getElementById('_lineNumber').value = "";
    document.getElementById('nome').value = "";
    document.getElementById('status').value = "";
}

function editar(indice) {
    obj = lista[indice];
    document.getElementById('indice').value = indice;
    document.getElementById('_lineNumber').value = obj._lineNumber;
    document.getElementById('nome').value = obj.nome;
    document.getElementById('status').value = obj.status;
}

function apagar() {
    let indice = document.getElementById('indice').value;
    let _lineNumber = document.getElementById('_lineNumber').value;
    if (indice != "") {
        deleteRow(_lineNumber).then(() =>{
            lista.splice(indice, 1);
            ataulizarTabela();
        });
        limparForm();
    } else {
        alert("Necessário selecionar algum nome.")
    }
}

async function getData() {
    const response = await fetch("https://api.zerosheets.com/v1/ww2");
    const data = await response.json();

    // will return an array of objects with the _lineNumber
    return data;
}

async function createRow(payload) {
    /* Payload should be an object with the columns you want to create, example:
    const payload = {
        column1: "foo",
        column2: "bar"
    };
    */
    const response = await fetch("https://api.zerosheets.com/v1/ww2", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    const data = await response.json();
  
    return data;
}

async function patchRow(lineNumber, payload) {
    /* Payload should be an object with the columns you want to update, example:

    const payload = {
        foo: "bar"
    };
    */
    const url = "https://api.zerosheets.com/v1/ww2/" + lineNumber;
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    
    // will return an object of the new row plus the _lineNumber
    return data;
}

async function deleteRow(lineNumber) {
    const url = "https://api.zerosheets.com/v1/ww2/" + lineNumber; // lineNumber comes from the get request
    await fetch(url, {
        method: "DELETE"
    });
    // No response data is returned
}

getData().then( (ls) => {
    lista = ls;
    ataulizarTabela();
} );