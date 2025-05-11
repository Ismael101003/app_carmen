<template>
  <div class="horarios-container">
    <div class="page-header">
      <h1>Horarios de Misa y Confesión</h1>
      <p class="subtitle">Ven y celebra con nosotros</p>
    </div>

    <div class="schedule-cards">
      <div class="schedule-card">
        <div class="card-header">
          <i class="fas fa-church"></i>
          <h2>Horarios de Misa</h2>
        </div>
        <div class="card-body">
          <div class="schedule-item">
            <div class="day">Lunes a Viernes</div>
            <div class="time">8:00 AM</div>
          </div>
          <div class="schedule-item">
            <div class="day">Domingos</div>
            <div class="time-list">
              <span>8:00 AM</span>
              <span>9:30 AM</span>
              <span>11:00 AM</span>
              <span>12:30 PM</span>
              <span>6:00 PM</span>
            </div>
            <div class="day">Domingos en capillas</div>
            <div class="time-list">
              <span>9:30 AM en Inmaculada concepcion</span>
              <span>10:30 AM en Señor de chalma</span>
              <span>10:30 AM en Señor de la Misericordia</span>
            </div>
          </div>
          <div class="schedule-note important">
            <i class="fas fa-exclamation-circle"></i>
            <p>Recuerda que los <strong>martes</strong> es día de descanso en la parroquia.</p>
          </div>
        </div>
      </div>

      <div class="schedule-card">
        <div class="card-header">
          <i class="fas fa-praying-hands"></i>
          <h2>Horarios de Confesión</h2>
        </div>
        <div class="card-body">
          <div class="schedule-item">
            <div class="day">Lunes a Viernes</div>
            <div class="time">9:00 AM</div>
          </div>
          <div class="schedule-note important">
            <i class="fas fa-exclamation-circle"></i>
            <p>Recuerda que los <strong>martes</strong> es día de descanso en la parroquia.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="additional-info">
      <h2>Información Adicional</h2>
      <div class="info-cards">
        <div class="info-card">
          <div class="icon">
            <i class="fas fa-bible"></i>
          </div>
          <h3>Liturgia de la Palabra</h3>
          <p>Miércoles 7:00 PM</p>
        </div>
        <div class="info-card">
          <div class="icon">
            <i class="fas fa-cross"></i>
          </div>
          <h3>Adoración al Santísimo</h3>
          <p>Jueves 9:00 AM - 10:00 AM</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorarioMisa",
};
</script>

<style scoped>
.horarios-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: var(--primary-color);
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.schedule-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 3rem;
}

.schedule-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.schedule-card:hover {
  transform: translateY(-5px);
}

.card-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-header i {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.card-header h2 {
  font-size: 1.5rem;
  margin: 0;
}

.card-body {
  padding: 1.5rem;
}

.schedule-item {
  margin-bottom: 1.2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #eee;
}

.schedule-item:last-child {
  border-bottom: none;
}

.day {
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.time {
  font-size: 1.2rem;
}

.time-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.time-list span {
  background-color: var(--secondary-color);
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: 500;
}

.schedule-note {
  display: flex;
  align-items: flex-start;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.schedule-note i {
  color: var(--accent-color);
  font-size: 1.2rem;
  margin-right: 10px;
  margin-top: 3px;
}

.schedule-note p {
  margin: 0;
  font-size: 0.9rem;
}

.schedule-note.important {
  background-color: #fff3cd;
}

.schedule-note.important i {
  color: #856404;
}

/* Additional Info Section */
.additional-info {
  margin-top: 3rem;
}

.additional-info h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-3px);
}

.info-card .icon {
  width: 60px;
  height: 60px;
  background-color: var(--accent-color);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem;
}

.info-card .icon i {
  font-size: 1.5rem;
}

.info-card h3 {
  color: var(--primary-color);
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
}

.info-card p {
  margin: 0;
  color: #666;
}

@media (max-width: 767px) {
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .schedule-cards {
    grid-template-columns: 1fr;
  }
  
  .time-list {
    flex-direction: column;
    gap: 5px;
  }
  
  .time-list span {
    display: inline-block;
  }
}
</style>