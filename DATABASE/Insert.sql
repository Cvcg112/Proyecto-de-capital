INSERT INTO EstadosPago (Estado) VALUES 
('Pagado'),
('Pendiente'),
('Cancelado');

-- Insertar valores en la tabla TiposTransaccion
INSERT INTO TiposTransaccion (Tipo) VALUES 
('Ingreso'),
('Gasto');

-- Insertar valores en la tabla MetodosPago
INSERT INTO MetodosPago (Metodo) VALUES 
('Efectivo'),
('Transferencia Bancaria'),
('Tarjeta de Crédito'),
('Tarjeta de Débito'),
('Cheque'),
('PayPal'),
('Criptomoneda'),
('Otros');

-- Insertar valores en la tabla Categorias
INSERT INTO Categorias (Categoria) VALUES 
('Servicios Básicos'),
('Alimentación'),
('Alquiler'),
('Entretenimiento'),
('Educación'),
('Transporte'),
('Salud'),
('Inversiones'),
('Otros');
