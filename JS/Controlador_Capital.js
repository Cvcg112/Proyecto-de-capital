// Función principal para cargar todos los selects del formulario
function cargarSelectsFormulario() {
    cargarOpciones('estadosPago', 'estadoPago', 'EstadoPagoID', 'Estado');
    cargarOpciones('tiposTransaccion', 'tipoTransaccion', 'TipoTransaccionID', 'Tipo');
    cargarOpciones('proveedores', 'proveedor', 'ProveedorID', 'NombreProveedor');
}

// Función para cargar opciones en un <select> específico
function cargarOpciones(type, selectId, valueKey, textKey) {
    fetch(`../PHP/gestionar_capital.php?type=${type}`)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">Seleccione una opción</option>'; // Limpiar y agregar opción por defecto

            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item[valueKey];
                option.textContent = item[textKey];
                select.appendChild(option);
            });
        })
        .catch(error => console.error(`Error al cargar ${selectId}:`, error));
}

// Ejecutar la función principal al cargar la página
document.addEventListener('DOMContentLoaded', cargarSelectsFormulario);

// Función para cargar las facturas en la tabla
function cargarFacturas() {
    fetch('../PHP/gestionar_factura.php?accion=cargar')
        .then(response => response.json())
        .then(data => {
            const tablaFacturas = document.getElementById('facturasTabla');
            tablaFacturas.innerHTML = ""; // Limpiar contenido actual

            if (data.length > 0) {
                data.forEach(factura => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><div>${factura.FacturaID}</div></td>
                        <td><div>${factura.FechaFactura}</div></td>
                        <td><div>${factura.MontoFactura}</div></td>
                        <td><div>${factura.Estado}</div></td>
                        <td>
                            <div>
                               <button  onclick="Verfacturas( ${factura.FacturaID},'${factura.FechaFactura}',${factura.MontoFactura},'${factura.Descripcion}','${factura.Estado}','${factura.NombreProveedor}')"><i class="fa-solid fa-book"></i></button>
                                <button onclick="eliminarFactura(${factura.FacturaID})"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </td>
                    `;
                    tablaFacturas.appendChild(row);
                });
            } else {
                tablaFacturas.innerHTML = "<tr><td colspan='7'>No hay facturas registradas.</td></tr>";
            }
        })
        .catch(error => console.error("Error al cargar facturas:", error));
}

// Función para eliminar una factura
function eliminarFactura(id) {
    if (confirm("¿Seguro que deseas eliminar esta factura?")) {
        fetch('../PHP/gestionar_factura.php', {
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
                    cargarFacturas(); // Recargar la lista de facturas
                }
            })
            .catch(error => console.error("Error al eliminar factura:", error));
    }
}

// Función para generar un número único de factura de 13 dígitos
function generarNumeroFactura() {
    const timestamp = Date.now().toString().slice(-10); // Últimos 10 dígitos del timestamp
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Número aleatorio de 3 dígitos
    return timestamp + randomPart; // Combina ambos para obtener 13 dígitos
}

// Función para registrar una nueva factura
function registrarFactura() {
    const form = document.getElementById('facturaForm');
    const formData = new FormData(form);

    // Generar FacturaID único
    const facturaId = generarNumeroFactura();

    fetch('../PHP/gestionar_factura.php', {
        method: 'POST',
        body: new URLSearchParams({
            accion: 'registro',
            facturaId: facturaId, // Incluye el número generado
            fechaFactura: formData.get('fechaPago'),
            montoFactura: formData.get('monto'),
            descripcion: formData.get('descripcion'),
            estadoPagoId: formData.get('estadoPago'),
            proveedorId: formData.get('proveedor')
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarFacturas();
                form.reset();
            }
        })
        .catch(error => console.error("Error al registrar factura:", error));
}

// Función para editar una factura (implementa esta según tus necesidades)
function Verfacturas(id, FechaFactura, montoFactura, descripcion, estadoPagoId, proveedorId) {
    const form = document.getElementById('VerFormulario');

    // Asignar valores a los campos del formulario
    form.elements['id'].value = id;
    form.elements['fechaFacturas'].value = FechaFactura;
    form.elements['montoFactura'].value = montoFactura;
    form.elements['descripcion'].value = descripcion;
    form.elements['estadoPago'].value = estadoPagoId;
    form.elements['proveedor'].value = proveedorId;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('CargarFactura'));
    modal.show();
}


// Cargar facturas al cargar la página
document.addEventListener("DOMContentLoaded", cargarFacturas);
