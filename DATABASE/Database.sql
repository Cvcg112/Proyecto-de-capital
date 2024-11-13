-- Crear la base de datos
CREATE DATABASE db_Capital;

-- Usar la base de datos recién creada
USE db_Capital;

-- Crear tabla EstadosPago para manejar los estados de pago posibles
CREATE TABLE EstadosPago (
    EstadoPagoID    INT AUTO_INCREMENT PRIMARY KEY,
    Estado          VARCHAR(50) UNIQUE NOT NULL
);

-- Crear tabla TipoTransaccion para manejar los tipos de transacción
CREATE TABLE TiposTransaccion (
    TipoTransaccionID  INT AUTO_INCREMENT PRIMARY KEY,
    Tipo               VARCHAR(50) UNIQUE NOT NULL
);

-- Crear tabla MetodosPago para los métodos de pago
CREATE TABLE MetodosPago (
    MetodoPagoID   INT AUTO_INCREMENT PRIMARY KEY,
    Metodo         VARCHAR(150) UNIQUE NOT NULL
);

-- Crear tabla Categorias para las categorías de facturas
CREATE TABLE Categorias (
    CategoriaID    INT AUTO_INCREMENT PRIMARY KEY,
    Categoria      VARCHAR(150) UNIQUE NOT NULL
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
    FacturaID           INT AUTO_INCREMENT PRIMARY KEY,
    NumeroFactura       VARCHAR(100) UNIQUE NOT NULL,
    FechaFactura        DATE NOT NULL,
    FechaPago           DATE,
    MontoFactura        DECIMAL(12,8) CHECK (MontoFactura >= 0),
    Descripcion         VARCHAR(500),
    CategoriaID         INT,
    MetodoPagoID        INT,
    EstadoPagoID        INT,
    IdCapital           INT,
    ProveedorID         INT,
    FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID),
    FOREIGN KEY (MetodoPagoID) REFERENCES MetodosPago(MetodoPagoID),
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
