<template>
  <div id="app">
    <div class="banner-container">
      <img 
        src="https://i.imgur.com/S4vfcff.jpeg"
        alt="Parroquia Nuestra Señora del Carmen"
        class="banner-img"
      />
      <div class="banner-overlay">
        <h1>Parroquia Nuestra Señora del Carmen</h1>
      </div>
    </div>
    
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid d-flex align-items-center">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/">
                Inicio
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.path === '/HorarioMisa' }" to="/HorarioMisa">
                Horarios
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.path === '/ministeriospage' }" to="/ministeriospage">
                Ministerios
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.path === '/comunidades' }" to="/comunidades">
                Comunidades
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.path === '/peliculas' }" to="/peliculas">
                Películas
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.path === '/Podcast' }" to="/Podcast">
                Podcast
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.path === '/contacto' }" to="/contacto">
                Contacto
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view></router-view>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="row mt-3">
          <div class="col-12 text-center">
            <p>&copy; {{ new Date().getFullYear() }} Parroquia Nuestra Señora del Carmen. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
<InstallPWA />

    
  </div>
</template>

<script>
import InstallPWA from './components/InstallPWA.vue'

export default {
  name: "App",
  components: {
    InstallPWA
  },
  data() {
    return {
      mobileMenuOpen: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      if (this.mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = 'auto';
    }
  }
};
</script>

<style>
:root {
  --primary-color: #8B5A2B; /* Marrón del escapulario del Carmen */
  --secondary-color: #F5F5DC; /* Beige claro */
  --accent-color: #1E3A8A; /* Azul oscuro */
  --text-color: #333333;
  --light-color: #FFFFFF;
}

body {
  font-family: 'Lato', Arial, sans-serif;
  color: var(--text-color);
  background-color: var(--secondary-color);
  margin: 0;
  padding: 0;
}

/* Banner - manteniendo la imagen original */
.banner-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.banner-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.banner-overlay h1 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 2.5rem;
  text-align: center;
  padding: 0 20px;
}

/* Navbar mejorado */
.navbar {
  background-color: var(--primary-color);
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-nav {
  margin: 0 auto;
}

.nav-link {
  color: var(--light-color) !important;
  font-weight: 500;
  padding: 0.8rem 1.2rem !important;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 4px;
  margin: 0 5px;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--light-color) !important;
}

/* Contenido principal */
.main-content {
  min-height: 60vh;
  padding: 2rem 0;
  background-color: var(--light-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  max-width: 1200px;
  width: 95%;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* Footer mejorado */
.footer {
  background-color: var(--primary-color);
  color: var(--light-color);
  padding: 3rem 0 2rem;
  margin-top: 2rem;
}

.footer h4 {
  color: var(--secondary-color);
  margin-bottom: 1.2rem;
  font-weight: 600;
}

.footer p {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.social-icons {
  display: flex;
  gap: 15px;
  margin-top: 1rem;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--light-color);
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.3s;
}

.social-icon:hover {
  background-color: var(--accent-color);
  transform: translateY(-3px);
  color: var(--light-color);
}

/* Mapa mejorado */
.map-container {
  display: none;
}

@media (min-width: 768px) {
  .map-container {
    display: block;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 220px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    border: 2px solid var(--primary-color);
  }
  
  .map-header {
    background-color: var(--primary-color);
    color: var(--light-color);
    padding: 8px;
    text-align: center;
    font-weight: 600;
  }
}

/* Mapa móvil mejorado */
.map-mobile-container {
  display: none;
}

@media (max-width: 767px) {
  .map-mobile-container {
    display: block;
    margin: 20px auto;
    text-align: center;
    max-width: 90%;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--primary-color);
  }
  
  .mobile-map-text {
    background-color: var(--primary-color);
    color: var(--light-color);
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    padding: 10px;
  }
  
  .map-iframe {
    height: 250px;
  }
  
  .banner-overlay h1 {
    font-size: 1.8rem;
  }
}

/* Iframe del mapa */
.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.update-notification {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 9999;
}

.update-notification-content {
  background-color: var(--primary-color, #8B5A2B);
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 15px;
}

.update-notification p {
  margin: 0;
}

#update-button {
  background-color: white;
  color: var(--primary-color, #8B5A2B);
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}
/* Responsive adjustments */
@media (max-width: 576px) {
  .footer {
    text-align: center;
  }
  
  .social-icons {
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
}
</style>