<?php
include 'Conexion.php';

$type = $_GET['type'];
$response = array();

switch ($type) {
    case 'estadosPago':
        $query = "SELECT EstadoPagoID, Estado FROM EstadosPago";
        $result = $conn->query($query);
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        break;

    case 'tiposTransaccion':
        $query = "SELECT TipoTransaccionID, Tipo FROM TiposTransaccion";
        $result = $conn->query($query);
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        break;

    case 'proveedores':
        $query = "SELECT ProveedorID, NombreProveedor FROM Proveedor";
        $result = $conn->query($query);
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        break;

    default:
        $response['error'] = 'Tipo no válido';
}

header('Content-Type: application/json');
echo json_encode($response);
?>
