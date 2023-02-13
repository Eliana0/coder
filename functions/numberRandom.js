let cantNumero = 1000
let parametro = 10000
    let lista = [];
    for (let i = 0; i < cantNumero; i++) {
        let random = Math.random();
        random = random * parametro + 1;
        random = Math.trunc(random);
        lista[i] = random;
    }

process.send(lista)