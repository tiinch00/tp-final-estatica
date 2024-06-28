// Llamar a cargarCarrito cuando se cargue la pagina
document.addEventListener('DOMContentLoaded', cargarCarrito);
//llama a fecha
document.addEventListener('DOMContentLoaded', fecha);

 function fecha() {
    // Obtener la fecha actual
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // Establecer el valor por defecto del campo de fecha
    document.getElementById('fechaEnvio').value = today;
}


function confirmarEnvio() {
    if (validar()) {
        if (carritoConItem()) {
            if (confirm("¿Desea enviar el pedido?")) {

                // Vaciar el carrito
                carrito = [];
                actualizarCarrito();

                // Limpiar el formulario
                document.getElementById('form').reset();

                // Eliminar el carrito del sessionStorage
                sessionStorage.removeItem('carrito');
                // Obtener la fecha actual
                fecha();

                // Establecer el valor en el campo de fecha
                document.getElementById('fechaEnvio').value = today;
            

            alert("Pedido enviado con éxito");
        }
    } else {
        alert("El carrito debe tener al menos un item...");
    }
}
}
//function para comprobar si el carrito tiene ítems
function carritoConItem() {
    return carrito.length > 0;
}

let carrito = [];
let total = 0;

/**
 *  Añade un item al carrito al hacer clic en un boton
 * @param {button}
 */
function agregarAlCarrito(button) {
    //Obtiene el elemento padre del boton
    let item = button.parentElement;
    //damos nombre al atributo
    let precio = parseInt(item.getAttribute('data-precio'));
    //obtiene el contenido de ese h3
    let nombre = item.querySelector('h3').innerText;
    //añadimos el item al array carrito 
    carrito.push({ nombre, precio });
    //invocamos y actualizamos el session storage
    actualizarCarrito();
}
function actualizarCarrito() {
    // Obtener los elementos donde se mostraran los items del carrito y el total del precio
    let carritoItems = document.getElementById('carrito-items');
    let precioTotal = document.getElementById('total');

    // Limpiar el contenido actual del contenedor de ítems del carrito
    carritoItems.innerHTML = '';

    // Reiniciar el total a 0
    total = 0;

    // Iterar sobre cada ítem en el array carrito
    carrito.forEach((item, index) => {
        // Crear un nuevo elemento div para cada item en el carrito
        let div = document.createElement('div');
        // Añadir la clase carrito-item al div
        div.classList.add('carrito-item');
        
        // Establecer el contenido HTML del div con el nombre y precio del item y un boton para eliminarlo
        div.innerHTML = `
            <span>${item.nombre} - ${item.precio} USD</span>
            <button data-index="${index}">X</button>
        `;
        
        // Añadir un evento click al boton para eliminar el item del carrito
        div.querySelector('button').addEventListener('click', borrarItemCarrito);
        
        // Añadir el "div" al contenedor de ítems del carrito en el DOM
        carritoItems.appendChild(div);
        
        // Sumar el precio del ítem al total
        total += item.precio;
    });

    // Actualizar el contenido del elemento que muestra el total del precio
    precioTotal.textContent = total;

    // Guardar el estado actualizado del carrito en el sessionStorage para persistencia
    sessionStorage.setItem('carrito', JSON.stringify(carrito));//convierte un objeto de JavaScript en una cadena JSON
}



// Función para cargar el carrito desde sessionStorage
function cargarCarrito() {
    // Obtener el carrito guardado desde sessionStorage
    let carritoGuardado = sessionStorage.getItem('carrito');
    if (carritoGuardado) {
        // Convertir el JSON del carrito guardado en un objeto de JavaScript
        carrito = JSON.parse(carritoGuardado);
        // Actualizar el carrito
        actualizarCarrito();
    }
}


function borrarItemCarrito(evento) {
    // Obtener el índice del ítem a eliminar
    let index = evento.target.getAttribute('data-index');
    // Eliminar el ítem del carrito en la posición indicada
    carrito.splice(index, 1);
    actualizarCarrito();
}


function borrar() {
    // Eliminar el carrito del sessionStorage
    sessionStorage.removeItem('carrito');
    // Recargar la página
    location.reload();
}




function darError(id) {
    let element = document.getElementById(id); //llamamos al elemento por el id
    element.style.border = '2px solid red';    //bordeamos con rojo
    element.style.backgroundColor = '#f8d7da';  //cambio de color del fondo

}



function esNumerico(valor) {
    return /^\d+$/.test(valor);  // expresion regular* 
}
/**Verificamos que el valor dentro del id sea tipo string 
* @param string id
* @return boolean
*/
function esString(id) {

    let esString = false;

    let element = document.getElementById(id).value;

    // Verificar si la entrada es una cadena de al menos 2 letras
    if (/^[a-zA-Z]{2,}$/.test(element)) {  //testeo de expresion regular
        esString = true;
    }
    return esString;
}

function validarEmail(email) {

    let expresion = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;  // expresion regular*
    return expresion.test(email);  // .test corrobora que este bien

}
function todoOK(id) {
    let element = document.getElementById(id);
    element.style.border = '2px solid green';

}

function validar() {
    esValido = true;

    let nombre = document.getElementById('nombre').value.trim(); //.value trae el valor y .trim sin espacios en blanco
    let apellido = document.getElementById('apellido').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefono = document.getElementById('telefono').value.trim();



    // Validacion 
    if (!nombre) {
        darError('nombre');
        esValido = false;
    } else if (!esString('nombre')) {
        darError('nombre');
        esValido = false;
    }
    else {
        todoOK('nombre');


    }
    if (!apellido) {
        darError('apellido');
        esValido = false;
    } else if (!esString('apellido')) {
        darError('apellido');
        esValido = false;
    } else {
        todoOK('apellido');


    }
    if (!telefono) {
        darError('telefono');
        esValido = false;

    } else if (!esNumerico(telefono)) {
        darError('telefono');
        esValido = false;
    } else {
        todoOK('telefono');
    }
    if (!email) {
        darError('email');
        esValido = false;
    } else if (!validarEmail(email)) {
        darError('email');
        esValido = false;
    } else {
        todoOK('email');

    }

    return esValido;
}

