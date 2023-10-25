// GESTIÓN DE ESTUDIANTES
var diccionarioEstudiantes = {};

// Comprobar si existen datos de estudiantes en el almacenamiento local
if (localStorage.getItem("estudiantes")) {
    diccionarioEstudiantes = JSON.parse(localStorage.getItem("estudiantes"));
    mostrarEstudiantes();
}

// Agregar estudiante
function agregar_estudiante() {
    var NumIdentificacion = document.getElementById("NumIdentificacion").value;
    var nombre = document.getElementById("nombre").value;
    var celular = document.getElementById("celular").value;
    var correo = document.getElementById("correo").value;
    var grupo = document.getElementById("grupo").value;
    var campcoins = 0;

    // Crear un objeto estudiante
    var estudiante = {
        NumIdentificacion: NumIdentificacion,
        nombre: nombre,
        celular: celular,
        correo: correo,
        grupo: grupo,
        campcoins: campcoins
    };

    // Agregar el estudiante al diccionario de estudiantes
    diccionarioEstudiantes[NumIdentificacion] = estudiante;
    // Guardar los datos actualizados en el Local Storage
    localStorage.setItem("estudiantes", JSON.stringify(diccionarioEstudiantes));
    limpiarCampos();
    mostrarEstudiantes();
}

// Función para mostrar un estudiante en la tabla
function mostrarEstudiantes() {
    var estudiantesLista = document.querySelector(".estudiantes-lista");
    estudiantesLista.innerHTML = "";

    for (var NumIdentificacion in diccionarioEstudiantes) {
        var estudiante = diccionarioEstudiantes[NumIdentificacion];
        var estudianteRow = document.createElement("tr");
        estudianteRow.innerHTML = `
            <td>${estudiante.NumIdentificacion}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.celular}</td>
            <td>${estudiante.correo}</td>
            <td>${estudiante.grupo}</td>
            <td>${estudiante.campcoins}</td>
            <td>
                <button onclick="editarEstudiante('${estudiante.NumIdentificacion}')">Editar</button>
                <button onclick="eliminarestudiante('${estudiante.NumIdentificacion}')">Eliminar</button>
            </td>
        `;
        estudiantesLista.appendChild(estudianteRow);
    }
}

function eliminarestudiante(NumIdentificacion) {
    if (confirm(`¿Estás seguro de que deseas eliminar al estudiante con identificación "${NumIdentificacion}"?`)) {
        delete diccionarioEstudiantes[NumIdentificacion];
        localStorage.setItem("estudiantes", JSON.stringify(diccionarioEstudiantes));
        limpiarCampos();

        for (var NumIdentificacion in diccionarioEstudiantes) {
            mostrarestudiantes(diccionarioEstudiantes[NumIdentificacion]);
        }
        mostrarEstudiantes();
    }
}

function editarEstudiante(NumIdentificacion) {
    // Buscar el estudiante por su número de identificación
    var estudiante = diccionarioEstudiantes[NumIdentificacion];
    
    if (estudiante) {
        // Llenar los campos del formulario de edición con la información del estudiante
        document.getElementById("NumIdentificacion").value = estudiante.NumIdentificacion;
        document.getElementById("nombre").value = estudiante.nombre;
        document.getElementById("celular").value = estudiante.celular;
        document.getElementById("correo").value = estudiante.correo;
        document.getElementById("grupo").value = estudiante.grupo;

        //Botón de "Guardar" para confirmar la edición
        var guardarBoton = document.createElement("button");
        guardarBoton.textContent = "Guardar";
        guardarBoton.onclick = function() {
            guardarCambiosEstudiante(NumIdentificacion);
        };
        
        // Reemplazar el botón "Agregar" con el botón "Guardar"
        var agregarBoton = document.querySelector("#add button");
        agregarBoton.parentNode.replaceChild(guardarBoton, agregarBoton);
    }
}

function buscarEstudiante() {
    var numeroIdentificacionABuscar = document.getElementById("buscarEstudiante").value.trim();

    // Filtrar la lista de estudiantes según el número de identificación
    var estudiantesFiltrados = {};

    for (var NumIdentificacion in diccionarioEstudiantes) {
        if (NumIdentificacion.includes(numeroIdentificacionABuscar)) {
            estudiantesFiltrados[NumIdentificacion] = diccionarioEstudiantes[NumIdentificacion];
        }
    }

    // Mostrar los estudiantes filtrados en la tabla
    var estudiantesLista = document.querySelector(".estudiantes-lista");
    estudiantesLista.innerHTML = "";

    for (var NumIdentificacion in estudiantesFiltrados) {
        var estudiante = estudiantesFiltrados[NumIdentificacion];
        var estudianteRow = document.createElement("tr");
        estudianteRow.innerHTML = `
            <td>${estudiante.NumIdentificacion}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.celular}</td>
            <td>${estudiante.correo}</td>
            <td>${estudiante.grupo}</td>
            <td>${estudiante.campcoins}</td>
            <td>
                <button onclick="editarEstudiante('${estudiante.NumIdentificacion}')">Editar</button>
                <button onclick="eliminarestudiante('${estudiante.NumIdentificacion}')">Eliminar</button>
            </td>
        `;
        estudiantesLista.appendChild(estudianteRow);
    }
}


function guardarCambiosEstudiante(NumIdentificacion) {
    // Buscar el estudiante por su número de identificación
    var estudiante = diccionarioEstudiantes[NumIdentificacion];

    if (estudiante) {
        // Actualizar los datos del estudiante con los valores de los campos de edición
        estudiante.NumIdentificacion = document.getElementById("NumIdentificacion").value;
        estudiante.nombre = document.getElementById("nombre").value;
        estudiante.celular = document.getElementById("celular").value;
        estudiante.correo = document.getElementById("correo").value;
        estudiante.grupo = document.getElementById("grupo").value;

        localStorage.setItem("estudiantes", JSON.stringify(diccionarioEstudiantes));
        limpiarCampos();
        mostrarEstudiantes();

        // Reemplazar el botón "Guardar" por el botón "Agregar"
        var guardarBoton = document.querySelector("#add button");
        var agregarBoton = document.createElement("button");
        agregarBoton.textContent = "Agregar";
        agregarBoton.onclick = agregar_estudiante;
        guardarBoton.parentNode.replaceChild(agregarBoton, guardarBoton);
    }
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById("NumIdentificacion").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("grupo").value = "";
}













// GESTIÓN DE CONCEPTOS
var diccionarioConceptos = {};

// Cargar datos almacenados en el localStorage
if (localStorage.getItem("Conceptos")) {
    diccionarioConceptos = JSON.parse(localStorage.getItem("Conceptos"));
    actualizarTablaConceptos();
}

function generarIDUnico() {
    // Obtiene la marca de tiempo actual en milisegundos desde el 1 de enero de 1970
    return new Date().getTime();
}

// Función para agregar un concepto
function agregarConcepto() {
    var descripcion = document.getElementById("descripcion").value;
    var valor = parseFloat(document.getElementById("valor").value);

    if (descripcion && !isNaN(valor)) {
        var identificacion = generarIDUnico();

        var concepto = {
            identificacion: identificacion,
            descripcion: descripcion,
            valor: valor
        };

        // La identificación es la clave para el diccionario
        diccionarioConceptos[identificacion] = concepto;
        actualizarTablaConceptos();
        limpiarCampos();
        
        // Guardar datos en el localStorage
        localStorage.setItem("Conceptos", JSON.stringify(diccionarioConceptos));
    }
}

function actualizarTablaConceptos() {
    var conceptosLista = document.getElementById("conceptos-lista");
    conceptosLista.innerHTML = "";

    for (var identificacion in diccionarioConceptos) {
        var concepto = diccionarioConceptos[identificacion];
        var conceptoRow = document.createElement("tr");
        conceptoRow.innerHTML = `
            <td>${concepto.identificacion}</td>
            <td>${concepto.descripcion}</td>
            <td>${concepto.valor}</td>
            <td>
                <button onclick="eliminarConcepto(${concepto.identificacion})">Eliminar</button>
            </td>
        `;
        conceptosLista.appendChild(conceptoRow);
    }
}

// Función para eliminar un concepto
function eliminarConcepto(identificacion) {
    if (confirm(`¿Estás seguro de que deseas eliminar el concepto con ID "${identificacion}"?`)) {
        delete diccionarioConceptos[identificacion];
        actualizarTablaConceptos();
        localStorage.setItem("Conceptos", JSON.stringify(diccionarioConceptos));
    }
}

function limpiarCampos() {
    document.getElementById("descripcion").value = "";
    document.getElementById("valor").value = "";
}












// CONSIGNACION O DESCUENTO
function realizarOperación() {
    // Obtener el número de identificación del estudiante y el ID del concepto
    var estudianteNumIdentificacion = document.getElementById("estudiante").value;
    var conceptoID = parseInt(document.getElementById("id").value);

    // Buscar el estudiante en diccionarioEstudiantes y el concepto en diccionarioConceptos
    var estudiante = diccionarioEstudiantes[estudianteNumIdentificacion];
    var concepto = diccionarioConceptos[conceptoID];

    if (estudiante && concepto) {
        estudiante.campcoins += concepto.valor;// Sumar o restar el valor
        localStorage.setItem("estudiantes", JSON.stringify(diccionarioEstudiantes));
        
        // Limpiar los campos
        document.getElementById("estudiante").value = "";
        document.getElementById("id").value = "";

        // Actualizar la lista de estudiantes
        mostrarEstudiantes();
    } else {
        alert("Estudiante o concepto no encontrado. Verifica los datos ingresados.");
    }
}