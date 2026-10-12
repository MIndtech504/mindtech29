// Módulo de Recursos Multimedia (Pixabay, YouTube y Enlaces Externos)
const PIXABAY_API_KEY = '57992963-078d0cac902fe8d17abb6865d';

async function buscarImagenPixabay(terminoBusqueda) {
    try {
        const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(terminoBusqueda)}&image_type=photo&lang=es&per_page=3`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.hits && data.hits.length > 0) {
            return data.hits[0].largeImageURL;
        }
        return null;
    } catch (error) {
        console.error("Error al consultar la API de Pixabay desde recursos.js:", error);
        return null;
    }
}

function renderizarRecursosExtra(contenedorId, recursosArray) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    if (!recursosArray || recursosArray.length === 0) {
        contenedor.innerHTML = "";
        return;
    }

    let html = `
        <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 6px; text-align: left;">
            <h4 style="color: #1e293b; margin-top: 0;">🔗 Recursos y Enlaces de Apoyo</h4>
            <ul style="margin: 0; padding-left: 20px;">
    `;

    recursosArray.forEach(rec => {
        html += `<li style="margin-bottom: 5px;"><a href="${rec.url}" target="_blank" style="color: #2563eb; text-decoration: none;">${rec.titulo}</a></li>`;
    });

    html += `</ul></div>`;
    contenedor.innerHTML = html;
}
