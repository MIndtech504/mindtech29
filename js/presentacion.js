// Módulo Principal del Visor de Presentaciones - UCRISH

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
                <h2 style="color: #1e293b; font-size: 26px; margin-bottom: 10px;">📝 Actividad: Test de Opción Múltiple</h2>
                <p style="color: #64748b; margin-bottom: 20px;">Responde correctamente a las preguntas de evaluación.</p>
                <div id="contenedor-test"></div>
            </div>
        `;
        const preguntasTest = (datosPresentacion.actividades && datosPresentacion.actividades.test && datosPresentacion.actividades.test.preguntas) ? 
            datosPresentacion.actividades.test.preguntas : 
            [
                {
                    "pregunta": "¿Cuál es el enfoque principal del tema tratado?",
                    "opciones": ["Concepto central de la unidad", "Ideas secundarias", "Datos irrelevantes", "Ninguna"],
                    "correcta": 0,
                    "retroalimentacion": "¡Exacto! Ese es el núcleo de la lección."
                }
            ];

        if (typeof generarTestAutoevaluable === "function") {
            generarTestAutoevaluable('contenedor-test', preguntasTest);
        }

    } else if (slideActual === diapositivas.length + 1) {
        viewer.innerHTML = `
            <div style="text-align: center; max-width: 700px; margin: 0 auto;">
                <h2 style="color: #1e293b; font-size: 26px; margin-bottom: 10px;">🎯 Actividad: Seleccionar Opciones</h2>
                <p style="color: #64748b; margin-bottom: 20px;">Marca todas las afirmaciones correctas.</p>
                <div id="contenedor-seleccion"></div>
            </div>
        `;
        if (typeof generarSeleccionOpciones === "function") {
            generarSeleccionOpciones('contenedor-seleccion', {
                "enunciado": "Selecciona las características principales estudiadas en esta unidad:",
                "opciones": [
                    { "texto": "Análisis conceptual profundo", "esCorrecta": true },
                    { "texto": "Información completamente desvinculada", "esCorrecta": false },
                    { "texto": "Aplicación práctica en el aula", "esCorrecta": true },
                    { "texto": "Memorización sin comprensión", "esCorrecta": false }
                ]
            });
        }

    } else {
        viewer.innerHTML = `
            <div style="text-align: center; max-width: 700px; margin: 0 auto;">
                <h2 style="color: #1e293b; font-size: 26px; margin-bottom: 10px;">🧩 Actividad: Arrastrar y Soltar</h2>
                <p style="color: #64748b; margin-bottom: 20px;">Relaciona cada concepto con su definición correcta.</p>
                <div id="contenedor-drag"></div>
            </div>
        `;
        if (typeof generarArrastrarSoltar === "function") {
            generarArrastrarSoltar('contenedor-drag', {
                "pares": [
                    { "concepto": "Teoría", "definicion": "Conjunto de reglas y principios sobre una materia." },
                    { "concepto": "Práctica", "definicion": "Ejecución de los conocimientos teóricos adquiridos." }
                ]
            });
        }
    }

    let totalPasos = diapositivas.length + 3;
    document.getElementById('indicador-paginas').innerText = `Diapositiva ${slideActual + 1} de ${totalPasos}`;
}

function cambiarSlide(direccion) {
    let totalPasos = (datosPresentacion.diapositivas ? datosPresentacion.diapositivas.length : 0) + 3;
    slideActual += direccion;
    
    if (slideActual < 0) slideActual = 0;
    if (slideActual >= totalPasos) slideActual = totalPasos - 1;
    
    mostrarSlide();
}

window.onload = cargarPresentacion;
