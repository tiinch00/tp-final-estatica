document.addEventListener('DOMContentLoaded', function() {
    // Captura el formulario por su ID
    var form = document.getElementById('miFormulario');

    // Agrega un controlador de eventos para el evento 'submit'
    form.addEventListener('submit', function(event) {
      // Evita que el formulario se envíe
      if (!validar()){
      event.preventDefault();
      }
    });
  });

/**Da un mensaje de error en rojo
 * @param string id, mensaje
 */
function darError(id) {
    let element = document.getElementById(id); //llamamos al elemento por el id
    element.style.border = '2px solid red';    //bordeamos con rojo
    element.style.backgroundColor = '#f8d7da';  //cambio de color del fondo
    
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

/**funcion que bordea en verde si cumple con el requisito
 * @param string id;
 */
function todoOK(id){
    let element = document.getElementById(id);
    element.style.border = '2px solid green';
    
}

/**Funcion que corrobora si el valor ingresado es numerico
 * @param int valor
 */
function esNumerico(valor) {
    return /^\d+$/.test(valor);  // expresion regular* 
}
// otra forma de validar si es numerico
/**function esNumerico(valor) {                          
    return !isNaN(parseFloat(valor)) && isFinite(valor);
}*/

/** valida el mail usando expresiones regulares
 * @param string email;
 */
function validarEmail(email){

    let expresion = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;  // expresion regular*
    return expresion.test(email);  // .test corrobora que este bien

}

//*expresion regular (incioCadena)/^ minusculas,mayusculas,numeros ._%+- @ minusculas,mayusculas,numeros .- \.  minusculas,mayusculas 2(al menos 2 caracteres) $ (finCadena)


//FUNCION MAIN

/**Valida cada una las variables devuele true o false
 *@return boolean 
*/
function validar(){
    esValido= true;

    let nombre = document.getElementById('nombre').value.trim(); //.value trae el valor y .trim sin espacios en blanco
    let apellido = document.getElementById('apellido').value.trim();
    let email = document.getElementById('email').value.trim(); 
    let mensaje = document.getElementById('mensaje').value.trim();
  

    // Validacion 
    if (!nombre) {
        darError('nombre');
        esValido = false;
    }else if(!esString('nombre')){
        darError('nombre');
        esValido = false;
    }
    else {
        todoOK('nombre');
        
    }
    if (!apellido) {
        darError('apellido');
        esValido = false;
    }else if(!esString('apellido')){
        darError('apellido');
        esValido = false;
    }else {
        todoOK('apellido');
        
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
    if (!mensaje){
        darError('mensaje');
        esValido = false;

    }else {
        todoOK('mensaje');
    }
    
    return esValido;
}


