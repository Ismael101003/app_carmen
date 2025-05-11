<template>
  <div class="contacto-container">
    <div class="page-header">
      <h1>Contacto</h1>
      <p class="subtitle">Estamos aquí para atenderte. No dudes en comunicarte con nosotros.</p>
    </div>
    
    <div class="contact-content">
      <div class="contact-info">
        <div class="info-card">
          <div class="icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <h3>Dirección</h3>
          <p>Av. Principal #123, Colonia</p>
          <p>Ciudad de México, México</p>
        </div>
        
        <div class="info-card">
          <div class="icon">
            <i class="fas fa-clock"></i>
          </div>
          <h3>Horario de Oficina</h3>
          <p>Lunes a Viernes: 10:00 - 13:00</p>
          <p>Lunes a Viernes: 16:00 - 18:00</p>
          <p>Los martes no se labora en la parroquia</p>
          <p>Sábados: 10:00 - 13:00</p>
          <p>Domingos: 10:00 - 12:00</p>
        </div>
      </div>
      
      <div class="contact-form-container">
        <h2>Envíanos un mensaje</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="nombre">Nombre completo</label>
            <input 
              type="text" 
              id="nombre" 
              v-model="formData.nombre" 
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="telefono">Teléfono (opcional)</label>
            <input 
              type="tel" 
              id="telefono" 
              v-model="formData.telefono" 
              placeholder="Ingresa tu número telefónico"
            />
          </div>
          
          <div class="form-group">
            <label for="asunto">Asunto</label>
            <select id="asunto" v-model="formData.asunto" required>
              <option value="" disabled selected>Selecciona un asunto</option>
              <option value="Información general">Información general</option>
              <option value="Sacramentos">Sacramentos</option>
              <option value="Ministerios">Ministerios</option>
              <option value="Eventos">Eventos</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="mensaje">Mensaje</label>
            <textarea 
              id="mensaje" 
              v-model="formData.mensaje" 
              placeholder="Escribe tu mensaje aquí"
              rows="5"
              required
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting">Enviando...</span>
            <span v-else>Enviar mensaje</span>
          </button>
        </form>
        
        <div class="form-success" v-if="formSubmitted">
          <i class="fas fa-check-circle"></i>
          <h3>¡Mensaje enviado con éxito!</h3>
          <p>Gracias por contactarnos. Te responderemos a la brevedad posible.</p>
        </div>
      </div>
    </div>
    
    <div class="parish-map">
      <h2>Nuestra ubicación</h2>
      <div class="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7520.60345651757!2d-99.12559239263828!3d19.52865553494924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f9e06febf529%3A0x40d4dec0b0c80488!2sParroquia%20Nuestra%20Se%C3%B1ora%20del%20Carmen!5e0!3m2!1ses-419!2smx!4v1735873911168!5m2!1ses-419!2smx"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="map-iframe"
        ></iframe>
      </div>
    </div>
    
    <div class="social-section">
      <h2>Síguenos en redes sociales</h2>
      <p>Mantente informado de nuestras actividades y eventos a través de nuestras redes sociales.</p>
      <div class="social-icons">
        <a href="#" class="social-icon">
          <i class="fab fa-facebook-f"></i>
          <span>Facebook</span>
        </a>
        <a href="#" class="social-icon">
          <i class="fab fa-instagram"></i>
          <span>Instagram</span>
        </a>
        <a href="#" class="social-icon">
          <i class="fab fa-youtube"></i>
          <span>YouTube</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      formData: {
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      },
      isSubmitting: false,
      formSubmitted: false
    };
  },
  methods: {
    submitForm() {
      this.isSubmitting = true;
      
      // Simulación de envío de formulario
      setTimeout(() => {
        this.isSubmitting = false;
        this.formSubmitted = true;
        
        // Resetear formulario
        this.formData = {
          nombre: '',
          email: '',
          telefono: '',
          asunto: '',
          mensaje: ''
        };
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.formSubmitted = false;
        }, 5000);
      }, 1500);
    }
  }
};
</script>

<style scoped>
.contacto-container {
  max-width: 1200px;
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
  max-width: 700px;
  margin: 0 auto;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr 1.5fr;
  }
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
  transform: translateY(-5px);
}

.info-card .icon {
  width: 60px;
  height: 60px;
  background-color: var(--primary-color);
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
  margin: 0 0 0.5rem;
  color: #666;
  font-size: 0.95rem;
}

.info-card p:last-child {
  margin-bottom: 0;
}

.contact-form-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.contact-form-container h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.contact-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(139, 90, 43, 0.2);
}

.submit-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-success {
  text-align: center;
  padding: 2rem;
  background-color: #f0f9eb;
  border-radius: 8px;
  margin-top: 1rem;
}

.form-success i {
  font-size: 3rem;
  color: #67c23a;
  margin-bottom: 1rem;
}

.form-success h3 {
  color: #67c23a;
  margin-bottom: 0.8rem;
}

.form-success p {
  color: #666;
}

.parish-map {
  margin-bottom: 3rem;
}

.parish-map h2 {
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.map-wrapper {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: 400px;
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.social-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.social-section h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.social-section p {
  color: #666;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.social-icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.social-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s;
}

.social-icon:hover {
  transform: translateY(-5px);
}

.social-icon i {
  width: 60px;
  height: 60px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  transition: background-color 0.3s;
}

.social-icon:hover i {
  background-color: var(--accent-color);
}

.social-icon span {
  font-weight: 500;
}

@media (max-width: 767px) {
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .contact-form-container {
    padding: 1.5rem;
  }
  
  .map-wrapper {
    height: 300px;
  }
  
  .social-icons {
    gap: 15px;
  }
  
  .social-icon i {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}
</style>