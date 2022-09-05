const CHAR_NUMBER = "0123456789";
const CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
const CHAR_SPECIAL = "!@#$%&*()";
const CHAR_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const BTN_GERADOR = document.getElementById('btn-gerador');
const INPUT_SENHA = document.getElementById('senha');
const INPUT_NUMBER = document.getElementById('input-number');
const CHECKBOX_UPPER = document.getElementById('checkbox-upper');
const CHECKBOX_NUMBER = document.getElementById('checkbox-number');
const CHECKBOX_SPECIAL = document.getElementById('checkbox-special');

var intervaloAtual = CHAR_LOWER;

function gerarSenha(){
    var senha = ""
    
    var tamanhoSenha = (INPUT_NUMBER.value === '') ? 8 : parseInt(INPUT_NUMBER.value);
    INPUT_NUMBER.value = tamanhoSenha;

    for(let i = 0; i < tamanhoSenha; i++){
        senha += intervaloAtual[Math.floor(Math.random() * intervaloAtual.length)];
    }

    INPUT_SENHA.value = senha;
}

function copiarSenha(){
   
    var texto = INPUT_SENHA;
      
    texto.select();
    texto.setSelectionRange(0, 99999); 
        
    if(navigator.clipboard.writeText(texto.value)){
        texto.value = "Copiado!";
    }
}

setInterval(() => {
    if(CHECKBOX_UPPER.checked && !(intervaloAtual.search(CHAR_UPPER) > -1)){
        intervaloAtual = intervaloAtual + CHAR_UPPER;
    } else 
    if(!(CHECKBOX_UPPER.checked)){
        intervaloAtual = intervaloAtual.replace(CHAR_UPPER, '');
    }

    if(CHECKBOX_NUMBER.checked && !(intervaloAtual.search(CHAR_NUMBER) > -1)){
        intervaloAtual = intervaloAtual + CHAR_NUMBER;
    } else 
    if(!(CHECKBOX_NUMBER.checked)){
        intervaloAtual = intervaloAtual.replace(CHAR_NUMBER, '');
    }

    if(CHECKBOX_SPECIAL.checked && !(intervaloAtual.search('!') > -1)){
        intervaloAtual = intervaloAtual + CHAR_SPECIAL;
    } else 
    if(!(CHECKBOX_SPECIAL.checked)){
        intervaloAtual = intervaloAtual.replace(CHAR_SPECIAL, '');
    }

},10)


