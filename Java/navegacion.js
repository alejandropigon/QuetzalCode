// JavaScript para manejar la navegación entre secciones
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const sections = document.querySelectorAll('.seccion');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para ocultar todas las secciones
    function hideAllSections() {
        sections.forEach(section => {
            section.classList.remove('active');
        });
    }
    
    // Función para desactivar todos los enlaces
    function deactivateAllLinks() {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }
    
    // Función para mostrar una sección específica
    function showSection(sectionId) {
        hideAllSections();
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            console.log('Mostrando sección:', sectionId); // Para depuración
        } else {
            console.log('Sección no encontrada:', sectionId); // Para depuración
        }
    }
    
    // Función para activar el enlace correspondiente
    function activateLink(sectionId) {
        deactivateAllLinks();
        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Función principal para cambiar de sección
    function changeSection(sectionId) {
        console.log('Cambiando a sección:', sectionId); // Para depuración
        showSection(sectionId);
        activateLink(sectionId);
        
        // Actualizar la URL sin recargar la página
        history.pushState(null, null, `#${sectionId}`);
    }
    
    // Manejar clics en los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            
            const sectionId = this.getAttribute('data-section');
            changeSection(sectionId);
            
            // Scroll suave hacia arriba
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Manejar la navegación con los botones de atrás/adelante del navegador
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1); // Eliminar el #
        if (hash) {
            // Verificar si la sección existe
            if (document.getElementById(hash)) {
                changeSection(hash);
            } else {
                // Si no existe, mostrar inicio por defecto
                changeSection('inicio');
            }
        } else {
            // Si no hay hash, mostrar inicio
            changeSection('inicio');
        }
    });
    
    // Determinar qué sección mostrar al cargar la página
    function initializeSection() {
        const hash = window.location.hash.substring(1);
        
        if (hash && document.getElementById(hash)) {
            // Si hay un hash válido en la URL, mostrar esa sección
            changeSection(hash);
        } else {
            // Si no hay hash o no es válido, mostrar inicio
            changeSection('inicio');
            // Limpiar el hash si no es válido
            if (hash) {
                history.replaceState(null, null, ' ');
            }
        }
    }
    
    // Inicializar la sección
    initializeSection();
    
    // Depuración: Verificar que los elementos existen
    console.log('Secciones encontradas:', sections.length);
    console.log('Enlaces encontrados:', navLinks.length);
});