var canvas = document.getElementById('ahorcado');
var ctx = canvas.getContext("2d");

var palabra;
var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
var colorTecla = "#585858";
var colorMargen = "red";
var inicioX = 200;
var inicioY = 300;
var lon = 35;
var margen = 20;

var teclas_array = [];
var letras_array = [];
var nombres_array = [
    "DIEGO",
    "ANA",
    "CARLOS",
    "MARIA",
    "JUAN",
    "LAURA",
    "PEDRO",
    "ISABEL",
    "ALEJANDRO",
    "SOFIA",
    "MIGUEL",
  ];
  
  var animales_array = [
    "LEON",
    "GATO",
    "PERRO",
    "ELEFANTE",
    "TIGRE",
    "JIRAFA",
    "RINOCERONTE",
    "COCODRILO",
    "HIPOPOTAMO",
    "ZORRO",
    "LEOPARDO",
  ];
  
  var ciudades_array = [
    "GUERRERO",
    "CHILAPA",
    "MEXICO",
    "NEW YORK",
    "PARIS",
    "TOKYO",
    "ROME",
    "BERLIN",
    "BEIJING",
    "SYDNEY",
    "MOSCOW",
  ];
  

var maxIntentos = 5; // Número máximo de intentos
var intentosRestantes = maxIntentos; // Inicializamos el contador de intentos

function actualizarContadorIntentos() {
    document.getElementById("intentos-faltantes").textContent = "Intentos faltantes: " + intentosRestantes;
}

function cambiarCategoria() {
    var categoriaSeleccionada = document.getElementById("categoria").value;
    // Obtener el array correspondiente a la categoría seleccionada
    var arraySeleccionado;

    if (categoriaSeleccionada === "nombres") {
        arraySeleccionado = nombres_array;
    } else if (categoriaSeleccionada === "animales") {
        arraySeleccionado = animales_array;
    } else if (categoriaSeleccionada === "ciudades") {
        arraySeleccionado = ciudades_array;
    } else {
        // Si la categoría no coincide con ninguna de las opciones conocidas, puedes manejarlo de alguna manera (por ejemplo, mostrar un mensaje de error).
        console.error("Categoría no válida");
        return;
    }

    // Reiniciar el juego con la nueva palabra
    reiniciarJuego(arraySeleccionado);
}

function reiniciarJuego(arrayPalabras) {
    aciertos = 0;
    errores = 0;
    intentosRestantes = maxIntentos; // Reiniciar el contador de intentos
    actualizarContadorIntentos();
    teclas_array = [];
    letras_array = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    teclado();
    pintaPalabra(arrayPalabras);
    horca(errores);
}

function mostrarCategoria1() {
    console.log("Categoría 1: Nombres");
    console.log(nombres_array.join(", "));
}

function mostrarCategoria2() {
    console.log("Categoría 2: Animales");
    console.log(animales_array.join(", "));
}

function mostrarCategoria3() {
    console.log("Categoría 3: Ciudades");
    console.log(ciudades_array.join(", "));
}

// Ejemplos de uso
mostrarCategoria1();
mostrarCategoria2();
mostrarCategoria3();

var aciertos = 0;
var errores = 0;

function Tecla(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaTecla;
}

function Letra(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaCajaLetra;
    this.dibujaLetra = dibujaLetraLetra;
}

function dibujaTecla() {
    ctx.fillStyle = colorTecla;
    ctx.strokeStyle = colorMargen;
    // Dibujar teclas con diferentes colores y formas
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.ancho, this.y);
    ctx.lineTo(this.x + this.ancho, this.y + this.alto);
    ctx.lineTo(this.x, this.y + this.alto);
    ctx.closePath();
    // Establecer color y trazo
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "bold 20px courier";
    ctx.fillText(this.letra, this.x + this.ancho / 2 - 5, this.y + this.alto / 2 + 5);
}

// Función para obtener un color aleatorio
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function dibujaLetraLetra() {
    ctx.fillStyle = "black";
    ctx.font = "bold 40px Courier";
    ctx.fillText(this.letra, this.x + this.ancho / 2 - 12, this.y + this.alto / 2 + 14);
}

function dibujaCajaLetra() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
}

function pistaFunction(palabra) {
    let pistas = {
        "LEON": "Ruge y es fuerte",
        "CABALLO": "Hay de tierra y hay de mar",
        "PERRO": "El mejor amigo del hombre",
        "GATO": "Son tiernos pero arañan"
        // Agrega más pistas según tus nombres
    };

    return pistas[palabra] || "No hay pista aun xP";
}

function teclado() {
    var ren = 0;
    var col = 0;
    var letra = "";
    var miTecla;
    var x = inicioX;
    var y = inicioY;

    for (var i = 0; i < letras.length; i++) {
        letra = letras.substr(i, 1);
        miTecla = new Tecla(x, y, lon, lon, letra);
        miTecla.dibuja();
        teclas_array.push(miTecla);
        x += lon + margen;
        col++;

        if (col == 10) {
            col = 0;
            ren++;
            x = ren === 2 ? 280 : inicioX;
        }

        y = inicioY + ren * 50;
    }
}

function pintaPalabra(arrayPalabras) {
    var p = Math.floor(Math.random() * arrayPalabras.length);
    palabra = arrayPalabras[p];

    var w = canvas.width;
    var len = palabra.length;
    var ren = 0;
    var col = 0;
    var y = 230;
    var lon = 50;
    var x = (w - (lon + margen) * len) / 2;

    for (var i = 0; i < palabra.length; i++) {
        letra = palabra.substr(i, 1);
        miLetra = new Letra(x, y, lon, lon, letra);
        miLetra.dibuja();
        letras_array.push(miLetra);
        x += lon + margen;
    }
}

function horca(errores) {
    var imagen = new Image();
    imagen.src = "imagenes/ahorcado" + errores + ".png";
    imagen.onload = function () {
        ctx.drawImage(imagen, 390, 0, 230, 230);
    }
}

function ajusta(xx, yy) {
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx - posCanvas.left;
    var y = yy - posCanvas.top;
    return { x: x, y: y };
}

function selecciona(e) {
    var pos = ajusta(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var tecla;
    var bandera = false;

    if (intentosRestantes > 0) {
        for (var i = 0; i < teclas_array.length; i++) {
            tecla = teclas_array[i];
            if (tecla.x > 0) {
                if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)) {
                    break;
                }
            }
        }

        if (i < teclas_array.length) {
            for (var i = 0; i < palabra.length; i++) {
                letra = palabra.substr(i, 1);
                if (letra == tecla.letra) {
                    var caja = letras_array[i];
                    caja.dibujaLetra();
                    aciertos++;
                    bandera = true;
                }
            }

            if (!bandera) {
                errores++;
                intentosRestantes--; // Disminuir el contador de intentos
                actualizarContadorIntentos();
                horca(errores);
                if (errores == 5) gameOver(errores);
            }

            ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
            tecla.x - 1;

            if (aciertos == palabra.length) gameOver(errores);
        }
    }
}

function restartGame() {
    location.reload();
}

function gameOver(errores) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";

    ctx.font = "bold 50px Courier";
    if (errores < 5) {
        ctx.fillText("Muy bien, la palabra es: ", 110, 280);
    } else {
        ctx.fillText("Lo sentimos, la palabra era: ", 110, 280);
    }

    ctx.font = "bold 80px Courier";
    lon = (canvas.width - (palabra.length * 48)) / 2;
    ctx.fillText(palabra, lon, 380);
    horca(errores);
}
function dibujarElementosUI() {
    // Dibujar el div de intentos faltantes
    ctx.fillStyle = "#333";
    ctx.font = "bold 20px Arial";
    ctx.fillText("Intentos faltantes: " + intentosRestantes, 20, 20);

    // Dibujar la etiqueta y el select de categoría
    ctx.fillStyle = "#333";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Selecciona una categoría:", 20, 50);

    // Dibujar el botón Volver a Jugar
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(canvas.width - 160, 20, 140, 40);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Volver a Jugar", canvas.width - 150, 45);
}

// Llamas a esta función en la inicialización y cada vez que necesites actualizar la interfaz
function actualizarInterfaz() {
    ctx.clearRect(0, 0, canvas.width, 80); // Limpiar el área superior del canvas
    dibujarElementosUI();
}

// En la función window.onload, después de configurar el contexto y eventos:
window.onload = function () {
    canvas = document.getElementById("ahorcado");
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
        if (ctx) {
            teclado();
            pintaPalabra(nombres_array);
            horca(errores);
            actualizarContadorIntentos();
            canvas.addEventListener("click", selecciona, false);
            // Asegúrate de llamar a esta función después de cargar el canvas
            actualizarInterfaz();
        } else {
            alert("Error al cargar el contexto!");
        }
    }
};


window.onload = function () {
    canvas = document.getElementById("ahorcado");

    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");

        if (ctx) {
            teclado();
            pintaPalabra(nombres_array); // Inicia el juego con la categoría "Nombres"
            horca(errores);
            actualizarContadorIntentos();
            canvas.addEventListener("click", selecciona, false);
        } else {
            alert("Error al cargar el contexto!");
        }
    }
};

