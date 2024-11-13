<?php
$servername = "localhost"; // o "127.0.0.1"
$username = "root"; // usuario por defecto en XAMPP
$password = ""; // contraseña por defecto en XAMPP (normalmente está vacía)
$dbname = "db_Capital"; // nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);
/*
// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa";
?>*/
