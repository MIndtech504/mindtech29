// Controlador de Inteligencia Artificial y Recursos Visuales - UCRISH

export async function generarTextoConIA(promptTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                "Comprender los fundamentos teóricos y metodológicos de la unidad.\n" +
                "Desarrollar competencias analíticas aplicadas al entorno académico y profesional.\n" +
                "PALABRAS: APRENDIZAJE, CONCEPTO, ANALISIS, METODO, UNIDAD"
            );
        }, 800);
    });
}

// Función para consultar imágenes dinámicamente mediante la API de Pixabay
export async function buscarImagenDinamica(terminoBusqueda) {
    const PIXABAY_KEY = "43594822-777b3105a5a2283fa747864aa";
    try {
        const respuesta = await fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(terminoBusqueda)}&image_type=photo&per_page=3&safesearch=true`);
        const data = await respuesta.json();
        if (data && data.hits && data.hits.length > 0) {
            return data.hits[0].webformatURL;
        }
    } catch (e) {
        console.warn("Error al conectar con Pixabay, usando respaldo visual alternativo:", e);
    }
    
    // Respaldo visual por si la red o la API fallan temporalmente
    return `https://picsum.photos/seed/${encodeURIComponent(terminoBusqueda)}/600/400`;
}

// Compatibilidad con la función de imagen solicitada
export function generarImagenConIA(promptImagen) {
    return `https://picsum.photos/seed/${encodeURIComponent(promptImagen)}/600/400`;
}
