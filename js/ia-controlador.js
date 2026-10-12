// Controlador de Inteligencia Artificial para UCRISH (Modo Seguro)

export async function generarTextoConIA(promptTexto) {
    // Simulador inteligente local para evitar bloqueos de seguridad en GitHub y garantizar fluidez
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

export function generarImagenConIA(promptImagen) {
    return `https://source.unsplash.com/featured/?${encodeURIComponent(promptImagen)}`;
}
