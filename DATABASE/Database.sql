-- Crear la base de datos
CREATE DATABASE db_Capital;

-- Usar la base de datos recién creada
USE db_Capital;

-- Crear tabla EstadosPago para manejar los estados de pago posibles
CREATE TABLE EstadosPago (
    EstadoPagoID    INT AUTO_INCREMENT PRIMARY KEY,
    Estado          VARCHAR(50) UNIQUE NOT NULL
);

-- Crear tabla TiposTransaccion para manejar los tipos de transacción
CREATE TABLE TiposTransaccion (
    TipoTransaccionID  INT AUTO_INCREMENT PRIMARY KEY,
    Tipo               VARCHAR(50) UNIQUE NOT NULL
);

-- Crear tabla Capital
CREATE TABLE Capital (
    IdCapital            INT AUTO_INCREMENT PRIMARY KEY,
    CapitalInicial       DECIMAL(12,8) CHECK (CapitalInicial > 0),  -- No se permite 0
    CapitalActual        DECIMAL(12,8) CHECK (CapitalActual >= 0),
    CapitalGastadoTotal  DECIMAL(12,8) CHECK (CapitalGastadoTotal >= 0),
    FechaActualizacion   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FuenteCapital        VARCHAR(150)
);

-- Crear tabla Proveedor
CREATE TABLE Proveedor (
    ProveedorID         INT AUTO_INCREMENT PRIMARY KEY,
    NombreProveedor     VARCHAR(200) UNIQUE NOT NULL,
    Contacto            VARCHAR(25),
    Direccion           VARCHAR(350),
    NotasProveedor      TEXT
);

-- Crear tabla Factura
CREATE TABLE Factura (
    FacturaID           BIGINT PRIMARY KEY,  -- Cambiar a BIGINT para manejar números de 13 dígitos
    FechaFactura        DATE NOT NULL,
    FechaPago           DATE,
    MontoFactura        DECIMAL(12,8) CHECK (MontoFactura >= 0),
    Descripcion         VARCHAR(500),
    EstadoPagoID        INT,
    IdCapital           INT,
    ProveedorID         INT,
    FOREIGN KEY (EstadoPagoID) REFERENCES EstadosPago(EstadoPagoID),
    FOREIGN KEY (IdCapital) REFERENCES Capital(IdCapital),
    FOREIGN KEY (ProveedorID) REFERENCES Proveedor(ProveedorID)
);

-- Crear tabla HistorialTransacciones
CREATE TABLE HistorialTransacciones (
    TransaccionID       INT AUTO_INCREMENT PRIMARY KEY,
    IdCapital           INT,
    FechaTransaccion    DATETIME NOT NULL,
    Monto               DECIMAL(12,8) CHECK (Monto >= 0),
    TipoTransaccionID   INT,
    DescripcionTransaccion VARCHAR(500),
    FOREIGN KEY (IdCapital) REFERENCES Capital(IdCapital),
    FOREIGN KEY (TipoTransaccionID) REFERENCES TiposTransaccion(TipoTransaccionID)
);
