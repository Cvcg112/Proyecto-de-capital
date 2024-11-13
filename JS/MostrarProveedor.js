// Función para cargar proveedores
function cargarProveedores() {
    fetch('../PHP/obtener_proveedores.php')
        .then(response => response.json())
        .then(data => {
            const tablaProveedores = document.getElementById('proveedoresTabla');
            tablaProveedores.innerHTML = ""; // Limpiar contenido actual

            if (data.length > 0) {
                data.forEach(proveedor => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><div>${proveedor.NombreProveedor}</div></td>
                        <td><div>${proveedor.Contacto}</div></td>
                        <td><div>${proveedor.Direccion}</div></td>
                        <td><div>${proveedor.NotasProveedor}</div></td>
                        <td>
                            <div>
                                <button class="btn btn-sm" onclick="editarProveedor(${proveedor.ProveedorID}, '${proveedor.NombreProveedor}', '${proveedor.Contacto}', '${proveedor.Direccion}', '${proveedor.NotasProveedor}')">
                                    <i class="fas fa-edit"></i> <!-- Ícono de edición -->
                                </button>
                                <button class="btn  btn-sm" onclick="eliminarProveedor(${proveedor.ProveedorID})">
                                    <i class="fas fa-trash-alt"></i> <!-- Ícono de eliminación -->
                                </button>
                             </div>
                        </td>
                    `;
                    tablaProveedores.appendChild(row);
                });
            } else {
                tablaProveedores.innerHTML = "<tr><td colspan='6' class='text-center'>No hay proveedores registrados.</td></tr>";
            }
        })
        .catch(error => console.error("Error al cargar proveedores:", error));
}


// Función para eliminar un proveedor
function eliminarProveedor(id) {
    if (confirm("¿Seguro que deseas eliminar este proveedor?")) {
        fetch('../PHP/gestionar_proveedor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `accion=eliminar&id=${id}`
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    cargarProveedores(); // Recargar la lista de proveedores
                }
            })
            .catch(error => console.error("Error al eliminar proveedor:", error));
    }
}

// Función para verificar proveedor
function ValidarNombreProveedor(nombre) {
    return fetch('../PHP/gestionar_proveedor.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `accion=verificarNombre&nombre=${encodeURIComponent(nombre)}`
    })
    .then(response => response.json())
    .then(data => data.exists);
}


// Función para editar un proveedor
function editarProveedor(id, nombre, contacto, direccion, notas) {
    const form = document.getElementById('editarFormulario');
    form.elements['id'].value = id;
    form.elements['nombre'].value = nombre;
    form.elements['contacto'].value = contacto;
    form.elements['direccion'].value = direccion;
    form.elements['notas'].value = notas;

    // Mostrar el modal de edición usando Bootstrap 5
    const modal = new bootstrap.Modal(document.getElementById('editarModal'));
    modal.show();
}

// Función para registrar un nuevo proveedor
function registrarProveedor() {
    const form = document.getElementById('proveedorForm');
    const nombre = form.elements['nombre'].value.trim();
    const contacto = form.elements['contacto'].value.trim();
    const direccion = form.elements['direccion'].value.trim();
    const notas = form.elements['notas'].value.trim();

    if (!nombre || !contacto || !direccion || !notas) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    ValidarNombreProveedor(nombre).then(existe => {
        if (existe) {
            alert("El nombre del proveedor ya está registrado. Usa otro nombre.");
        } else {
            // Continuar con el registro
            const formData = new FormData(form);
            fetch('../PHP/gestionar_proveedor.php', {
                method: 'POST',
                body: new URLSearchParams({
                    accion: 'registro',
                    nombre: formData.get('nombre'),
                    contacto: formData.get('contacto'),
                    direccion: formData.get('direccion'),
                    notas: formData.get('notas')
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    cargarProveedores();
                    const deseaRegistrarOtro = confirm("¿Deseas registrar otro proveedor?");
                    if (deseaRegistrarOtro) {
                        form.reset();
                    } else {
                        window.location.href = "../View/Mostrar_proveedores.html";
                    }
                }
            })
            .catch(error => console.error("Error al registrar proveedor:", error));
        }
    });
}




// Función para actualizar un proveedor existente
function actualizarProveedor() {
    const form = document.getElementById('editarFormulario');
    const formData = new FormData(form);

    fetch('../PHP/gestionar_proveedor.php', {
        method: 'POST',
        body: new URLSearchParams({
            accion: 'editar',
            id: formData.get('id'),
            nombre: formData.get('nombre'),
            contacto: formData.get('contacto'),
            direccion: formData.get('direccion'),
            notas: formData.get('notas')
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            cargarProveedores(); // Recargar la lista de proveedores

            // Cerrar el modal después de guardar los cambios
            const modal = bootstrap.Modal.getInstance(document.getElementById('editarModal'));
            modal.hide();
        }
    })
    .catch(error => console.error("Error al actualizar proveedor:", error));
}

// Cargar proveedores al cargar la página
document.addEventListener("DOMContentLoaded", cargarProveedores);
