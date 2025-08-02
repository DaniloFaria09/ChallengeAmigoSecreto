let amigos = [];
let resultadoSorteio = [];
let indiceAtual = 0;

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (!nome) {
        alert('Digite um nome válido.');
        return;
    }

    if (amigos.includes(nome)) {
        alert('Este nome já foi adicionado.');
        return;
    }

    amigos.push(nome);
    input.value = '';
    atualizarLista();
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para sortear.');
        return;
    }

    let sorteados = [...amigos];
    let tentativas = 0;
    const maxTentativas = 100;
    let sucesso = false;

    while (tentativas < maxTentativas && !sucesso) {
        tentativas++;
        sorteados = embaralhar([...sorteados]);
        sucesso = true;

        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === sorteados[i]) {
                sucesso = false;
                break;
            }
        }
    }

    if (!sucesso) {
        alert('Não foi possível sortear sem repetições. Tente novamente.');
        return;
    }

    // Armazena os pares sorteados
    resultadoSorteio = amigos.map((amigo, i) => `${amigo} seu amigo secreto é: ${sorteados[i]}`);
    indiceAtual = 0;

    // Exibe botão "Próximo"
    document.getElementById('btnProximo').style.display = 'inline-block';
    document.getElementById('resultado').innerHTML = '';
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function mostrarProximoPar() {
    const resultadoEl = document.getElementById('resultado');
    resultadoEl.innerHTML = '';

    if (indiceAtual < resultadoSorteio.length) {
        const li = document.createElement('li');
        li.textContent = resultadoSorteio[indiceAtual];
        resultadoEl.appendChild(li);
        indiceAtual++;
    }

    if (indiceAtual >= resultadoSorteio.length) {
        // Após o último par, limpa após 2 segundos e esconde o botão
        setTimeout(() => {
            resultadoEl.innerHTML = '';
            document.getElementById('btnProximo').style.display = 'none';
        }, 2000);
    }
}





