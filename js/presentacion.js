let datosPresentacionLocal = {
    "curso": {
        "institucion": "UCRISH",
        "asignatura": "Español",
        "grado": "10.º grado",
        "semana": 6,
        "tema": "Tipos de textos"
    },
    "diapositivas": [
        {
            "titulo": "Portada: Semana 6",
            "contenido": "Bienvenidos a la unidad didáctica sobre los Tipos de Textos.",
            "busquedaImagen": "education books classroom"
        },
        {
            "titulo": "Introducción a los Textos",
            "contenido": "Los textos se clasifican según su intención comunicativa: informativos, argumentativos, literarios, periodísticos, etc.",
            "busquedaImagen": "reading writing literature"
        }
    ],
    "actividades": {
        "sopaLetras": {
            "palabras": ["TEXTO", "AUTOR", "LECTURA", "IDEA", "PARRAFO", "ARGUMENTO"]
        },
        "test": {
            "preguntas": [
                {
                    "pregunta": "¿Cuál de los siguientes es un texto argumentativo?",
                    "opciones": ["Una receta de cocina", "Un ensayo crítico", "Una descripción física", "Una lista de compras"],
                    "correcta": 1,
                    "retroalimentacion": "El ensayo busca defender una postura mediante argumentos."
                }
            ]
        }
    },
    "recursos": [
        { "titulo": "Guía completa de tipología textual (PDF)", "url": "#" }
    ]
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
        
        let contenidoHtml = `<p style="font-size: 16px; color: #34495e; line-height: 1.6;">${slide.contenido}</p>`;
        contenidoHtml += `<div id="imagen-slide-container" style="margin-top: 15px; text-align: center; min-height: 150px;">Buscando imagen educativa...</div>`;
        contenidoHtml += `<div id="recursos-slide-container"></div>`;
        
        document.getElementById('slide-content').innerHTML = contenidoHtml;

        // Consultar Pixabay usando el módulo recursos.js
        if (slide.busquedaImagen) {
            let urlImagen = await buscarImagenPixabay(slide.busquedaImagen);
            const contenedorImg = document.getElementById('imagen-slide-container');
            if (urlImagen && contenedorImg) {
                contenedorImg.innerHTML = `<img src="${urlImagen}" alt="Pixabay visual" style="max-width: 100%; max-height: 220px; border-radius: 6px; box-shadow: 0 3px 8px rgba(0,0,0,0.15); object-fit: cover;">`;
            } else if (contenedorImg) {
                contenedorImg.innerHTML = `<p style="color: #888; font-size: 13px;">Ilustración no disponible.</p>`;
            }
        }

        // Renderizar recursos extra si estamos en la última diapositiva
        if (slideActual === diapositivas.length - 1 && datosPresentacion.recursos) {
            renderizarRecursosExtra('recursos-slide-container', datosPresentacion.recursos);
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
