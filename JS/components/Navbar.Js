const Header = document.getElementById("Header");

Header.innerHTML +=
`
<!-- Navbar Lateral -->
<div class="sidebar d-flex flex-column p-3">
    <!-- Logo y título -->
    <div class="text-center py-3">
        <i class="fas fa-coins fa-2x sidebar-icon"></i>
        <h4>Gestión de Capital</h4>
    </div>
    
    <!-- Menú de navegación -->
    <ul class="nav flex-column mb-auto" id="navLinks">
        <li class="nav-item">
            <a class="nav-link" href="../View/Index.html">
                <i class="fas fa-home me-2"></i>Inicio
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="../View/Mostrar_gestionCapital.html">
                <i class="fas fa-wallet me-2"></i>Gestión de Capital
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="../View/Mostrar_proveedores.html">
                <i class="fas fa-truck me-2"></i>Proveedores
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="../View/Mostrar_Perfil.html">
                <i class="fas fa-user me-2"></i>Perfil
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="../View/Mostrar_Configuracion.html">
                <i class="fas fa-cog me-2"></i>Configuración
            </a>
        </li>
    </ul>

    <!-- Perfil de usuario -->
    <div class="mt-auto p-3 user-profile">
        <div class="d-flex align-items-center justify-content-between" onclick="toggleUserOptions()">
            <div class="d-flex align-items-center">
                <img src="https://via.placeholder.com/40" class="rounded-circle me-2" alt="Perfil">
                <span>Usuario</span>
            </div>
            <i class="fas fa-chevron-down ms-2" id="user-arrow"></i>
        </div>
        <!-- Opciones del usuario -->
        <div class="user-options collapse mt-2">
            <a href="#" class="d-block text-decoration-none">Cuenta</a>
            <a href="#" class="d-block text-decoration-none">Cerrar sesión</a>
        </div>
    </div>
</div>

`;

// JavaScript para resaltar el enlace activo según la ruta actual
const navLinks = document.querySelectorAll('.sidebar .nav-link');

// Recorrer cada enlace y verificar si el href coincide con la URL actual
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  } else {
    link.classList.remove('active'); // Asegúrate de remover la clase 'active' de los otros enlaces
  }
});

// JavaScript para animación de opciones del usuario
function toggleUserOptions() {
  const userOptions = document.querySelector('.user-options');
  const userArrow = document.getElementById('user-arrow');
  userOptions.classList.toggle('collapse');
  userArrow.classList.toggle('fa-chevron-up');
  userArrow.classList.toggle('fa-chevron-down');
}
