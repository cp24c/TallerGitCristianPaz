const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
const decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const especiales = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
const centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
const grandes = ["", "mil", "millón", "mil millones", "billón", "mil billones", "trillón", "mil trillones"];

function traducirNumeroALetras(num) {
    if (num === 0) return "cero";
    if (num < 0) return "menos " + traducirNumeroALetras(Math.abs(num));

    let palabras = '';
    let partes = [];
    let contador = 0;

    while (num > 0) {
        let parte = num % 1000;
        if (parte > 0) {
            let textoParte = traducirTresDigitos(parte);
            if (contador > 0) {
                if (parte === 1 && contador > 1) {
                    textoParte = grandes[contador];  // "un millón", "mil millones"
                } else {
                    textoParte += " " + grandes[contador];
                    if (parte > 1 && contador == 2) {
                        textoParte += "es";  // Manejo de "millones"
                    }
                }
            }
            partes.push(textoParte);
        }
        num = Math.floor(num / 1000);
        contador++;
    }

    palabras = partes.reverse().join(' ');
    return palabras.trim();
}

function traducirTresDigitos(num) {
    let resultado = '';

    if (num >= 100) {
        if (num === 100) {
            resultado = "cien";
        } else {
            resultado = centenas[Math.floor(num / 100)] + " ";
        }
        num %= 100;
    }

    if (num >= 10 && num < 20) {
        resultado += especiales[num - 10];
    } else {
        resultado += decenas[Math.floor(num / 10)];
        if (num % 10 > 0) {
            resultado += (num >= 30 ? " y " : " ") + unidades[num % 10];
        }
    }

    return resultado.trim();
}

function traducir() {
    let numero = document.getElementById("numero").value;
    let numeroEntero = parseInt(numero);
    let resultado = traducirNumeroALetras(numeroEntero);
    document.getElementById("resultado").textContent = `${numero} en letras es: ${resultado}`;
}