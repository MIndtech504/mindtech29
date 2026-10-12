// Módulo de Exportación e Impresión de Unidades Didácticas
function configurarBotonExportacion(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    const btnExportar = document.createElement('button');
    btnExportar.innerText = "🖨️ Imprimir / Guardar como PDF";
    btnExportar.style.cssText = `
        background-color: #8e44ad;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        margin-left: 10px;
    `;
    btnExportar.onclick = () => {
        window.print();
    };

    contenedor.appendChild(btnExportar);
}
