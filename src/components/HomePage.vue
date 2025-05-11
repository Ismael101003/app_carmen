<template>
  <div class="home-container">
    <section class="welcome-section">
      <div class="container">
        <h1 class="main-title">Bienvenidos a la Parroquia Nuestra Señora del Carmen</h1>
        <p class="lead-text">Un lugar de encuentro, oración y comunidad para todos los fieles</p>
        
        <div class="row mt-5">
          <div class="col-md-6">
            <div class="welcome-message">
              <h2>Mensaje del Párroco</h2>
              <div class="message-content">
                <div class="priest-img">
                  <a href="https://ibb.co/vxFbt4ZX"><img src="https://i.ibb.co/SXj2LwRf/padre.jpg" alt="padre" border="0"></a>
                </div>
                <p>
                  mensaje...
                </p>
                <p>
                  mensaje...
                </p>
                <p class="priest-name">P. Martin Rosas</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="announcements">
              <h2>Anuncios Parroquiales</h2>
              <div class="announcement-list">
                <div class="announcement-item">
                  <div class="announcement-date">15 Mayo</div>
                  <div class="announcement-content">
                    <h3>anuncio</h3>
                    <p>...</p>
                  </div>
                </div>
                <div class="announcement-item">
                  <div class="announcement-date">20 Mayo</div>
                  <div class="announcement-content">
                    <h3>Catequesis Familiar</h3>
                    <p>..</p>
                  </div>
                </div>
                <div class="announcement-item">
                  <div class="announcement-date">Julio</div>
                  <div class="announcement-content">
                    <h3>Fiesta Patronal</h3>
                    <p>Preparativos para nuestra fiesta patronal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="quick-links">
      <div class="container">
        <h2 class="text-center mb-5">Accesos Rápidos</h2>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="quick-link-card">
              <div class="icon-container">
                <i class="fas fa-clock"></i>
              </div>
              <h3>Horarios de Misa</h3>
              <p>Consulta los horarios de nuestras celebraciones eucarísticas y confesiones.</p>
              <router-link to="/HorarioMisa" class="btn btn-primary">Ver Horarios</router-link>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="quick-link-card">
              <div class="icon-container">
                <i class="fas fa-users"></i>
              </div>
              <h3>Ministerios</h3>
              <p>Conoce nuestros ministerios parroquiales y cómo puedes participar.</p>
              <router-link to="/ministeriospage" class="btn btn-primary">Ver Ministerios</router-link>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="quick-link-card">
              <div class="icon-container">
                <i class="fas fa-envelope"></i>
              </div>
              <h3>Contacto</h3>
              <p>¿Tienes alguna pregunta? Contáctanos y te responderemos a la brevedad.</p>
              <router-link to="/contacto" class="btn btn-primary">Contactar</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="upcoming-events">
      <div class="container">
        <h2 class="text-center mb-4">Próximos Eventos</h2>
        <div class="event-timeline">
          <div class="event-item">
            <div class="event-date">
              <span class="day">16</span>
              <span class="month">Mayo</span>
            </div>
            <div class="event-details">
              <h3>Misa Solemne</h3>
              <p>Celebración especial por el aniversario de nuestra parroquia.</p>
              <p><i class="fas fa-map-marker-alt"></i> Templo principal</p>
              <p><i class="fas fa-clock"></i> 19:00 hrs</p>
            </div>
          </div>
          <div class="event-item">
            <div class="event-date">
              <span class="day">22</span>
              <span class="month">Mayo</span>
            </div>
            <div class="event-details">
              <h3>Rosario Comunitario</h3>
              <p>Rosario dedicado a Nuestra Señora del Carmen.</p>
              <p><i class="fas fa-map-marker-alt"></i> Jardín parroquial</p>
              <p><i class="fas fa-clock"></i> 18:00 hrs</p>
            </div>
          </div>
          <div class="event-item">
            <div class="event-date">
              <span class="day">30</span>
              <span class="month">Mayo</span>
            </div>
            <div class="event-details">
              <h3>Kermes Parroquial</h3>
              <p>Ven y disfruta de comida, juegos y convivencia familiar.</p>
              <p><i class="fas fa-map-marker-alt"></i> Atrio de la parroquia</p>
              <p><i class="fas fa-clock"></i> 11:00 - 18:00 hrs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home-container {
  padding-bottom: 2rem;
}

.welcome-section {
  padding: 2rem 0 3rem;
}

.main-title {
  color: var(--primary-color);
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.lead-text {
  font-size: 1.2rem;
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.welcome-message, .announcements {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: 100%;
}

.welcome-message h2, .announcements h2 {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid var(--secondary-color);
}

.message-content {
  position: relative;
}

.priest-img {
  float: left;
  margin-right: 15px;
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.priest-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.priest-name {
  font-style: italic;
  text-align: right;
  margin-top: 1rem;
  font-weight: 600;
}

.announcement-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.announcement-item {
  display: flex;
  background-color: #f9f9f9;
  border-radius: 6px;
  overflow: hidden;
}

.announcement-date {
  background-color: var(--primary-color);
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  font-weight: bold;
}

.announcement-content {
  padding: 10px 15px;
  flex-grow: 1;
}

.announcement-content h3 {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: var(--accent-color);
}

.announcement-content p {
  margin: 0;
  font-size: 0.9rem;
}

/* Quick Links Section */
.quick-links {
  background-color: #f5f5f5;
  padding: 3rem 0;
}

.quick-link-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  text-align: center;
  height: 100%;
  transition: transform 0.3s ease;
}

.quick-link-card:hover {
  transform: translateY(-5px);
}

.icon-container {
  width: 70px;
  height: 70px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
}

.icon-container i {
  font-size: 1.8rem;
}

.quick-link-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.quick-link-card p {
  margin-bottom: 1.5rem;
  color: #666;
}

.quick-link-card .btn {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.quick-link-card .btn:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

/* Upcoming Events Section */
.upcoming-events {
  padding: 3rem 0;
}

.event-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.event-item {
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.event-date {
  background-color: var(--accent-color);
  color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100px;
}

.event-date .day {
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1;
}

.event-date .month {
  font-size: 1rem;
}

.event-details {
  padding: 15px 20px;
  flex-grow: 1;
}

.event-details h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.event-details p {
  margin-bottom: 5px;
}

.event-details i {
  color: var(--accent-color);
  margin-right: 5px;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .main-title {
    font-size: 2rem;
  }
  
  .welcome-message, .announcements {
    margin-bottom: 2rem;
  }
  
  .priest-img {
    float: none;
    margin: 0 auto 15px;
  }
  
  .event-item {
    flex-direction: column;
  }
  
  .event-date {
    flex-direction: row;
    min-width: 100%;
    padding: 10px;
  }
  
  .event-date .day {
    margin-right: 5px;
  }
  
  .event-date .month {
    font-size: 1.2rem;
  }
}
</style>