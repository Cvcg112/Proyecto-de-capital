<?php
include 'Conexion.php';

$sql = "SELECT CapitalInicial, CapitalActual, CapitalGastadoTotal FROM Capital ORDER BY FechaActualizacion DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $capital = $result->fetch_assoc();
    echo json_encode($capital); // Devolver datos en formato JSON
} else {
    echo json_encode(["error" => "No hay datos de capital disponibles"]);
}

$conn->close();
?>
