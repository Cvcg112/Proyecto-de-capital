<?php
include 'conexion.php';

$accion = $_POST['accion'] ?? $_GET['accion'] ?? ''; // Acción a realizar: "registro", "eliminar", "editar" o "verificarNombre"

// Registro de proveedor
if ($accion == 'registro') {
    // Capturar los datos del formulario
    $nombre = $_POST['nombre'];
    $contacto = $_POST['contacto'];
    $direccion = $_POST['direccion'];
    $notas = $_POST['notas'];

    // Preparar e insertar los datos en la base de datos
    $sql = "INSERT INTO Proveedor (NombreProveedor, Contacto, Direccion, NotasProveedor) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $nombre, $contacto, $direccion, $notas);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Proveedor registrado con éxito."]);
    } else {
        echo json_encode(['success' => false, 'message' => "Error al registrar el proveedor: " . $conn->error]);
    }

    $stmt->close();
}

// Eliminar proveedor
elseif ($accion == 'eliminar') {
    $id = $_POST['id'];

    $sql = "DELETE FROM Proveedor WHERE ProveedorID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Proveedor eliminado con éxito."]);
    } else {
        echo json_encode(['success' => false, 'message' => "Error al eliminar el proveedor: " . $conn->error]);
    }

    $stmt->close();
}

// Editar proveedor
elseif ($accion == 'editar') {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $contacto = $_POST['contacto'];
    $direccion = $_POST['direccion'];
    $notas = $_POST['notas'];

    $sql = "UPDATE Proveedor SET NombreProveedor=?, Contacto=?, Direccion=?, NotasProveedor=? WHERE ProveedorID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $nombre, $contacto, $direccion, $notas, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Proveedor actualizado con éxito."]);
    } else {
        echo json_encode(['success' => false, 'message' => "Error al actualizar el proveedor: " . $conn->error]);
    }

    $stmt->close();
}

// Verificar si el nombre de proveedor ya existe
elseif ($accion == 'verificarNombre') {
    $nombre = $_POST['nombre'];

    // Consulta SQL para verificar si existe el nombre
    $sql = "SELECT COUNT(*) AS count FROM Proveedor WHERE NombreProveedor = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();

    // Enviar respuesta de disponibilidad
    echo json_encode(['exists' => $count > 0]);
    $stmt->close();
}

$conn->close();
?>
