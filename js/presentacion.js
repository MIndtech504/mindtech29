let datosPresentacion = null;
let slideActual = 0;

async function cargarPresentacion() {
    try {
        // Carga el archivo JSON correspondiente a la semana
        let respuesta = await fetch('datos/semana-06.json');
        datosPresentacion = await respuesta.json();
        
        // Actualizar cabecera con la información del curso
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
        document.getElementById('slide-title').innerText = "Reflexión Final";
        document.getElementById('slide-content').innerHTML = `<p>Has completado el contenido teórico de la semana.</p>`;
    }

    document.getElementById('indicador-paginas').innerText = `${slideActual + 1} / ${diapositivas.length}`;
}

function cambiarSlide(direccion) {
    let totalSlides = datosPresentacion.diapositivas.length;
    slideActual += direccion;
    
    if (slideActual < 0) slideActual = 0;
    if (slideActual >= totalSlides) slideActual = totalSlides - 1;
    
    mostrarSlide();
}

window.onload = cargarPresentacion;
