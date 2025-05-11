<template>
  <div class="peliculas-container">
    <div class="page-header">
      <h1>Películas Católicas</h1>
      <p class="subtitle">Disfruta de estas películas con un profundo mensaje de fe y valores cristianos</p>
    </div>
    
    <div class="filter-section">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          v-model="searchTerm" 
          placeholder="Buscar películas..." 
          @input="filterPeliculas"
        />
      </div>
    </div>
    
    <div class="peliculas-grid">
      <div class="pelicula-card" v-for="pelicula in filteredPeliculas" :key="pelicula.id">
        <div class="card-image">
          <img :src="pelicula.imagen" :alt="pelicula.nombre" />
          <div class="overlay">
            <button class="info-btn" @click="showDetails(pelicula)">
              <i class="fas fa-info-circle"></i> Detalles
            </button>
            <a :href="pelicula.link" target="_blank" class="link-btn">
              <i class="fas fa-external-link-alt"></i> Más info
            </a>
          </div>
        </div>
        <div class="card-content">
          <h2>{{ pelicula.nombre }}</h2>
          <div class="tags" v-if="pelicula.tags">
            <span v-for="(tag, index) in pelicula.tags" :key="index" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mensaje cuando no hay resultados -->
    <div class="no-results" v-if="filteredPeliculas.length === 0">
      <i class="fas fa-film"></i>
      <p>No se encontraron películas que coincidan con tu búsqueda.</p>
      <button @click="resetSearch" class="reset-btn">Mostrar todas las películas</button>
    </div>
    
    <!-- Modal para mostrar detalles -->
    <div class="modal" v-if="selectedPelicula" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-btn" @click="closeModal">&times;</span>
        <div class="modal-header">
          <h2>{{ selectedPelicula.nombre }}</h2>
        </div>
        <div class="modal-body">
          <img :src="selectedPelicula.imagen" :alt="selectedPelicula.nombre" class="modal-image" />
          <div class="modal-description">
            <div class="movie-info">
              <div class="info-item" v-if="selectedPelicula.director">
                <span class="label">Director:</span>
                <span class="value">{{ selectedPelicula.director }}</span>
              </div>
              <div class="info-item" v-if="selectedPelicula.año">
                <span class="label">Año:</span>
                <span class="value">{{ selectedPelicula.año }}</span>
              </div>
              <div class="info-item" v-if="selectedPelicula.duracion">
                <span class="label">Duración:</span>
                <span class="value">{{ selectedPelicula.duracion }}</span>
              </div>
            </div>
            
            <h3>Sinopsis</h3>
            <p>{{ selectedPelicula.sinopsis || 'No hay sinopsis disponible para esta película.' }}</p>
            
            <div class="tags" v-if="selectedPelicula.tags">
              <span v-for="(tag, index) in selectedPelicula.tags" :key="index" class="tag">{{ tag }}</span>
            </div>
            
            <div class="modal-actions">
              <a :href="selectedPelicula.link" target="_blank" class="btn-primary">
                <i class="fas fa-external-link-alt"></i> Más información
              </a>
              <button class="btn-secondary" @click="closeModal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="recommendation-section">
      <h2>¿Tienes alguna recomendación?</h2>
      <p>Si conoces alguna película católica que no esté en nuestra lista y crees que debería estar, ¡háznoslo saber!</p>
      <router-link to="/contacto" class="recommend-btn">Recomendar película</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "peliculasPage",
  data() {
    return {
      searchTerm: '',
      selectedPelicula: null,
      peliculas: [
        {
          id: 1,
          nombre: "La Pasión de Cristo",
          imagen: "https://i.postimg.cc/8PB4M9Y1/A1g-RBKNQnz-L.jpg", 
          link: "https://es.wikipedia.org/wiki/La_pasi%C3%B3n_de_Cristo",
          director: "Mel Gibson",
          año: "2004",
          duracion: "127 minutos",
          sinopsis: "La película narra las últimas 12 horas de la vida de Jesús de Nazaret, desde su arresto en el Huerto de los Olivos hasta su crucifixión y muerte en el Calvario.",
          tags: ["Drama", "Histórica", "Bíblica"]
        },
        {
          id: 2,
          nombre: "El Gran Milagro",
          imagen: "https://i.postimg.cc/9QTCk3TL/e37520971a24691ddd2815ffa7ae73a9409570e5743a83c870650002d560db63.jpg",
          link: "https://es.wikipedia.org/wiki/El_gran_milagro",
          director: "Bruce Morris",
          año: "2011",
          duracion: "70 minutos",
          sinopsis: "Una película animada que muestra el milagro de la Eucaristía a través de los ojos de tres personas que asisten a misa, revelando la presencia de ángeles y santos durante la celebración.",
          tags: ["Animación", "Eucaristía", "Familiar"]
        },
        {
          id: 3,
          nombre: "Marcelino Pan y Vino",
          imagen: "https://i.postimg.cc/ncjSJB2L/Marcelino.jpg",
          link: "https://es.wikipedia.org/wiki/Marcelino_pan_y_vino",
          director: "Ladislao Vajda",
          año: "1955",
          duracion: "91 minutos",
          sinopsis: "Un niño huérfano es acogido por unos frailes franciscanos. En el monasterio, Marcelino descubre un crucifijo en el desván y comienza a llevarle pan y vino, desarrollando una relación especial con Cristo.",
          tags: ["Drama", "Clásico", "Milagro"]
        },
        {
          id: 4,
          nombre: "Cartas a Dios",
          imagen: "https://i.postimg.cc/R0swhbVx/Cartas-a-Dios.jpg",
          link: "https://es.wikipedia.org/wiki/Cartas_a_Dios",
          director: "Éric-Emmanuel Schmitt",
          año: "2009",
          duracion: "105 minutos",
          sinopsis: "Un niño con cáncer escribe cartas a Dios como forma de terapia, lo que impacta profundamente a las personas que lo rodean, especialmente al cartero que recibe estas cartas.",
          tags: ["Drama", "Esperanza", "Fe"]
        },
        {
          id: 5,
          nombre: "Que baje Dios y lo vea",
          imagen: "https://i.postimg.cc/MpS0d4nw/Que-baje-Dios-y-lo-vea.jpg",
          link: "https://es.wikipedia.org/wiki/Los_milagros_del_rosario",
          director: "Curro Velázquez",
          año: "2018",
          duracion: "95 minutos",
          sinopsis: "Un grupo de monjes entra en un torneo de fútbol para salvar su monasterio de la ruina financiera, enfrentándose a equipos profesionales con fe y determinación.",
          tags: ["Comedia", "Deporte", "Fe"]
        },
        {
          id: 6,
          nombre: "Benedicto XVI",
          imagen: "https://i.postimg.cc/YCNSzDWJ/Benedicto-XVI-el-Papa-Em-rito.jpg",
          link: "https://es.wikipedia.org/wiki/Jesús,_el_Niño_Rey",
          director: "Andrés Garrigó",
          año: "2016",
          duracion: "90 minutos",
          sinopsis: "Documental sobre la vida y el pontificado de Joseph Ratzinger, desde su infancia en Baviera hasta su renuncia como Papa Benedicto XVI.",
          tags: ["Documental", "Biografía", "Papado"]
        },
        {
          id: 7,
          nombre: "El Rostro de la Misericordia",
          imagen: "https://i.postimg.cc/0jyCvXT3/El-rostro-de-la-misericordia.jpg",
          link: "https://es.wikipedia.org/wiki/Jesús,_el_Niño_Rey",
          director: "David Naglieri",
          año: "2016",
          duracion: "60 minutos",
          sinopsis: "Documental que explora el mensaje de la Divina Misericordia revelado a Santa Faustina Kowalska y su impacto en el mundo moderno.",
          tags: ["Documental", "Divina Misericordia", "Santa Faustina"]
        },
      ],
      filteredPeliculas: []
    };
  },
  created() {
    this.filteredPeliculas = [...this.peliculas];
  },
  methods: {
    filterPeliculas() {
      if (!this.searchTerm.trim()) {
        this.filteredPeliculas = [...this.peliculas];
        return;
      }
      
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredPeliculas = this.peliculas.filter(pelicula => {
        return pelicula.nombre.toLowerCase().includes(term) || 
               (pelicula.tags && pelicula.tags.some(tag => tag.toLowerCase().includes(term))) ||
               (pelicula.director && pelicula.director.toLowerCase().includes(term)) ||
               (pelicula.sinopsis && pelicula.sinopsis.toLowerCase().includes(term));
      });
    },
    resetSearch() {
      this.searchTerm = '';
      this.filteredPeliculas = [...this.peliculas];
    },
    showDetails(pelicula) {
      this.selectedPelicula = pelicula;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedPelicula = null;
      document.body.style.overflow = 'auto';
    }
  }
};
</script>

<style scoped>
.peliculas-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
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

.filter-section {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.search-box input {
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(139, 90, 43, 0.2);
}

.peliculas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
  margin-bottom: 3rem;
}

.pelicula-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.pelicula-card:hover {
  transform: translateY(-5px);
}

.card-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.pelicula-card:hover .card-image img {
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.pelicula-card:hover .overlay {
  height: 100%;
}

.info-btn, .link-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.info-btn:hover, .link-btn:hover {
  background-color: var(--accent-color);
}

.card-content {
  padding: 1.2rem;
}

.card-content h2 {
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  height: 2.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* No Results Message */
.no-results {
  text-align: center;
  padding: 3rem 0;
}

.no-results i {
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 1rem;
}

.no-results p {
  color: #666;
  margin-bottom: 1.5rem;
}

.reset-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background-color: var(--accent-color);
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

.movie-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.info-item {
  margin-bottom: 8px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: bold;
  color: var(--primary-color);
  margin-right: 5px;
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

.modal-description .tags {
  margin-top: 1.5rem;
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
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

/* Recommendation Section */
.recommendation-section {
  background-color: var(--accent-color);
  color: white;
  padding: 3rem 0;
  margin: 3rem -20px 0;
  text-align: center;
}

.recommendation-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.recommendation-section p {
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.recommend-btn {
  display: inline-block;
  background-color: white;
  color: var(--accent-color);
  padding: 12px 30px;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
}

.recommend-btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-3px);
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
  
  .peliculas-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  
  .card-image {
    height: 240px;
  }
  
  .recommendation-section h2 {
    font-size: 1.6rem;
  }
}
</style>