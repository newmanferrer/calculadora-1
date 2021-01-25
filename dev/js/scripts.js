/* LOCALIZACIÓN DE LOS ELEMENTOS NECESARIOS
=================================================================================================================== */
const screenOperation = document.getElementById('screen-operation');
const screenResult = document.getElementById('screen-result');
const buttons = document.getElementById('buttons');
/* ================================================================================================================ */

/* VARIABLES UTILIZADAS
=================================================================================================================== */
let operationComplete = false; // Variable para saber si hemos terminado la operacion o no
/* ================================================================================================================ */

/* EVENTO DE ESCUCHA AL OPRIMIR BOTONES DE LA CALCULADORA
=================================================================================================================== */
buttons.addEventListener('click', (e) => {
  if(e.target.textContent !== ''){
    switch(e.target.textContent){
      case '=': writeResult(); break;
      case 'C': resetScreen(); break;
      case '+/-': changeSign(); break;
      case ',': writeOperation('.'); break;
      default: writeOperation(e.target.textContent); break;
    }
  }
})
/* ================================================================================================================ */

/* FUNCIÓN QUE DEVUELVE EL ÚLTIMO CARACTER O VALOR INTRODUCIDO
=================================================================================================================== */
const lastValue = () => screenOperation.textContent.substring(screenOperation.textContent.length-1);
/* ================================================================================================================ */

/* FUNCIÓN PARA ESCRITURA DE OPERACIONES
=================================================================================================================== */
const writeOperation = text => {
  if(screenOperation.textContent == '0' && text !== '.') screenOperation.textContent = '';

  if(operationComplete && isNaN(text)){
    screenOperation.textContent = screenResult.textContent;
    operationComplete = false;
  }

  if(operationComplete && !isNaN(text)){
    screenOperation.textContent = '';
    screenResult.textContent = '0';
    operationComplete = false;
  }

  if(isNaN(lastValue()) && isNaN(text)){
    screenOperation.textContent = screenOperation.textContent.substring(0,screenOperation.textContent.length-1);
  }else if(screenOperation.textContent.length <24){
    screenOperation.textContent += text;
  }
}
/* ================================================================================================================ */

/* FUNCIÓN PARA CALCULAR Y ESCRIBIR EL RESULTADO EN LA CALCULADORA
=================================================================================================================== */
const writeResult = () => {
  if(isNaN(lastValue()) && lastValue() !== ')') screenOperation.textContent = screenOperation.textContent.substring(0,
                         screenOperation.textContent.length-1); 
  screenResult.textContent = eval(screenOperation.textContent);
  operationComplete = true;

  if(screenResult.textContent.length > 9){
    screenResult.style.marginTop = '1em';
    screenResult.style.fontSize = '2em';
  }
}
/* ================================================================================================================ */

/* FUNCIÓN PARA CAMBIAR EL SIGNO DEL NÚMERO EN LA CALCULADORA
=================================================================================================================== */
const changeSign = () => {
  let lastNumber = '';
  let position = 0;

  if(!isNaN(lastValue())){
    for(let i = screenOperation.textContent.length-1; i>0; i--){
      if(isNaN(screenOperation.textContent[i])){
        position = i+1;
        break;
      }
    }
  }
  lastNumber = screenOperation.textContent.substring(position);
  screenOperation.textContent = screenOperation.textContent.replace(lastNumber,`(${((lastNumber) * (-1))})`);
}
/* ================================================================================================================ */

/* FUNCIÓN PARA COLOCAR EN CERO LA CALCULADORA
=================================================================================================================== */
const resetScreen = () => {
  screenOperation.textContent = '0';
  screenResult.textContent = '0';
}
/* ================================================================================================================ */
