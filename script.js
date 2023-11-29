document.getElementById('fichajeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const horaE = document.getElementById('horaE').value;
    const horaS = document.getElementById('horaS').value;
    let mensajeError = '';

    if (nombre.trim() === '') {
        mensajeError += 'El campo Nombre es obligatorio.\n';
    }
    if (fecha.trim() === '') {
        mensajeError += 'El campo Fecha es obligatorio.\n';
    }
    if (horaE.trim() === '') {
        mensajeError += 'El campo Hora de Entrada es obligatorio.\n';
    }
    if (horaS.trim() === '') {
        mensajeError += 'El campo Hora de Salida es obligatorio.\n';
    }

    if (mensajeError) {
        alert(mensajeError);
    } else {
        console.log(`Entrada registrada para ${nombre} el ${fecha} a las ${horaE}`);
        console.log(`Salida registrada para ${nombre} el ${fecha} a las ${horaS}`);
        document.getElementById('resultadosEntrada').innerText = `Entrada registrada para ${nombre} el ${fecha}, a las ${horaE}`;
        document.getElementById('resultadosSalida').innerText = `Salida registrada para ${nombre} el ${fecha} a las ${horaS}`;
    }
});


document.getElementById('nombre').addEventListener('blur', function(event) {
    const inputNombre = event.target;
    const errorMensaje = document.getElementById('errorNombre');

    if (inputNombre.value.trim() === '') {
        inputNombre.classList.add('border-2', 'border-rose-600');
        errorMensaje.classList.remove('hidden');
    } else {
        inputNombre.classList.remove('border-2', 'border-rose-600');
        errorMensaje.classList.add('hidden');
    }
});