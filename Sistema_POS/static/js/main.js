// --- LÓGICA DEL RELOJ Y FECHA ---
function iniciarReloj() {
    function actualizar() {
        const ahora = new Date();

        // 1. Formatear la Fecha (DD/MM/AA)
        const dia = String(ahora.getDate()).padStart(2, '0');
        const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Enero es 0
        const anio = String(ahora.getFullYear()).slice(-2); // Tomamos solo los últimos 2 dígitos

        // 2. Formatear la Hora (24h)
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        const segundos = String(ahora.getSeconds()).padStart(2, '0');

        // 3. Unir todo
        const textoFecha = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos} hrs`;

        // 4. Ponerlo en el HTML
        const elementoReloj = document.getElementById('reloj');
        if (elementoReloj) {
            elementoReloj.innerText = textoFecha;
        }
    }

    // Actualizar cada segundo (1000 milisegundos)
    setInterval(actualizar, 1000);
    actualizar(); // Ejecutar una vez al inicio para no esperar 1 segundo
}

// Arrancar el reloj cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    iniciarReloj();
    // Poner el cursor en la caja de texto automáticamente
    const input = document.getElementById('input-codigo');
    if(input) input.focus();
});


// --- LÓGICA DEL PUNTO DE VENTA ---

let carrito = [];

// Escuchar el "Enter" en la caja de texto
const inputCodigo = document.getElementById('input-codigo');
if (inputCodigo) {
    inputCodigo.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let codigo = this.value;
            this.value = ''; // Limpiar caja
            buscarEnPython(codigo);
        }
    });
}

function buscarEnPython(codigo) {
    fetch('/buscar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({codigo: codigo})
    })
    .then(response => response.json())
    .then(data => {
        if (data.encontrado) {
            agregarAlaTabla(data);
        } else {
            alert("Producto no encontrado");
        }
    });
}

function agregarAlaTabla(producto) {
    carrito.push(producto);
    
    let tabla = document.getElementById('cuerpo-tabla');
    let fila = document.createElement('tr');
    
    fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>1</td>
        <td>$${producto.precio}</td>
        <td><button class="btn-borrar-tabla" onclick="borrar(this)">X</button></td>
    `;
    
    tabla.appendChild(fila);
    actualizarTotal();
}

function borrar(boton) {
    let fila = boton.parentElement.parentElement;
    let cuerpoTabla = document.getElementById('cuerpo-tabla');
    let todasLasFilas = Array.from(cuerpoTabla.children);
    let index = todasLasFilas.indexOf(fila);
    
    if (index > -1) {
        carrito.splice(index, 1);
    }
    
    fila.remove();
    actualizarTotal();
}

function actualizarTotal() {
    let total = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById('gran-total').innerText = total.toFixed(2);
}

function finalizarVenta() {
    if(carrito.length === 0) return;
    
    let total = document.getElementById('gran-total').innerText;
    
    fetch('/cobrar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({total: total, productos: carrito})
    })
    .then(() => {
        alert("Venta guardada exitosamente!");
        carrito = [];
        document.getElementById('cuerpo-tabla').innerHTML = '';
        actualizarTotal();
        document.getElementById('input-codigo').focus();
    });
}