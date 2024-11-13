<?php
include 'conexion.php';

$sql = "SELECT * FROM Proveedor";
$result = $conn->query($sql);

$proveedores = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $proveedores[] = $row;
    }
}

echo json_encode($proveedores); // Devolver datos en formato JSON
?>
