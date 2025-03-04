let listaNumSorteados = [];
let limArray = 10;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function mensagemInicial() {
  exibirTexto("h1", "Jogo do número secreto");
  exibirTexto("p", "Escolha um número entre 1 e 10");
}

mensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    exibirTexto("h1", "Acertou!");
    let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
    exibirTexto("p", `${mensagemTentativas}`);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTexto(
        "p",
        "O número secreto é menor que o chute... Tente novamente"
      );
    } else {
      exibirTexto(
        "p",
        "O número secreto é maior que o chute... Tente novamente"
      );
    }
    tentativas++;
    limparCampo();
  }
}

function numeroAleatorio() {
  let numEscolhido = parseInt(Math.random() * limArray + 1);
  let qntElementosLista = listaNumSorteados.length;

  if(qntElementosLista == limArray){
    listaNumSorteados = [];
  }

  if (listaNumSorteados.includes(numEscolhido)) {
    return numeroAleatorio();
  } else {
    listaNumSorteados.push(numEscolhido);
    console.log(listaNumSorteados);
    return numEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = numeroAleatorio();
  limparCampo();
  tentativas = 1;
  mensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
