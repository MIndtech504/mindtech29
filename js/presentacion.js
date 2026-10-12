// Función para alternar el modo Pantalla Completa
function alternarPantallaCompleta() {
    const elem = document.documentElement; // O el contenedor id="app-container"
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

// Datos de prueba integrados con lectura completa
let datosPresentacionLocal = {
    "curso": {
        "institucion": "UCRISH",
        "asignatura": "Tecnología",
        "grado": "9.º grado",
        "semana": 1,
        "tema": "Tipos de computadoras y su evolución"
    },
    "diapositivas": [
        {
            "titulo": "Portada: Tipos de Computadoras",
            "contenido": "Bienvenidos a la lección de la Semana 1. En esta unidad exploraremos el impacto y la clasificación de los equipos de cómputo.",
            "busquedaImagen": "computers technology history"
        },
        {
            "titulo": "Computadoras Personales y Portátiles",
            "contenido": "Las laptops y PCs de escritorio están diseñadas para el trabajo diario, ofreciendo potencia suficiente para tareas académicas y profesionales.",
            "busquedaImagen": "laptop desk office"
        },
        {
            "titulo": "Servidores y Supercomputadoras",
            "contenido": "Son equipos de alto rendimiento diseñados para procesar grandes volúmenes de datos, gestionar redes e impulsar la inteligencia artificial.",
            "busquedaImagen": "server room datacenter"
        }
    ],
    "actividades": {
        "sopaLetras": {
            "palabras": ["COMPUTADORA", "LAPTOP", "SERVIDOR", "HARDWARE", "SOFTWARE"]
        },
        "test": {
            "preguntas": [
                {
                    "pregunta": "¿Qué tipo de computadora está diseñada para gestionar redes y almacenar grandes volúmenes de datos?",
                    "opciones": ["Servidor", "Calculadora", "Reloj inteligente", "Tablet"],
                    "correcta": 0,
                    "retroalimentacion": "¡Correcto! Los servidores se encargan de gestionar servicios e información en red."
                }
            ]
        }
    }
};

let datosPresentacion = datosPresentacionLocal;
let slideActual = 0;

function cargarPresentacion() {
    document.getElementById('info-institucion').innerText = datosPresentacion.curso.institucion;
    document.getElementById('info-asignatura').innerText = datosPresentacion.curso.asignatura;
    document.getElementById('info-tema').innerText = `Semana ${datosPresentacion.curso.semana}: ${datosPresentacion.curso.tema}`;

    mostrarSlide();
}

async function mostrarSlide() {
    let diapositivas = datosPresentacion.diapositivas;
    
    if (slideActual < diapositivas.length) {
        let slide = diapositivas[slideActual];
        document.getElementById('slide-title').innerText = slide.titulo;
        
        let contenidoHtml = `<p style="font-size: 17px; color: #34495e; line-height: 1.6;">${slide.contenido}</p>`;
        contenidoHtml += `<div id="imagen-slide-container" style="margin-top: 15px; text-align: center; min-height: 180px;">Buscando ilustración en Pixabay...</div>`;
        
        document.getElementById('slide-content').innerHTML = contenidoHtml;

        if (slide.busquedaImagen && typeof buscarImagenPixabay === "function") {
            let urlImagen = await buscarImagenPixabay(slide.busquedaImagen);
            const contenedorImg = document.getElementById('imagen-slide-container');
            if (urlImagen && contenedorImg) {
                contenedorImg.innerHTML = `<img src="${urlImagen}" alt="Pixabay visual" style="max-width: 100%; max-height: 280px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); object-fit: cover;">`;
            } else if (contenedorImg) {
                contenedorImg.innerHTML = `<p style="color: #888; font-size: 13px;">Imagen ilustrativa no disponible.</p>`;
            }
        }

    } else if (slideActual === diapositivas.length) {
        document.getElementById('slide-title').innerText = "🧩 Actividad: Sopa de Letras";
        document.getElementById('slide-content').innerHTML = `<div id="contenedor-sopa"></div>`;
        if (datosPresentacion.actividades && datosPresentacion.actividades.sopaLetras) {
            generarSopaDeLetras('contenedor-sopa', datosPresentacion.actividades.sopaLetras.palabras);
        }
    } else {
        document.getElementById('slide-title').innerText = "📝 Test Autoevaluable";
        document.getElementById('slide-content').innerHTML = `<div id="contenedor-test"></div>`;
        if (datosPresentacion.actividades && datosPresentacion.actividades.test) {
            generarTestAutoevaluable('contenedor-test', datosPresentacion.actividades.test.preguntas);
        }
    }

    let totalPasos = diapositivas.length + 2;
    document.getElementById('indicador-paginas').innerText = `${slideActual + 1} / ${totalPasos}`;
}

function cambiarSlide(direccion) {
    let totalPasos = datosPresentacion.diapositivas.length + 2;
    slideActual += direccion;
    
    if (slideActual < 0) slideActual = 0;
    if (slideActual >= totalPasos) slideActual = totalPasos - 1;
    
    mostrarSlide();
}

window.onload = cargarPresentacion;
