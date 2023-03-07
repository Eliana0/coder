let parametro = 1000

function numeroRandom(cantNumero){
    let lista = [];
    for (let i = 0; i < cantNumero; i++) {
        let random = Math.random();
        random = random * parametro + 1;
        random = Math.trunc(random);
        lista[i] = random;                                                          
    }
    return lista
}

process.on("message", data => {
  const result = numeroRandom(data);
  process.send(result);
});

/* artillery quick --count 50 -n 20 http://localhost:8080/info > infoReport.txt */