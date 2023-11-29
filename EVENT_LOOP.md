![Event Loop Navegador JS]('./assets/Javascript-event-loop.png')

No se puede llegar muy lejos en el mundo de FrontEnd sin tener claro qué es el Event Loop (aquí vamos a hablar de él centrándonos en su funcionamiento en el navegador, aunque también opera en Node, de manera muy parecida pero dada la naturaleza del entorno con algunas diferencias)

Vamos a empezar con un juego aparentemente trivial, una pregunta que de una manera u otra siempre termina cayendo en las entrevistas de trabajo cuando aplicas a una posición en la que se requiere conocimientos de JavaScript:

```js
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

async function fetchData() {
  console.log('Antes de await');
  const data = await Promise.resolve('4');
  console.log(data);
  
  localStorage.setItem('data', data);
  console.log('5');
}

setTimeout(() => {
  console.log('6');
}, 2000);

fetchData();

document.addEventListener('DOMContentLoaded', () => {
  console.log('7');
});

console.log('8')
```

## ¿WTF es el Event Loop?

El "Event Loop" (bucle de eventos) en JavaScript, especialmente en el contexto de un navegador, es un mecanismo que permite a JavaScript ejecutar código, recoger y procesar eventos, y ejecutar subtareas de forma asincrónica a pesar de su naturaleza de un solo hilo. Aquí hay una descripción detallada de sus componentes y funcionamiento:

1. **Un Solo Hilo**: JavaScript en un navegador se ejecuta en un solo hilo. Esto significa que solo puede hacer una cosa a la vez. A pesar de esta limitación, los navegadores pueden realizar tareas como la renderización de la página, las llamadas a la red y otras, fuera de este hilo principal.

2. **Pila de Ejecución (Call Stack)**: Cuando se invoca una función en JavaScript, se coloca en una pila de ejecución. Esta función se ejecuta de principio a fin antes de que la siguiente función en la pila comience a ejecutarse. Esto es conocido como modelo de ejecución "LIFO" (Last In, First Out).

3. **Cola de Eventos (Event Queue)**: Aquí es donde se almacenan los eventos que aún no han sido procesados. Por ejemplo, eventos de clic, respuestas de solicitudes AJAX, etc. Estos eventos esperan hasta que la pila de ejecución esté vacía para ser procesados.

4. **Event Loop (Bucle de Eventos)**: El Event Loop es un proceso que está en constante ejecución, comprobando si la pila de ejecución está vacía. Si lo está y hay eventos en la cola de eventos, traslada el primer evento de esta cola a la pila de ejecución. Este bucle permite a JavaScript realizar operaciones asincrónicas, como manejar eventos de usuario o ejecutar callbacks de operaciones asíncronas, incluso dentro de su entorno de un solo hilo.

5. **APIs del Navegador y Web APIs**: Estas son proporcionadas por el entorno del navegador y no forman parte del lenguaje JavaScript per se. Incluyen funciones como `setTimeout`, `XMLHttpRequest`, y los eventos del DOM. Estas APIs procesan su trabajo fuera del hilo principal de JavaScript, y una vez completado, ponen los callbacks asociados en la cola de eventos.

6. **Callback Queue**: Las tareas asincrónicas como eventos, `setTimeout`, o peticiones AJAX ponen sus callbacks en esta cola una vez que han completado su ejecución.

El Event Loop es crucial para entender cómo JavaScript maneja operaciones asincrónicas y multitarea, a pesar de su limitación de un solo hilo. Permite una interacción fluida y una experiencia de usuario reactiva en los navegadores, gestionando eficientemente tareas, eventos y ejecución de código.


Para explicar cómo funciona el event loop en JavaScript dentro del entorno de un navegador, podemos utilizar un ejemplo de código que involucre tanto llamadas de funciones síncronas, como asíncronas que incluyan eventos y llamadas a API del navegador (microtareas y macrotareas). Aquí hay un ejemplo que ilustra este concepto:

```js
console.log('Inicio');

// Llamada a Web API del navegador y macrotarea
setTimeout(() => {
  console.log('SetTimeout callback - macrotarea');
}, 0);

// Llamada a una microtarea
Promise.resolve().then(() => {
  console.log('Promise callback - microtarea');
});

// Función asíncrona con async/await
async function fetchData() {
  console.log('Antes de await');
  const data = await Promise.resolve('Datos obtenidos');
  console.log(data);
  
  // Usar localStorage como una operación síncrona
  localStorage.setItem('data', data);
  console.log('Dato guardado en localStorage');
}

fetchData();

// Evento del DOM y macrotarea
document.addEventListener('click', () => {
  console.log('Click event callback - macrotarea');
});

console.log('Fin');
```

En este código, se imprime 'Inicio' y 'Fin' como parte del flujo síncrono. La función `sincrona()` se ejecuta inmediatamente después de 'Inicio'. Luego, aunque `setTimeout` está configurado para 0 milisegundos, se trata como una macrotarea y se coloca en la cola de tareas para ejecutarse después de que el flujo síncrono y las microtareas se hayan completado. La promesa es una microtarea, por lo que se ejecuta inmediatamente después de que se completa el flujo síncrono y antes de cualquier macrotarea como `setTimeout`.

El uso de async y await permite que el código se lea de manera más sincrónica, pero sigue siendo asíncrono por detrás. En este ejemplo, fetchData es una función asíncrona que espera (await) la resolución de una promesa antes de continuar. Aunque el await detiene la ejecución dentro de la función fetchData, no bloquea el event loop, permitiendo que otras operaciones como eventos del DOM o macrotareas continúen siendo procesadas.

El localStorage.setItem es una operación síncrona que se ejecutará inmediatamente después de que la promesa dentro de fetchData se resuelva y se ejecute el console.log(data).

La salida de este código sería:

```
Inicio
Antes de await
Fin
Promise callback - microtarea
Datos obtenidos
Dato guardado en localStorage
SetTimeout callback - macrotarea
```

Este ejemplo muestra cómo el event loop maneja las distintas tareas. Primero, se ejecutan todas las operaciones síncronas. Luego, antes de pasar a las macrotareas, el event loop verifica si hay microtareas pendientes, como promesas resueltas, y las ejecuta. Finalmente, se ejecutan las macrotareas como `setTimeout`.



