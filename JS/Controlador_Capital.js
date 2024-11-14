// cargarSelects.js

// Función para cargar opciones en un <select>
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

// Llamadas para cargar cada <select> cuando la página está lista
document.addEventListener('DOMContentLoaded', () => {
    cargarOpciones('estadosPago', 'estadoPago', 'EstadoPagoID', 'Estado');
    cargarOpciones('tiposTransaccion', 'tipoTransaccion', 'TipoTransaccionID', 'Tipo');
    cargarOpciones('proveedores', 'proveedor', 'ProveedorID', 'NombreProveedor');
});
