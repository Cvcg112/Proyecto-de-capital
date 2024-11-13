document.addEventListener("DOMContentLoaded", () => {
    fetch('../PHP/obtener_capital.php') // Ajusta la ruta si es necesario
        .then(response => response.json())
        .then(data => {
            if (data.CapitalInicial !== undefined && data.CapitalActual !== undefined && data.CapitalGastadoTotal !== undefined) {
                // Muestra los datos del capital en el HTML con formato de moneda
                document.getElementById("capitalInicial").textContent = formatCurrency(data.CapitalInicial);
                document.getElementById("capitalActual").textContent = formatCurrency(data.CapitalActual);
                document.getElementById("capitalGastado").textContent = formatCurrency(data.CapitalGastadoTotal);
            } else {
                handleError("Datos incompletos en la respuesta.");
            }
        })
        .catch(error => {
            console.error("Error en la conexión:", error);
            handleError("Error de conexión.");
        });
});

function formatCurrency(amount) {
    // Formatea el número como moneda con dos decimales
    return `$${parseFloat(amount).toFixed(2)}`;
}

function handleError(message) {
    // Muestra un mensaje de error en los campos correspondientes
    document.getElementById("capitalInicial").textContent = message;
    document.getElementById("capitalActual").textContent = message;
    document.getElementById("capitalGastado").textContent = message;
}
