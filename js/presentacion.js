let datosPresentacion = null;
let slideActual = 0;

async function cargarPresentacion() {
    try {
        let respuesta = await fetch('datos/semana-06.json');
        datosPresentacion = await respuesta.json();
        
        document.getElementById('info-institucion').innerText = datosPresentacion.curso.institucion;
        document.getElementById('info-asignatura').innerText = datosPresentacion.curso.asignatura;
        document.getElementById('info-tema').innerText = `Semana ${datosPresentacion.curso.semana}: ${datosPresentacion.curso.tema}`;

        mostrarSlide();
    } catch (error) {
        console.error("Error al cargar la presentación:", error);
        document.getElementById('slide-content').innerText = "Error al cargar los contenidos de la semana.";
    }
}

function mostrarSlide() {
    if (!datosPresentacion) return;
    let diapositivas = datosPresentacion.diapositivas;
    
    if (slideActual < diapositivas.length) {
        let slide = diapositivas[slideActual];
        document.getElementById('slide-title').innerText = slide.titulo;
        document.getElementById('slide-content').innerHTML = `<p>${slide.contenido}</p>`;
    } else {
        // Pantalla de Actividades Interactivas al finalizar las diapositivas
        document.getElementById('slide-title').innerText = "🧩 Actividades Formativas Interactivas";
        document.getElementById('slide-content').innerHTML = `<div id="contenedor-sopa"></div>`;
        
        // Llamar a la función del archivo actividades.js
        if (datosPresentacion.actividades && datosPresentacion.actividades.sopaLetras) {
            generarSopaDeLetras('contenedor-sopa', datosPresentacion.actividades.sopaLetras.palabras);
        }
    }

    // El total de páginas incluye las diapositivas + 1 pantalla final de actividades
    let totalPasos = diapositivas.length + 1;
    document.getElementById('indicador-paginas').innerText = `${slideActual + 1} / ${totalPasos}`;
}

function cambiarSlide(direccion) {
    let totalPasos = datosPresentacion.diapositivas.length + 1;
    slideActual += direccion;
    
    if (slideActual < 0) slideActual = 0;
    if (slideActual >= totalPasos) slideActual = totalPasos - 1;
    
    mostrarSlide();
}

window.onload = cargarPresentacion;
