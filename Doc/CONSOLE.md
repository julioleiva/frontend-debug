## Console

La función `console` en JavaScript proporciona una variedad de métodos para realizar diferentes tipos de salida de registro y depuración en la consola de un navegador o entorno de ejecución. A continuación se enumeran algunos de los métodos más comunes, junto con ejemplos de cómo se utilizan:

1. **console.log()**
   - Descripción: Muestra un mensaje en la consola.
   - Ejemplo:
     ```javascript
     console.log('Hola, mundo!');
     ```

2. **console.info()**
   - Descripción: Similar a `console.log`, pero puede usarse para información informativa.
   - Ejemplo:
     ```javascript
     console.info('Información importante');
     ```

3. **console.warn()**
   - Descripción: Muestra un mensaje de advertencia en la consola.
   - Ejemplo:
     ```javascript
     console.warn('Advertencia: Falta un parámetro');
     ```

4. **console.error()**
   - Descripción: Muestra un mensaje de error en la consola.
   - Ejemplo:
     ```javascript
     console.error('Error: No se pudo cargar el archivo');
     ```

5. **console.debug()**
   - Descripción: Similar a `console.log`, pero se utiliza para mensajes de depuración.
   - Ejemplo:
     ```javascript
     console.debug('Depurando la función X');
     ```

6. **console.table()**
   - Descripción: Muestra datos tabulares como una tabla.
   - Ejemplo:
     ```javascript
     console.table([{ nombre: 'Alice', edad: 24 }, { nombre: 'Bob', edad: 27 }]);
     ```

7. **console.assert()**
   - Descripción: Escribe un error en la consola si la afirmación es falsa.
   - Ejemplo:
     ```javascript
     console.assert(1 === 2, 'La afirmación es falsa');
     ```

8. **console.clear()**
   - Descripción: Limpia la consola.
   - Ejemplo:
     ```javascript
     console.clear();
     ```

9. **console.count()**
   - Descripción: Registra el número de veces que se ha llamado esta función.
   - Ejemplo:
     ```javascript
     console.count('Veces ejecutado');
     ```

10. **console.countReset()**
    - Descripción: Restablece el contador de `console.count`.
    - Ejemplo:
      ```javascript
      console.countReset('Veces ejecutado');
      ```

11. **console.group()** / **console.groupEnd()**
    - Descripción: Crea un nuevo grupo en la consola, permitiendo organizar los mensajes en un bloque anidado.
    - Ejemplo:
      ```javascript
      console.group('Grupo de mensajes');
      console.log('Mensaje 1');
      console.log('Mensaje 2');
      console.groupEnd();
      ```
```js
function procesarDatos(data) {
  console.group('Procesamiento de datos');
  
  console.log('Datos originales:', data);
  
  console.group('Validación de datos');
  // Soponemos que aquí tenemos que hacer varias validaciones...
  console.log('Validación 1: OK');
  console.log('Validación 2: OK');
  // ... más validaciones
  console.groupEnd();

  console.group('Transformación de datos');
  // Y luego algunas transformaciones...
  const datosTransformados = data.map(item => item * 2);
  console.log('Datos transformados:', datosTransformados);
  console.groupEnd();
  
  console.group('Almacenamiento de datos');
  // Simulamos el almacenamiento de datos
  try {
    localStorage.setItem('datos', JSON.stringify(datosTransformados));
    console.log('Almacenamiento exitoso');
  } catch (error) {
    console.error('Error al almacenar los datos', error);
  }
  console.groupEnd();
  
  console.groupEnd();
}

// Llamamos a la función con un conjunto de datos de ejemplo
procesarDatos([1, 2, 3, 4, 5]);
```
12. **console.time()** / **console.timeEnd()**
    - Descripción: Inicia y detiene un temporizador, útil para medir la duración de una operación.
    - Ejemplo:
      ```javascript
      console.time('Timer');
      // Operaciones o código a medir
      console.timeEnd('Timer');
      ```

```js
function funcionCompleja() {
    let suma = 0;
    for (let i = 0; i < 1000000; i++) {
        suma += i;
    }
    console.log("La suma es: " + suma);
}

// Comienza a medir el tiempo
console.time("Tiempo de ejecución");

funcionCompleja();

// Finaliza la medición del tiempo
console.timeEnd("Tiempo de ejecución");
```
Optimizando rendimiento con la técnica de memoization:

```js
// Definición de una función compleja con caché
const cache = {};

function funcionComplejaConCache() {
    // Clave única para el caché, en este caso, usamos una clave estática
    const claveCache = 'resultado';

    // Verifica si el resultado ya está en caché
    if (cache[claveCache]) {
        console.log("Resultado obtenido del caché");
        return cache[claveCache];
    }

    let suma = 0;
    for (let i = 0; i < 1000000; i++) {
        suma += i;
    }

    // Guarda el resultado en caché para uso futuro
    cache[claveCache] = suma;
    console.log("Resultado calculado y almacenado en caché");
    return suma;
}

// Primera ejecución: calcula y guarda en caché
console.time("Tiempo de ejecución - Primera vez");
console.log("La suma es: " + funcionComplejaConCache());
console.timeEnd("Tiempo de ejecución - Primera vez");

// Segunda ejecución: obtiene el resultado del caché
console.time("Tiempo de ejecución - Segunda vez");
console.log("La suma es: " + funcionComplejaConCache());
console.timeEnd("Tiempo de ejecución - Segunda vez");
```

13. **console.dir()**
    - Descripción: Muestra una lista interactiva de las propiedades del objeto especificado.
    - Ejemplo:
      ```javascript
      console.dir(document.head);
      ```

15. **console.trace()**
    - Descripción: Muestra la traza de la pila en ese punto del código.
    - Ejemplo:

```js
function procesarDatos() {
    // Agregar console.trace para ver desde dónde se llamó a esta función
    console.trace('Rastro del stack');

    // ... resto del código de la función ...
}

function tareaA() {
    // ... algún código ...
    procesarDatos();
    // ... más código ...
}

function tareaB() {
    // ... algún código ...
    procesarDatos();
    // ... más código ...
}

// Llamadas a las funciones desde diferentes partes del código
tareaA();
tareaB();
```
      

Cada uno de estos métodos puede ser útil en diferentes situaciones, ya sea para la depuración de código, la monitorización del rendimiento o simplemente para proporcionar información durante el desarrollo.
