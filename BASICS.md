## Ejemplo práctico 1 (Debug JS)

Vamos a crear un proyecto básico, que incluye un fichero js, un html y un css.

Este sería el **index.hmtl**

```html
<!DOCTYPE html>

<html lang="es">
  <head>
    <meta charset="UTF-8" />

    <title>Lista de Tareas</title>

    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div id="app">
      <input type="text" id="newTask" placeholder="Nueva tarea..." />

      <button id="addTask">Añadir Tarea</button>

      <ul id="taskList"></ul>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```
Éste es el fichero JavaScript, que incluye un error para practicar ell debug (**script.js**)

```js
document.getElementById('addTask').addEventListener('click', function() {
    var newTask = document.getElementById('newTask').value;
    if (newTask) {
        addTask(newTask);
        document.getElementById('newTask').value = '';
    } else {
        console.warn("La tarea no puede estar vacía");
    }
});

function addTask(task) {
    var li = document.createElement('li');
    li.textContent = task;
    // Se utiliza 'tasklist' en lugar de 'taskList'
    document.getElementById('tasklist').appendChild(li); 
}
```
Y el css, **styles.css**:

```css
#app {
    background-color: #f7f7f7;
    padding: 20px;
    width: 300px;
    margin: auto;
}

#taskList li {
    margin: 5px 0;
    list-style-type: none;
    background-color: #e2e2e2;
    padding: 10px;
    border-radius: 4px;
}
```

## Instrucciones para Depuración con Chrome DevTools
### Inspeccionar Elementos:

Abre tu navegador Chrome y carga el archivo index.html.
Abre Chrome DevTools (F12 o Ctrl+Shift+I).
Ve a la pestaña "Elements".
Pasa el cursor sobre diferentes partes del código HTML para ver cómo se resaltan en la página.
Intenta cambiar el color de fondo o el estilo de los elementos li directamente en DevTools.
Console API y Depuración:

Ve a la pestaña "Console" en DevTools.
Intenta añadir una tarea nueva usando la interfaz de usuario.
Observa los mensajes en la consola. Deberías ver un mensaje de error indicando que no se puede encontrar un elemento con el ID 'tasklist'.
Corrige el error en el archivo script.js cambiando 'tasklist' por 'taskList'.
Recarga la página y verifica que el error se haya corregido.


## Ejemplo práctico 2 (Debug CSS)

Vamos a seguir trabajando ahora esta vez enfoncados en el css. La estructura va a ser la misma: index.html, styles.css y script.js Vamos a añadir una nueva clase una nueva clase al final del css anterior, que se aplicará sobre los nuevos ítems del ToDo List si éste incluye la palabra "importante".
 
 Añade esta clase en el css anterior:

 ```css
 .highlight {
  background-color: #ff0; 
  border-left: 5px solid #f00;
}
 ```

 El html sería el mismo que antes

Y éste es el nuevo js:

 ```js
function addTask(task, isHighlighted) {
  var li = document.createElement('li');
  li.textContent = task;
  if (isHighlighted) {
    li.classList.add('highlight');
  }
  document.getElementById('taskList').appendChild(li); 
}

document.getElementById('addTask').addEventListener('click', function() {
    var taskValue = document.getElementById('newTask').value;

          
    var shouldHighlight = taskValue.toLowerCase().includes('importante');                        
    addTask(taskValue, shouldHighlight);

    document.getElementById('newTask').value = '';
});
 ```

 Llamando a addTask con el Nuevo Parámetro
Cuando quieras añadir una tarea que esté resaltada, puedes llamar a addTask con el segundo parámetro establecido en true. Por ejemplo:

```javascript
addTask('Tarea Normal', false);
addTask('Tarea Importante', true); // Esta tarea tendrá la clase 'highlight'
```

En este ejemplo, addTask ahora acepta un segundo argumento isHighlighted. Si isHighlighted es true, la clase highlight se añade al li. Esto permite controlar de manera flexible qué tareas se resaltan cuando se añaden a la lista.

Asegúrate también de que el ID del elemento ul en tu HTML sea taskList para que coincida exactamente con el ID utilizado en document.getElementById('taskList').

Entiendo, quieres simular un caso de sobrescritura de estilos en CSS y explicar por qué y cómo ocurre. En tu código, la clase `.highlight` está diseñada para ser aplicada a los elementos `li` dentro de `#taskList`. Sin embargo, los estilos definidos por `#taskList li` tienen prioridad sobre los de `.highlight` debido a las reglas de especificidad en CSS.

Tal como está ahora los estilos no se aplicarán, y la idea es usar las devtools del navegador para averiguar por qué.

### Explicación de la Sobrescritura de Estilos

1. **Especificidad en CSS:**
   - En CSS, la especificidad determina qué estilos se aplican cuando hay conflictos.
   - Los selectores de ID (como `#taskList`) tienen una especificidad mayor que los selectores de clase (como `.highlight`).
   - En nuestro caso, `#taskList li` tiene mayor especificidad que `.highlight` porque el primero incluye un selector de ID y un selector de tipo, mientras que el segundo solo es un selector de clase.

2. **Cómo Está Sucediento:**
   - Cuando ambos, `#taskList li` y `.highlight`, intentan aplicar estilos diferentes a las mismas propiedades (en este caso, `background-color` y `border-left`), los estilos definidos en `#taskList li` prevalecen debido a su mayor especificidad.
   - Incluso si `.highlight` se declara después de `#taskList li` en tu hoja de estilos, la especificidad más alta de `#taskList li` determina que sus estilos sean los que se apliquen.

   2. **Cómo Solucionarlo:**
   Para hacer que los estilos de la clase `.highlight` prevalezcan sobre los de `#taskList li`, tienes varias opciones. Estas opciones manipulan la especificidad de CSS para asegurar que `.highlight` tenga mayor prioridad:

**Utilizar un Selector más Específico:**
   Puedes combinar `.highlight` con otro selector para aumentar su especificidad:

   ```css
   #taskList li.highlight {
       background-color: #ff0; 
       border-left: 5px solid #f00;
   }
   ```
## Ejemplo práctico 3 (Debug Network)

Vamos a ver ahora un ejemplo de una pequeña app que va a llamar a una API externa para traer los datos que pintaremos en la pantalla. Esta vez solo vamos a crear en index.html y script.js

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Usuarios</title>
</head>
<body>
    <div id="app">
        <input type="text" id="searchBox" placeholder="Buscar usuarios...">
        <ul id="userList"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

Ahora vamos a añadir las llamadas a la API y la lógica de pintado y búsqueda en **script.js**

```js
async function fetchUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=50');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name.first} ${user.name.last}`;
        userList.appendChild(li);
    });
}

function filterUsers(users, searchTerm) {
    return users.filter(user => 
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

document.addEventListener('DOMContentLoaded', async () => {
    const users = await fetchUsers();
    displayUsers(users);

    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', () => {
        const filteredUsers = filterUsers(users, searchBox.value);
        displayUsers(filteredUsers);
    });
});

```

Ahora vamos a forzar un Error de Red cambiando la URL de la API a una incorrecta. Por ejemplo:

```javascript
const response = await fetch('https://randomuser.me/api/incorrect-url?results=50');
```

Para depurar el error:

Abre tu aplicación en Chrome y luego abre las Herramientas de Desarrollo (F12 o Ctrl+Shift+I).
Ve a la pestaña "Network".
Recarga la página y observa las solicitudes de red.
Busca la solicitud que falló (debería aparecer en rojo) y haz clic en ella para ver los detalles, como el estado de la respuesta y el mensaje de error, en este caso un 404 (Not Found)
