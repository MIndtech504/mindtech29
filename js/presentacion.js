// Visor de Presentaciones Estilo Gamma - UCRISH

let datosPresentacionLocal = {
    "curso": {
        "institucion": "UCRISH",
        "asignatura": "Educación con Valores",
        "grado": "9.º Grado",
        "semana": 3,
        "tema": "Comunicación Oral y Roles del Comunicador"
    },
    "diapositivas": [
        {
            "titulo": "Semana 3: Comunicación Oral",
            "contenido": "Exploración de los capítulos fundamentales sobre la efectividad verbal, no verbal y la interacción interpersonal en contextos académicos y profesionales.",
            "busquedaImagen": "university education professional presentation"
        },
        {
            "titulo": "Funciones del Comunicador",
            "contenido": "Zacharis y Coleman identifican funciones esenciales derivadas de la naturaleza social de la comunicación humana, abarcando dimensiones lingüísticas, simbólicas y culturales.",
            "busquedaImagen": "business team communication meeting"
        }
    ],
    "actividades": {
        "sopaLetras": {
            "palabras": ["COMUNICACION", "ORAL", "MENSAJE", "EMISOR", "RECEPTOR"]
        },
        "test": {
            "preguntas": [
                {
                    "pregunta": "¿Qué porcentaje aproximado del impacto comunicativo representan los elementos visuales y vocales según Mehrabian?",
                    "opciones": ["93%", "50%", "10%", "100%"],
                    "correcta": 0,
                    "retroalimentacion": "¡Correcto! Los elementos visuales y vocales suman el 93% de la efectividad inicial."
                }
            ]
        }
    }
};

// Cargar desde localStorage si el docente personalizó la lección
const datosGuardados = localStorage.getItem('ucrish_presentacion_activa');
if (datosGuardados) {
    try {
        datosPresentacionLocal = JSON.parse(datosGuardados);
    } catch (e) {
        console.error("Error al cargar localStorage:", e);
    }
}

let datosPresentacion = datosPresentacionLocal;
let slideActual = 0;

function alternarPantallaCompleta() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) elem.requestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}

function cargarPresentacion() {
    const curso = datosPresentacion.curso || {};
    document.getElementById('info-institucion').innerText = `${curso.institucion || 'UCRISH'} • ${curso.asignatura || ''}`;
    document.getElementById('info-tema').innerText = `Semana ${curso.semana || 1}: ${curso.tema || ''}`;
    mostrarSlide();
}

async function mostrarSlide() {
    let diapositivas = datosPresentacion.diapositivas || [];
    const viewer = document.getElementById('slide-viewer');

    if (slideActual < diapositivas.length) {
        let slide = diapositivas[slideActual];
        
        viewer.innerHTML = `
            <div class="gamma-slide-layout">
                <div class="gamma-text-panel">
                    <span style="font-size: 12px; font-weight: 700; color: #2563eb; text-transform: uppercase; letter-spacing: 1px;">Unidad Didáctica UCRISH</span>
                    <h2 id="slide-title">${slide.titulo}</h2>
                    <p id="slide-content-text">${slide.contenido}</p>
                    <div class="gamma-card-feature">
                        💡 <b>Concepto clave:</b> Integración de competencias analíticas y prácticas para el desarrollo académico.
                    </div>
                </div>
                <div class="gamma-image-panel" id="imagen-slide-container">
                    <span style="color: #64748b; font-size: 13px;">Cargando recurso visual...</span>
                </div>
            </div>
        `;

        if (slide.busquedaImagen && typeof buscarImagenPixabay === "function") {
            let urlImagen = await buscarImagenPixabay(slide.busquedaImagen);
            const contenedorImg = document.getElementById('imagen-slide-container');
            if (urlImagen && contenedorImg) {
                contenedorImg.innerHTML = `<img src="${urlImagen}" alt="Ilustración Gamma">`;
            } else if (contenedorImg) {
                contenedorImg.innerHTML = `<span style="color: #94a3b8; font-size: 13px;">Imagen de apoyo no disponible</span>`;
            }
        }

    } else if (slideActual === diapositivas.length) {
        viewer.innerHTML = `
            <div style="text-align: center; max-width: 700px; margin: 0 auto;">
                <h2 style="color: #1e293b; font-size: 28px; margin-bottom: 10px;">🧩 Actividad Interactiva: Sopa de Letras</h2>
                <p style="color: #64748b; margin-bottom: 20px;">Encuentra los términos clave asociados a la unidad de estudio.</p>
                <div id="contenedor-sopa"></div>
            </div>
        `;
        if (datosPresentacion.actividades && datosPresentacion.actividades.sopaLetras && typeof generarSopaDeLetras === "function") {
            generarSopaDeLetras('contenedor-sopa', datosPresentacion.actividades.sopaLetras.palabras);
        }
    } else {
        viewer.innerHTML = `
            <div style="text-align: center; max-width: 700px; margin: 0 auto;">
                <h2 style="color: #1e293b; font-size: 28px; margin-bottom: 10px;">📝 Autoevaluación de Conocimientos</h2>
                <p style="color: #64748b; margin-bottom: 20px;">Pon a prueba tu comprensión sobre los temas abordados.</p>
                <div id="contenedor-test"></div>
            </div>
        `;
        if (datosPresentacion.actividades && datosPresentacion.actividades.test && typeof generarTestAutoevaluable === "function") {
            generarTestAutoevaluable('contenedor-test', datosPresentacion.actividades.test.preguntas);
        }
    }

    let totalPasos = diapositivas.length + 2;
    document.getElementById('indicador-paginas').innerText = `Diapositiva ${slideActual + 1} de ${totalPasos}`;
}

function cambiarSlide(direccion) {
    let totalPasos = (datosPresentacion.diapositivas ? datosPresentacion.diapositivas.length : 0) + 2;
    slideActual += direccion;
    
    if (slideActual < 0) slideActual = 0;
    if (slideActual >= totalPasos) slideActual = totalPasos - 1;
    
    mostrarSlide();
}

window.onload = cargarPresentacion;
