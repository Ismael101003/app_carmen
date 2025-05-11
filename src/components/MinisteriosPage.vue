<template>
  <div class="ministerios-container">
    <div class="page-header">
      <h1>Ministerios Parroquiales</h1>
      <p class="subtitle">Conoce los ministerios de nuestra parroquia y cómo puedes ser parte de ellos</p>
    </div>
    
    <div class="ministerios-grid">
      <div class="ministerio-card" v-for="ministerio in ministerios" :key="ministerio.id">
        <div class="card-image">
          <img :src="ministerio.imagen" :alt="ministerio.nombre" />
          <div class="overlay">
            <button class="info-btn" @click="showDetails(ministerio)">
              <i class="fas fa-info-circle"></i> Más información
            </button>
          </div>
        </div>
        <div class="card-content">
          <h2>{{ ministerio.nombre }}</h2>
          <p v-if="ministerio.descripcion">{{ ministerio.descripcion }}</p>
          <p v-else>Ministerio dedicado al servicio y crecimiento de nuestra comunidad parroquial.</p>
        </div>
      </div>
    </div>
    
    <!-- Modal para mostrar detalles -->
    <div class="modal" v-if="selectedMinisterio" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-btn" @click="closeModal">&times;</span>
        <div class="modal-header">
          <h2>{{ selectedMinisterio.nombre }}</h2>
        </div>
        
        <!-- Modal especial para Coros -->
        <div v-if="selectedMinisterio.id === 7" class="modal-body coros-modal">
          <div class="coros-intro">
            <img :src="selectedMinisterio.imagen" :alt="selectedMinisterio.nombre" class="modal-image" />
            <div class="intro-text">
              <p>{{ selectedMinisterio.descripcionCompleta }}</p>
            </div>
          </div>
          
          <div class="coros-tabs">
            <div class="tabs-header">
              <button 
                v-for="(coro, index) in coros" 
                :key="index" 
                class="tab-btn" 
                :class="{ active: activeCoro === index }"
                @click="activeCoro = index"
              >
                {{ coro.nombre }}
              </button>
            </div>
            
            <div class="tab-content" v-if="coros[activeCoro]">
              <div class="coro-details">
                <div class="coro-image">
                  <img :src="coros[activeCoro].imagen" :alt="coros[activeCoro].nombre" />
                </div>
                <div class="coro-info">
                  <h3>{{ coros[activeCoro].nombre }}</h3>
                  <p class="coro-description">{{ coros[activeCoro].descripcion }}</p>
                  
                  <div class="info-section">
                    <h4><i class="fas fa-music"></i> Estilo Musical</h4>
                    <p>{{ coros[activeCoro].estilo }}</p>
                  </div>
                  
                  <div class="info-section">
                    <h4><i class="fas fa-clock"></i> Horarios de Misa</h4>
                    <ul class="horarios-list">
                      <li v-for="(horario, hIndex) in coros[activeCoro].horariosMisa" :key="hIndex">
                        {{ horario }}
                      </li>
                    </ul>
                  </div>
                  
                  <div class="info-section">
                    <h4><i class="fas fa-calendar-alt"></i> Ensayos</h4>
                    <p>{{ coros[activeCoro].horarioEnsayo }}</p>
                  </div>
                  
                  <div class="info-section">
                    <h4><i class="fas fa-user"></i> Coordinador</h4>
                    <p>{{ coros[activeCoro].coordinador }}</p>
                  </div>
                  
                  <div class="info-section" v-if="coros[activeCoro].requisitos">
                    <h4><i class="fas fa-clipboard-list"></i> Requisitos para participar</h4>
                    <ul class="requisitos-list">
                      <li v-for="(requisito, rIndex) in coros[activeCoro].requisitos" :key="rIndex">
                        {{ requisito }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="coro-actions">
                <button class="btn-primary">
                  <i class="fas fa-user-plus"></i> Unirse a este coro
                </button>
                <button class="btn-secondary" @click="showContactForm = true">
                  <i class="fas fa-envelope"></i> Contactar al coordinador
                </button>
              </div>
            </div>
          </div>
          
          <!-- Formulario de contacto para coros -->
          <div class="contact-form-overlay" v-if="showContactForm" @click="showContactForm = false">
            <div class="contact-form-container" @click.stop>
              <h3>Contactar al coordinador de {{ coros[activeCoro].nombre }}</h3>
              <form @submit.prevent="submitContactForm">
                <div class="form-group">
                  <label for="nombre">Nombre completo</label>
                  <input type="text" id="nombre" v-model="contactForm.nombre" required />
                </div>
                <div class="form-group">
                  <label for="email">Correo electrónico</label>
                  <input type="email" id="email" v-model="contactForm.email" required />
                </div>
                <div class="form-group">
                  <label for="telefono">Teléfono</label>
                  <input type="tel" id="telefono" v-model="contactForm.telefono" required />
                </div>
                <div class="form-group">
                  <label for="mensaje">Mensaje</label>
                  <textarea id="mensaje" v-model="contactForm.mensaje" rows="4" required></textarea>
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn-primary">Enviar mensaje</button>
                  <button type="button" class="btn-secondary" @click="showContactForm = false">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <!-- Modal estándar para otros ministerios -->
        <div v-else class="modal-body">
          <img :src="selectedMinisterio.imagen" :alt="selectedMinisterio.nombre" class="modal-image" />
          <div class="modal-description">
            <h3>Descripción</h3>
            <p>{{ selectedMinisterio.descripcionCompleta || 'Este ministerio está dedicado a servir a nuestra comunidad parroquial a través de diversas actividades y servicios. Si estás interesado en participar, acércate a la oficina parroquial para más información.' }}</p>
            
            <h3>Horarios de Reunión</h3>
            <p>{{ selectedMinisterio.horarios || 'Por definir. Consulta en la oficina parroquial.' }}</p>
            
            <h3>Contacto</h3>
            <p>{{ selectedMinisterio.contacto || 'Para más información, comunícate con la oficina parroquial.' }}</p>
            
            <div class="modal-actions">
              <button class="btn-primary">Unirse al Ministerio</button>
              <button class="btn-secondary" @click="closeModal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="join-section">
      <div class="join-content">
        <h2>¿Quieres ser parte de algún ministerio?</h2>
        <p>Todos estamos llamados a servir según nuestros dones y talentos. ¡Únete a uno de nuestros ministerios y ayúdanos a construir el Reino de Dios!</p>
        <router-link to="/contacto" class="join-btn">Contáctanos</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ministeriosPage",
  data() {
    return {
      selectedMinisterio: null,
      activeCoro: 0,
      showContactForm: false,
      contactForm: {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      },
      ministerios: [
        {
          id: 1,
          nombre: "Monaguillos",
          imagen: "https://i.postimg.cc/zGVY8W42/monaguillos.jpg", 
          descripcion: "Servicio en el altar durante las celebraciones litúrgicas",
          descripcionCompleta: "Los monaguillos asisten al sacerdote durante la celebración de la Eucaristía y otras ceremonias litúrgicas. Este ministerio está abierto a niños y jóvenes que hayan recibido su Primera Comunión.",
          horarios: "Reuniones: Sábados 10:00 AM",
          contacto: "Coordinador: Gabriela"
        },
        {
          id: 2,
          nombre: "Catequesis Infantil",
          imagen: "https://i.postimg.cc/NfNv3bCr/catequesis-infantil.jpg",
          descripcion: "Formación en la fe para niños y preparación para sacramentos",
          descripcionCompleta: "La catequesis infantil prepara a los niños para recibir los sacramentos de iniciación cristiana (Bautismo, Primera Comunión y Confirmación) y les ayuda a crecer en su relación con Dios.",
          horarios: "Sábados 9:00 AM - 11:00 AM",
          contacto: "Coordinadora: María González"
        },
        {
          id: 3,
          nombre: "Pastoral de Adolescentes (Neureim Olam)",
          imagen: "https://i.postimg.cc/6Q8WjF93/GRupo-adolsecentes.jpg",
          descripcion: "Acompañamiento y formación para adolescentes",
          descripcionCompleta: "La pastoral de adolescentes ofrece un espacio de encuentro, formación y crecimiento en la fe para jóvenes de 12 a 15 años, ayudándoles a integrar la fe en su vida diaria.",
          horarios: "Sabados 12:00 PM - 1:00 PM",
          contacto: "Coordinador: Mariana Vieyra"
        },
        {
          id: 4,
          nombre: "Ministerio de Familias",
          imagen: "https://i.postimg.cc/7hkqL6SG/Ministerio-familias.jpg",
          descripcion: "Apoyo y formación para matrimonios y familias",
          descripcionCompleta: "El ministerio de familias ofrece formación, acompañamiento y actividades para fortalecer los matrimonios y la vida familiar desde una perspectiva cristiana.",
          horarios: "Reuniones: ",
          contacto: "Coordinadora: Lupita Sanchez"
        },
        {
          id: 5,
          nombre: "Ministerio de Evangelización",
          imagen: "https://i.postimg.cc/1t0LJKNX/evangeliz-CION.jpg",
          descripcion: "Anuncio del Evangelio y misiones parroquiales",
          descripcionCompleta: "El ministerio de evangelización se dedica a anunciar la Buena Nueva de Jesucristo a través de diversas actividades misioneras, retiros, visitas a hogares y eventos evangelizadores.",
          horarios: "Reuniones: Jueves 7:00 PM",
          contacto: "Coordinadora: Lucía Ramírez"
        },
        {
          id: 6,
          nombre: "Ministerio de Jóvenes",
          imagen: "https://i.postimg.cc/mk8KG2jG/jovenes.jpg",
          descripcion: "Formación y actividades para jóvenes adultos",
          descripcionCompleta: "El ministerio de jóvenes ofrece un espacio para que los jóvenes de 16 a 29 años profundicen en su fe, compartan experiencias y desarrollen su liderazgo cristiano.",
          horarios: "...",
          contacto: "Coordinador: Gael"
        },
        {
          id: 7,
          nombre: "Coros",
          imagen: "https://i.postimg.cc/J7qfXPLd/coros.jpg",
        
        },
        {
          id: 8,
          nombre: "Ministerio de Redes",
          imagen: "https://i.postimg.cc/8zFzL0K7/ministerio-familias.jpg",
          descripcion: "Comunicación digital y presencia en redes sociales",
          descripcionCompleta: "El ministerio de redes sociales se encarga de la comunicación digital de la parroquia, gestionando las redes sociales, el sitio web y otros canales digitales para difundir información y contenido evangelizador.",
          horarios: "Reuniones: ...",
          contacto: "Coordinador: ..."
        },
        {
          id: 9,
          nombre: "Ministerio de Redes",
          imagen: "https://i.postimg.cc/8zFzL0K7/ministerio-familias.jpg",
          descripcion: "Comunicación digital y presencia en redes sociales",
          descripcionCompleta: "El ministerio de redes sociales se encarga de la comunicación digital de la parroquia, gestionando las redes sociales, el sitio web y otros canales digitales para difundir información y contenido evangelizador.",
          horarios: "Reuniones: ...",
          contacto: "Coordinador: ..."
        },
      ],
      coros: [
        {
          nombre: "Coro Dominical 8:00 AM",
          imagen: "",
          descripcion: "Coro tradicional que anima la misa dominical de las 8:00 AM con cantos litúrgicos clásicos y tradicionales.",
          estilo: "Cantos tradicionales y litúrgicos",
          horariosMisa: ["Domingos 8:00 AM"],
          horarioEnsayo: "Viernes 7:00 PM",
          coordinador: "Agustin - Tel: (55) 1234-5678",
          requisitos: [
            "Compromiso de asistencia regular",
            "Conocimiento básico de música",
            "Puntualidad en ensayos y celebraciones"
          ]
        },
        {
          nombre: "Coro 9:30",
          imagen: "",
          descripcion: "Grupo musical formado por jóvenes que animan la misa dominical de las 12:30 PM con un estilo contemporáneo y dinámico.",
          estilo: "Música católica contemporánea y cantos de alabanza",
          horariosMisa: ["Domingos 12:30 PM"],
          horarioEnsayo: "Sábados 5:00 PM",
          coordinador: "Carlos Mendoza - Tel: (55) 8765-4321",
          requisitos: [
            "Edad entre 15 y 29 años",
            "Entusiasmo y compromiso",
            "No es necesaria experiencia musical previa"
          ]
        },
        {
          nombre: "Coro 11:00",
          imagen: "",
          descripcion: "Coro integrado por familias que animan la misa dominical de las 11:00 AM, con un repertorio variado y participativo.",
          estilo: "Cantos litúrgicos y familiares",
          horariosMisa: ["Domingos 11:00 AM"],
          horarioEnsayo: "Jueves 7:00 PM",
          coordinador: "Roberto y Ana Martínez - Tel: (55) 2468-1357",
          requisitos: [
            "Familias completas o miembros individuales",
            "Compromiso de participación",
            "Disposición para aprender"
          ]
        },
        {
          nombre: "Coro 12:30",
          imagen: "",
          descripcion: "Coro que anima la misa vespertina de los domingos con un estilo reflexivo y contemplativo.",
          estilo: "Cantos contemplativos y de adoración",
          horariosMisa: ["Domingos 6:00 PM"],
          horarioEnsayo: "Sábados 7:00 PM",
          coordinador: "Laura Sánchez - Tel: (55) 9876-5432",
          requisitos: [
            "Compromiso con la espiritualidad litúrgica",
            "Puntualidad y constancia",
            "Preferentemente con experiencia coral"
          ]
        },
        {
          nombre: "Schola Cantorum",
          imagen: "https://i.postimg.cc/NfNv3bCr/catequesis-infantil.jpg",
          descripcion: "Coro especializado en canto gregoriano y polifonía sacra para celebraciones especiales y solemnidades.",
          estilo: "Canto gregoriano y polifonía sacra",
          horariosMisa: ["Solemnidades y celebraciones especiales"],
          horarioEnsayo: "Miércoles 7:00 PM",
          coordinador: "Prof. Miguel Ángel Torres - Tel: (55) 3698-1472",
          requisitos: [
            "Conocimientos musicales avanzados",
            "Experiencia coral previa",
            "Compromiso con el estudio del repertorio sacro"
          ]
        }
      ]
    };
  },
  methods: {
    showDetails(ministerio) {
      this.selectedMinisterio = ministerio;
      this.activeCoro = 0; // Resetear el coro activo al abrir el modal
      this.showContactForm = false; // Asegurarse de que el formulario de contacto esté cerrado
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedMinisterio = null;
      document.body.style.overflow = 'auto';
      this.showContactForm = false;
    },
    submitContactForm() {
      // Aquí puedes implementar la lógica para enviar el formulario
      alert(`Mensaje enviado al coordinador de ${this.coros[this.activeCoro].nombre}. Te contactarán pronto.`);
      this.contactForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      };
      this.showContactForm = false;
    }
  }
};
</script>

<style scoped>
.ministerios-container {
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

.ministerios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 3rem;
}

.ministerio-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.ministerio-card:hover {
  transform: translateY(-5px);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.ministerio-card:hover .card-image img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: height 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ministerio-card:hover .overlay {
  height: 100%;
}

.info-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.info-btn:hover {
  background-color: var(--accent-color);
}

.card-content {
  padding: 1.2rem;
}

.card-content h2 {
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card-content p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #aaa;
  cursor: pointer;
  z-index: 10;
}

.close-btn:hover {
  color: #333;
}

.modal-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1.5rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.8rem;
}

.modal-body {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.modal-description {
  padding: 2rem;
}

.modal-description h3 {
  color: var(--primary-color);
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
}

.modal-description h3:first-child {
  margin-top: 0;
}

.modal-actions {
  display: flex;
  gap: 15px;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: var(--accent-color);
}

.btn-secondary {
  background-color: #f1f1f1;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e1e1e1;
}

/* Join Section */
.join-section {
  background-color: var(--primary-color);
  color: white;
  padding: 3rem 0;
  margin: 3rem -20px 0;
  text-align: center;
}

.join-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
}

.join-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.join-content p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.join-btn {
  display: inline-block;
  background-color: white;
  color: var(--primary-color);
  padding: 12px 30px;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
}

.join-btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-3px);
}

/* Estilos específicos para la sección de Coros */
.coros-modal {
  padding: 0;
}

.coros-intro {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .coros-intro {
    flex-direction: row;
  }
  
  .coros-intro .modal-image {
    width: 40%;
    height: auto;
  }
  
  .intro-text {
    width: 60%;
    padding: 2rem;
  }
}

.intro-text {
  padding: 1.5rem;
}

.coros-tabs {
  margin-top: 1rem;
}

.tabs-header {
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
}

.tab-btn {
  padding: 12px 20px;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background-color: #f1f1f1;
}

.tab-btn.active {
  border-bottom-color: var(--primary-color);
  color: var(--primary-color);
  font-weight: 600;
}

.tab-content {
  padding: 2rem;
}

.coro-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .coro-details {
    flex-direction: row;
  }
  
  .coro-image {
    width: 40%;
  }
  
  .coro-info {
    width: 60%;
  }
}

.coro-image {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.coro-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.coro-info h3 {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.coro-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.info-section {
  margin-bottom: 1.2rem;
}

.info-section h4 {
  color: var(--accent-color);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.horarios-list, .requisitos-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.horarios-list li, .requisitos-list li {
  padding: 5px 0;
  position: relative;
  padding-left: 20px;
}

.horarios-list li:before, .requisitos-list li:before {
  content: "•";
  color: var(--primary-color);
  position: absolute;
  left: 0;
}

.coro-actions {
  display: flex;
  gap: 15px;
  margin-top: 1rem;
}

/* Formulario de contacto para coros */
.contact-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.contact-form-container {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.contact-form-container h3 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(139, 90, 43, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .modal-body {
    flex-direction: row;
  }
  
  .modal-image {
    width: 40%;
    height: auto;
    max-height: 500px;
  }
  
  .modal-description {
    width: 60%;
  }
}

@media (max-width: 767px) {
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .ministerios-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .join-content h2 {
    font-size: 1.6rem;
  }
  
  .tabs-header {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  
  .tab-btn {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
}
</style>