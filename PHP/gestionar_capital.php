<?php
include 'conexion.php';

$accion = $_POST['accion'] ?? $_GET['accion'] ?? ''; 

if ($accion == 'registro') {
    $CapitalInicial = $_POST['CapitalInicial'];
    $capitalActual = $_POST['capitalActual'];
    $capitalGastadoTotal = $_POST['capitalGastadoTotal'];
    $fechaActualizacion = $_POST['fechaActualizacion'];
    $fuenteCapital = $_POST['fuenteCapital'];

    // Validar entradas
    if (empty($CapitalInicial) || empty($capitalActual) || empty($capitalGastadoTotal) || empty($fuenteCapital)) {
        echo json_encode(['success' => false, 'message' => "Todos los campos son obligatorios."]);
        exit;
    }

    $sql = "INSERT INTO Capital (CapitalInicial, CapitalActual, capitalGastadoTotal, FechaActualizacion, FuenteCapital) 
            VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("dddss", $CapitalInicial, $capitalActual, $capitalGastadoTotal, $fechaActualizacion, $fuenteCapital);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Capital registrado con éxito."]);
    } else {
        echo json_encode(['success' => false, 'message' => "Error al registrar el capital: " . $conn->error]);
    }

    $stmt->close();
}

elseif ($accion == 'eliminar') {
    $id = $_POST['id'];

    // Comprobar si existen facturas o transacciones asociadas
    $sqlCheck = "SELECT COUNT(*) FROM Factura WHERE IdCapital=?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param("i", $id);
    $stmtCheck->execute();
    $stmtCheck->bind_result($count);
    $stmtCheck->fetch();
    if ($count > 0) {
        echo json_encode(['success' => false, 'message' => "No se puede eliminar el capital porque hay facturas asociadas."]);
        $stmtCheck->close();
        exit;
    }

    $sql = "DELETE FROM Capital WHERE IdCapital=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Capital eliminado con éxito."]);
    } else {
        echo json_encode(['success' => false, 'message' => "Error al eliminar el capital: " . $conn->error]);
    }

    $stmt->close();
}

elseif ($accion == 'editar') {
    $id = $_POST['id'];
    $CapitalInicial = $_POST['CapitalInicial'];
    $capitalActual = $_POST['capitalActual'];
    $capitalGastadoTotal = $_POST['capitalGastadoTotal'];
    $fechaActualizacion = $_POST['fechaActualizacion'];
    $fuenteCapital = $_POST['fuenteCapital'];

    // Validar entradas
    if (empty($CapitalInicial) || empty($capitalActual) || empty($capitalGastadoTotal) || empty($fuenteCapital)) {
        echo json_encode(['success' => false, 'message' => "Todos los campos son obligatorios."]);
        exit;
    }

    $sql = "UPDATE Capital SET CapitalInicial=?, CapitalActual=?, CapitalGastadoTotal=?, FechaActualizacion=?, FuenteCapital=? WHERE IdCapital=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("dddssi", $CapitalInicial, $capitalActual, $capitalGastadoTotal, $fechaActualizacion, $fuenteCapital, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Capital actualizado con éxito."]);
    } else {
        echo json_encode(['success' => false, 'message' => "Error al actualizar el capital: " . $conn->error]);
    }

    $stmt->close();
}

$conn->close();
?>
