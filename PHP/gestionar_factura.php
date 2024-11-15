<?php
include 'conexion.php';

$accion = $_POST['accion'] ?? $_GET['accion'] ?? '';

if ($accion == 'cargar') {
    $sql = "SELECT f.FacturaID, f.FechaFactura, f.MontoFactura, f.Descripcion, e.Estado, p.NombreProveedor 
            FROM Factura f
            JOIN EstadosPago e ON f.EstadoPagoID = e.EstadoPagoID
            JOIN Proveedor p ON f.ProveedorID = p.ProveedorID";
    $result = $conn->query($sql);

    $facturas = [];
    while ($row = $result->fetch_assoc()) {
        $facturas[] = $row;
    }
    echo json_encode($facturas);
}

elseif ($accion == 'registro') {
    $facturaId = $_POST['facturaId']; // Recibir FacturaID generado
    $fechaFactura = $_POST['fechaFactura'];
    $montoFactura = $_POST['montoFactura'];
    $descripcion = $_POST['descripcion'];
    $estadoPagoId = $_POST['estadoPagoId'];
    $proveedorId = $_POST['proveedorId'];

    $sql = "INSERT INTO Factura (FacturaID, FechaFactura, MontoFactura, Descripcion, EstadoPagoID, ProveedorID) 
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isdssi", $facturaId, $fechaFactura, $montoFactura, $descripcion, $estadoPagoId, $proveedorId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Factura registrada con éxito."]);
    } else {
        echo json_encode(['success' => false, 'message' => "Error al registrar la factura: " . $conn->error]);
    }

    $stmt->close();
}

elseif ($accion == 'eliminar') {
    $id = $_POST['id'];

    $sql = "DELETE FROM Factura WHERE FacturaID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Factura eliminada con éxito."]);
    } else {
        echo json_encode(['success' => false, 'message' => "Error al eliminar la factura: " . $conn->error]);
    }

    $stmt->close();
}

$conn->close();
?>
