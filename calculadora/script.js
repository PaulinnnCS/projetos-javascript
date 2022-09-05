var vetorEquacao = new Array();
var resultado = document.getElementById('screen');
var equacao = document.getElementById('equacao');

// inserir por teclas

document.addEventListener('keydown', (event) => {
    const KEY = event.key;
    if(KEY === 'Enter' || KEY === '='){
        pressButton('=');
    } else 
    if(KEY === 'Delete'){
        pressButton('C');
    } else
    if(KEY === ','){
        pressButton('.');
    }else {
        pressButton(KEY);
    }
});


function pressButton(caractere){
    var stringEquacao;
    var ultimoCaractere;
    var tamanhoUC;

    if(vetorEquacao.length == 3 && (caractere == '/' || caractere == '*' || caractere == '+' || caractere == '-')){
        operacao(caractere);
    }

    if((caractere >= 0 && caractere <= 9) || (caractere == '.' && !(verificarCaractere(vetorEquacao[vetorEquacao.length - 1], '.')))){
        if(vetorEquacao.length == 0 && caractere != '.'){
            vetorEquacao.push(caractere);
        } else 
        if(vetorEquacao.length == 1 && vetorEquacao[0].length <= 15){
            vetorEquacao[0] = vetorEquacao[0] + caractere;
        } else
        if(vetorEquacao.length == 2 && caractere != '.'){
            vetorEquacao.push(caractere);
        } else
        if(vetorEquacao.length == 3 && vetorEquacao[2].length <= 15){
            vetorEquacao[2] = vetorEquacao[2] + caractere; 
        } 
    } else
    if((caractere == '/' || caractere == '*' || caractere == '+' || caractere == '-') && vetorEquacao.length != 0){
        if(vetorEquacao[1] == null){
            vetorEquacao.push(caractere);
        } else
        if(caractere != vetorEquacao[1] && vetorEquacao.length < 3){
            vetorEquacao[1] = caractere;
        }
    } else
    if(caractere == 'C'){
        while(vetorEquacao.length != 0){
            vetorEquacao.pop();
        }  
    } else
    if(caractere == 'apagar'){
        var aux;
        if(vetorEquacao.length == 1){
            aux = verificarCaractere(vetorEquacao[0], '.');
            if(vetorEquacao[0] < 10 && !aux){
                vetorEquacao.pop();
            } else {
                vetorEquacao[0] = vetorEquacao[0].substring(0, vetorEquacao[0].length - 1);
            }
        } else
        if(vetorEquacao.length == 3){
            aux = verificarCaractere(vetorEquacao[2], '.');
            if(vetorEquacao[2] < 10 && !aux){
                vetorEquacao.pop();
            } else {
                vetorEquacao[2] = vetorEquacao[2].substring(0, vetorEquacao[2].length - 1);
            }
        } 
    }

    if(caractere != '='){
        stringEquacao = formarString(caractere);
        tamanhoUC = vetorEquacao[2] != null ? vetorEquacao[2].length : 1;
        ultimoCaractere = stringEquacao.substr(-tamanhoUC);

        if(ultimoCaractere >= 0){
            stringEquacao = stringEquacao.substring(0, stringEquacao.length - tamanhoUC);
        } 
        
        mostrarEquacao(stringEquacao);

        if(vetorEquacao.length == 0){
            mostrarResultado(0);
        } else
        if(vetorEquacao.length == 1 || vetorEquacao.length == 2){
            mostrarResultado(vetorEquacao[0]);
        } else
        if(vetorEquacao.length == 3){
            mostrarResultado(vetorEquacao[2]);
        } 
    } else 
    if((vetorEquacao[1] != null && vetorEquacao[2] != null) || (vetorEquacao[1] == null && vetorEquacao[2] == null)){
        stringEquacao = formarString(caractere);
        mostrarEquacao(stringEquacao + '=');

        if(vetorEquacao.length == 3){
            operacao(caractere);
            mostrarResultado(vetorEquacao[0]);
        }
    } else 
    if(vetorEquacao[1] != null && vetorEquacao[2] == null && caractere == '='){
        vetorEquacao.pop();
        stringEquacao = formarString(caractere);
        mostrarEquacao(stringEquacao + '=');

        if(vetorEquacao.length == 3){
            operacao(caractere);
            mostrarResultado(vetorEquacao[0]);
        }
    }
}

function mostrarResultado(valor){

    valor = separarString(valor, '.', ',');
    valor = addPonto(valor);
    resultado.innerText = valor;
}

function mostrarEquacao(valorEquacao){
    // valorEquacao = 5 + 5,5=
    
    if(vetorEquacao.length > 0 && vetorEquacao[0].length > 2 || vetorEquacao[2] > 2){
        valorEquacao = separarString(valorEquacao, '.', ',');
        valorEquacao = separarString(valorEquacao, '.', ',');
    }
    
    valorEquacao = addPonto(valorEquacao);
    //trocarVirgulaPonto(valorEquacao);
    equacao.innerText = valorEquacao;
}

function operacao(caractere){
    var valor;
    var vE0 = verificarCaractere(vetorEquacao[0], '.');
    var vE2 = verificarCaractere(vetorEquacao[2], '.');

    vE0 = vE0 ? parseFloat(vetorEquacao[0], 10) : parseInt(vetorEquacao[0], 10);
    vE2 = vE2 ? parseFloat(vetorEquacao[2], 10) : parseInt(vetorEquacao[2], 10);

    if(vetorEquacao[1] == '/'){
        valor = vE0 / vE2;
    } else
    if(vetorEquacao[1] == '*'){
        valor = vE0 * vE2; 
    } else
    if(vetorEquacao[1] == '+'){
        valor = vE0 + vE2;  
    } else
    if(vetorEquacao[1] == '-'){
        valor = vE0 - vE2; 
    }
    
    if(verificarCaractere(valor.toString(), '.')){
        reorganizarVetor(valor.toFixed(2));
    } else {
        reorganizarVetor(valor);
    }

    if(caractere != '='){
        vetorEquacao.push(caractere);
    }
}

function formarString(caractere){
    var string;
    if(vetorEquacao.length != 0 && (vetorEquacao.length != 1 || caractere == '=')){
        for(var i = 0; i < 3; i++){
            if(vetorEquacao[i] != null && i == 0){
                string = vetorEquacao[i];
            } else 
            if(vetorEquacao[i] != null){
                string += vetorEquacao[i];
            }
        }
    } else {
        string = '';
    }
    
    return string;
}

function reorganizarVetor(valor){
    while(vetorEquacao.length != 0){
        vetorEquacao.pop();
    }

    vetorEquacao.push(valor.toString());
}

function verificarCaractere(valor, separador){
    valor = valor + '';
    separador = separador + '';
    var verificador = valor.indexOf(separador);
    return (verificador > 0 ? verificador: false);
}

function separarString(string, separador, caractere){
    caractere = caractere + '';

    var indiceSeparador = verificarCaractere(string, separador);
    //string.indexOf(separador);
    var inicio, fim;
   
    if(indiceSeparador){
        inicio = string.substring(0, indiceSeparador);
        fim = string.substring(indiceSeparador + 1, string.length);
        string = inicio + caractere + fim;
    }
    
    return string;
}

function addPonto(string){
    //8075,5
    var indice = verificarCaractere(string, vetorEquacao[1]);
    //string.indexOf(vetorEquacao[1]); // + indice = 5
   // var verificador =  indice > 0 ? true : false; // true
    var inicio, fim, str1, str2, i;
    var strponto = new Array()

    if(indice){ //true
        inicio = string.substring(0,indice); // 8000
        fim = string.substring(indice + 1,string.length); // 75,5

        indice = verificarCaractere(inicio, ',');
        //inicio.indexOf(','); // -1
        //verificador =  indice > 0 ? true : false;
        if(indice){ //false
            str1 = inicio.substring(0, indice);
            str2 = inicio.substring(indice,inicio.length);

            if(str1.length >= 4){
                i = str1.length;
                while(i > 0){
                    strponto.push(str1.substring(i, i - 3));

                    i -= 3;
                }
                i = 0;
                str1 = '';
                while(i < strponto.length){
                    if(i + 1 == strponto.length){
                        str1 = strponto[i] + str1;
                    } else {
                        str1 = '.' + strponto[i] + str1; 
                    }
                    i++;
                }

                inicio = str1 + str2;
            }
        } else {
            if(inicio.length >= 4){ //true
                i = inicio.length; //i = 4 // 5000
                while(i > 0){
                    strponto.push(inicio.substring(i, i - 3));

                    i -= 3;
                }
                i = 0;
                inicio = '';
                while(i < strponto.length){ // 2
                    if(i + 1 == strponto.length){
                        inicio = strponto[i] + inicio;
                    } else {
                        inicio = '.' + strponto[i] + inicio; 
                    }
                    i++;
                }
            }
        }
        
        while(strponto.length != 0 ){
            strponto.pop();
        }

        indice = verificarCaractere(fim, ',');
        //fim.indexOf(','); //55,
        //verificador =  indice > 0 ? true : false; //true
        if(indice){
            str1 = fim.substring(0, indice); // 75
            str2 = fim.substring(indice,fim.length); // 5

            if(str1.length >= 4){ //false
                i = str1.length - 1;
                while(i > 0){
                    strponto.push(str1.substring(i, i - 3));

                    i -= 3;
                }
                i = 0;
                str1 = '';
                while(i < strponto.length){
                    if(i + 1 == strponto.length){
                        str1 = strponto[i] + str1;
                    } else {
                        str1 = '.' + strponto[i] + str1; 
                    }
                    i++;
                }

                fim = str1 + str2;
            }
        } else {
            if(fim.length >= 4){ 
                i = fim.length - 1; 
                while(i > 0){
                    strponto.push(fim.substring(i, i - 3));

                    i -= 3;
                }
                i = 0;
                fim = '';
                while(i < strponto.length){
                    if(i + 1 == strponto.length){
                        fim = strponto[i] + fim;
                    } else {
                        fim = '.' + strponto[i] + fim; 
                    }
                    i++;
                }
            }
        }
        string = inicio + vetorEquacao[1] + fim;
    } else 
    {
        indice = verificarCaractere(string, ',');
        //string.indexOf(','); 
        //verificador =  indice > 0 ? true : false;
        if(indice){
            str1 = string.substring(0, indice); //8075
            str2 = string.substring(indice,string.length); // ,5

            if(str1.length >= 4){
                i = str1.length;
                while(i > 0){
                    strponto.push(str1.substring(i, i - 3));

                    i -= 3;
                }
                i = 0;
                str1 = '';
                while(i < strponto.length){
                    if(i + 1 == strponto.length){
                        str1 = strponto[i] + str1;
                    } else {
                        str1 = '.' + strponto[i] + str1; 
                    }
                    i++;
                }

                string = str1 + str2;
            }
        } else {
            if(string.length >= 4){
                i = string.length;
                while(i > 0){
                    strponto.push(string.substring(i, i - 3));
    
                    i -= 3;
                }
                i = 0;
                string = '';
                while(i < strponto.length){
                    if(i + 1 == strponto.length){
                        string = strponto[i] + string;
                    } else {
                        string = '.' + strponto[i] + string; 
                    }
                    i++;
                }
            }
        }
    }

    return string;
}

