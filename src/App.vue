<template>
  <div id="app">
    <div class="banner-container">
      <img 
        src="https://i.imgur.com/S4vfcff.jpeg"
        alt="Parroquia Nuestra Señora del Carmen"
        class="banner-img"
      />
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
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
              <router-link class="nav-link active" aria-current="page" to="/">
                Inicio
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="HorarioMisa">
                Horarios
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contacto">
                Contacto
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>

    <!-- Mapa fijo para pantallas grandes -->
    <div class="map-container">
      <iframe
        class="map-iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7520.60345651757!2d-99.12559239263828!3d19.52865553494924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f9e06febf529%3A0x40d4dec0b0c80488!2sParroquia%20Nuestra%20Se%C3%B1ora%20del%20Carmen!5e0!3m2!1ses-419!2smx!4v1735873911168!5m2!1ses-419!2smx"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    <!-- Texto y mapa para dispositivos móviles -->
    <div class="map-mobile-container">
      <p class="mobile-map-text">Aquí puedes visitar nuestra parroquia:</p>
      <iframe
        class="map-iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7520.60345651757!2d-99.12559239263828!3d19.52865553494924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f9e06febf529%3A0x40d4dec0b0c80488!2sParroquia%20Nuestra%20Se%C3%B1ora%20del%20Carmen!5e0!3m2!1ses-419!2smx!4v1735873911168!5m2!1ses-419!2smx"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}

/* Banner */
.banner-container {
  width: 100%;
  overflow: hidden;
}
.banner-img {
  width: 100%;
}
@media (min-width: 768px) {
  .banner-img {
    height: 250px;
    object-fit: cover;
    object-position: bottom;
  }
}

/* Mapa fijo en pantallas grandes */
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
    height: 200px;
    border: 2px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

/* Mapa móvil */
.map-mobile-container {
  display: none;
}
@media (max-width: 767px) {
  .map-mobile-container {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
  .mobile-map-text {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
}

/* Iframe del mapa */
.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
