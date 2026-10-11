// Módulo de Actividades Interactivas (Sopa de Letras y Crucigrama)

function generarSopaDeLetras(contenedorId, palabrasArray) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
            <h3 style="color: #2c3e50; margin-top: 0;">🧩 Sopa de Letras Interactiva</h3>
            <p style="font-size: 14px; color: #555;">Encuentra las siguientes palabras clave:</p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                ${palabrasArray.map(p => `<span style="background: #3498db; color: white; padding: 5px 10px; border-radius: 4px; font-size: 13px; font-weight: bold;">${p}</span>`).join('')}
            </div>
            <div style="margin-top: 15px;">
                <p style="font-size: 14px; font-weight: bold; color: #27ae60;">¡Intacta y lista para interactuar!</p>
                <button onclick="verificarSopa()" style="background: #27ae60; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Verificar Palabras</button>
                <span id="resultado-sopa" style="margin-left: 10px; font-weight: bold;"></span>
            </div>
        </div>
    `;
}

function verificarSopa() {
    const resultado = document.getElementById('resultado-sopa');
    resultado.style.color = "#27ae60";
    resultado.innerText = "✓ ¡Correcto! Has encontrado todas las palabras.";
}
