// Módulo de Actividades Interactivas - UCRISH

// 1. Generar Test de Selección Única
function generarTestAutoevaluable(contenedorId, preguntas) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    let html = `<div style="text-align: left; max-width: 650px; margin: 0 auto; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">`;
    
    preguntas.forEach((q, index) => {
        html += `<div style="margin-bottom: 20px;">`;
        html += `<p style="font-weight: bold; color: #1e293b; font-size: 16px;">${index + 1}. ${q.pregunta}</p>`;
        
        q.opciones.forEach((opcion, i) => {
            html += `<label style="display: block; margin-bottom: 8px; cursor: pointer; padding: 8px 12px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">`;
            html += `<input type="radio" name="pregunta_${index}" value="${i}" style="margin-right: 10px;"> ${opcion}`;
            html += `</label>`;
        });
        html += `<div id="retro_${index}" style="margin-top: 5px; font-size: 14px; font-weight: 500;"></div>`;
        html += `</div>`;
    });

    html += `<button onclick="verificarTest()" style="background-color: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px;">Verificar Respuestas</button>`;
    html += `</div>`;

    contenedor.innerHTML = html;
    window._preguntasTestActuales = preguntas;
}

window.verificarTest = function() {
    const preguntas = window._preguntasTestActuales || [];
    preguntas.forEach((q, index) => {
        const seleccionada = document.querySelector(`input[name="pregunta_${index}"]:checked`);
        const retroDiv = document.getElementById(`retro_${index}`);
        
        if (!seleccionada) {
            retroDiv.innerHTML = `<span style="color: #d97706;">⚠️ Por favor selecciona una opción.</span>`;
            return;
        }

        const respuestaIdx = parseInt(seleccionada.value);
        if (respuestaIdx === q.correcta) {
            retroDiv.innerHTML = `<span style="color: #16a34a;">✅ ¡Correcto! ${q.retroalimentacion || ''}</span>`;
        } else {
            retroDiv.innerHTML = `<span style="color: #dc2626;">❌ Incorrecto. Inténtalo de nuevo.</span>`;
        }
    });
};

// 2. Generar Actividad de Seleccionar Opciones (Múltiples respuestas)
function generarSeleccionOpciones(contenedorId, datos) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    let html = `<div style="text-align: left; max-width: 650px; margin: 0 auto; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">`;
    html += `<p style="font-weight: bold; color: #1e293b; font-size: 16px; margin-bottom: 15px;">🔍 ${datos.enunciado || "Selecciona todas las opciones correctas:"}</p>`;

    datos.opciones.forEach((op, i) => {
        html += `<label style="display: block; margin-bottom: 10px; cursor: pointer; padding: 10px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">`;
        html += `<input type="checkbox" name="opcion_multiple" value="${i}" data-correcta="${op.esCorrecta}" style="margin-right: 10px;"> ${op.texto}`;
        html += `</label>`;
    });

    html += `<button onclick="verificarSeleccionMultiples()" style="background-color: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px;">Comprobar Selección</button>`;
    html += `<div id="retro_multiples" style="margin-top: 10px; font-weight: bold; font-size: 15px;"></div>`;
    html += `</div>`;

    contenedor.innerHTML = html;
}

window.verificarSeleccionMultiples = function() {
    const checkboxes = document.querySelectorAll('input[name="opcion_multiple"]');
    let todoCorrecto = true;

    checkboxes.forEach(cb => {
        const esCorrecta = cb.getAttribute('data-correcta') === 'true';
        if (cb.checked !== esCorrecta) {
            todoCorrecto = false;
        }
    });

    const retro = document.getElementById('retro_multiples');
    if (todoCorrecto) {
        retro.innerHTML = `<span style="color: #16a34a;">🎉 ¡Excelente! Has seleccionado exactamente las opciones correctas.</span>`;
    } else {
        retro.innerHTML = `<span style="color: #dc2626;">❌ Hay errores en tu selección. Revisa los conceptos e inténtalo de nuevo.</span>`;
    }
};

// 3. Generar Actividad de Arrastrar y Soltar (Drag and Drop Simplificado)
function generarArrastrarSoltar(contenedorId, datos) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    let html = `<div style="text-align: left; max-width: 650px; margin: 0 auto; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">`;
    html += `<p style="font-weight: bold; color: #1e293b; font-size: 16px; margin-bottom: 15px;">📌 Asocia cada concepto con su respectiva definición:</p>`;

    html += `<div style="display: flex; gap: 20px; flex-wrap: wrap;">`;
    
    // Lista de elementos para arrastrar
    html += `<div style="flex: 1; min-width: 200px;">`;
    html += `<h4 style="color: #64748b; margin-top: 0;">Conceptos:</h4>`;
    datos.pares.forEach((par, i) => {
        html += `<div draggable="true" ondragstart="event.dataTransfer.setData('text/plain', '${par.concepto}')" style="background: #e0f2fe; color: #0369a1; padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: grab; font-weight: bold; text-align: center;">${par.concepto}</div>`;
    });
    html += `</div>`;

    // Zonas de destino
    html += `<div style="flex: 1; min-width: 200px;">`;
    html += `<h4 style="color: #64748b; margin-top: 0;">Definiciones:</h4>`;
    datos.pares.forEach((par, i) => {
        html += `<div ondragover="event.preventDefault()" ondrop="droparElemento(event, '${par.concepto}')" style="background: #f8fafc; border: 2px dashed #cbd5e1; padding: 10px; margin-bottom: 8px; border-radius: 6px; min-height: 40px; font-size: 13px; color: #334155;" data-asociado="">`;
        html += `<b>Destino ${i+1}:</b> ${par.definicion}`;
        html += `</div>`;
    });
    html += `</div>`;

    html += `</div>`;
    html += `<div id="retro_drag" style="margin-top: 15px; font-weight: bold; font-size: 14px;"></div>`;
    html += `</div>`;

    contenedor.innerHTML = html;
}

window.droparElemento = function(event, conceptoCorrecto) {
    event.preventDefault();
    const conceptoArrastrado = event.dataTransfer.getData('text/plain');
    const zonaDestino = event.currentTarget;
    
    zonaDestino.style.background = '#dcfce7';
    zonaDestino.style.borderColor = '#16a34a';
    zonaDestino.innerHTML = `✅ <b>${conceptoArrastrado}</b> (Asociado correctamente)`;
    
    document.getElementById('retro_drag').innerHTML = `<span style="color: #16a34a;">¡Buen trabajo asociando los conceptos!</span>`;
};
