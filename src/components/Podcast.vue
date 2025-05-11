<template>
  <div class="podcast-container">
    <div class="page-header">
      <h1>Podcast Parroquial</h1>
      <p class="subtitle">Escucha las homilías y reflexiones de nuestra parroquia</p>
    </div>
    
    <!-- Reproductor destacado para el episodio más reciente -->
    <div class="featured-episode" v-if="episodes.length > 0">
      <h2>Episodio más reciente</h2>
      <div class="featured-player">
        <div class="episode-info">
          <h3>{{ episodes[0].title }}</h3>
          <p class="episode-date">{{ formatDate(episodes[0].date) }}</p>
          <p class="episode-description">{{ episodes[0].description }}</p>
          <div class="episode-tags">
            <span v-for="(tag, index) in episodes[0].tags" :key="index" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="player-container">
          <audio 
            :src="episodes[0].audioUrl" 
            controls 
            class="audio-player"
            ref="featuredPlayer"
          ></audio>
          <div class="player-controls">
            <button @click="downloadEpisode(episodes[0])" class="control-btn">
              <i class="fas fa-download"></i> Descargar
            </button>
            <button @click="shareEpisode(episodes[0])" class="control-btn">
              <i class="fas fa-share-alt"></i> Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Lista de episodios anteriores -->
    <div class="episodes-list">
      <h2>Episodios anteriores</h2>
      
      <!-- Filtros -->
      <div class="filter-section">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchTerm" 
            placeholder="Buscar episodios..." 
            @input="filterEpisodes"
          />
        </div>
        <div class="category-filter">
          <select v-model="selectedCategory" @change="filterEpisodes">
            <option value="">Todas las categorías</option>
            <option value="Homilía">Homilías</option>
            <option value="Reflexión">Reflexiones</option>
            <option value="Enseñanza">Enseñanzas</option>
            <option value="Testimonio">Testimonios</option>
          </select>
        </div>
      </div>
      
      <!-- Episodios filtrados -->
      <div class="episodes-grid">
        <div 
          class="episode-card" 
          v-for="(episode, index) in filteredEpisodes" 
          :key="episode.id"
          v-show="index > 0 || filteredEpisodes.length === 1"
        >
          <div class="episode-header">
            <span class="episode-number">Ep. {{ episode.number }}</span>
            <span class="episode-duration">{{ formatDuration(episode.duration) }}</span>
          </div>
          <h3 class="episode-title">{{ episode.title }}</h3>
          <p class="episode-date">{{ formatDate(episode.date) }}</p>
          <p class="episode-description">{{ truncateText(episode.description, 120) }}</p>
          <audio :src="episode.audioUrl" controls class="audio-player"></audio>
          <div class="episode-footer">
            <div class="episode-tags">
              <span v-for="(tag, tagIndex) in episode.tags" :key="tagIndex" class="tag">{{ tag }}</span>
            </div>
            <div class="episode-actions">
              <button @click="downloadEpisode(episode)" class="action-btn">
                <i class="fas fa-download"></i>
              </button>
              <button @click="shareEpisode(episode)" class="action-btn">
                <i class="fas fa-share-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mensaje cuando no hay resultados -->
      <div class="no-results" v-if="filteredEpisodes.length === 0">
        <i class="fas fa-podcast"></i>
        <p>No se encontraron episodios que coincidan con tu búsqueda.</p>
        <button @click="resetSearch" class="reset-btn">Mostrar todos los episodios</button>
      </div>
      
      <!-- Paginación -->
      <div class="pagination" v-if="filteredEpisodes.length > itemsPerPage">
        <button 
          :disabled="currentPage === 1" 
          @click="currentPage--" 
          class="pagination-btn"
        >
          <i class="fas fa-chevron-left"></i> Anterior
        </button>
        <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
        <button 
          :disabled="currentPage === totalPages" 
          @click="currentPage++" 
          class="pagination-btn"
        >
          Siguiente <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    
    <!-- Sección de suscripción -->
    <div class="subscription-section">
      <h2>Suscríbete a nuestro Podcast</h2>
      <p>Recibe notificaciones cuando publiquemos nuevos episodios. Disponible en:</p>
      <div class="subscription-platforms">
        <a href="#" class="platform-link">
          <i class="fab fa-spotify"></i> Spotify
        </a>
        <a href="#" class="platform-link">
          <i class="fab fa-apple"></i> Apple Podcasts
        </a>
        <a href="#" class="platform-link">
          <i class="fab fa-google"></i> Google Podcasts
        </a>
        <a href="#" class="platform-link">
          <i class="fas fa-rss"></i> RSS
        </a>
      </div>
    </div>
    
    <!-- Modal para compartir -->
    <div class="share-modal" v-if="showShareModal" @click="closeShareModal">
      <div class="modal-content" @click.stop>
        <span class="close-btn" @click="closeShareModal">&times;</span>
        <h3>Compartir episodio</h3>
        <p>{{ selectedEpisode.title }}</p>
        <div class="share-options">
          <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(getEpisodeUrl(selectedEpisode))" target="_blank" class="share-btn facebook">
            <i class="fab fa-facebook-f"></i> Facebook
          </a>
          <a :href="'https://twitter.com/intent/tweet?url=' + encodeURIComponent(getEpisodeUrl(selectedEpisode)) + '&text=' + encodeURIComponent('Escucha este episodio: ' + selectedEpisode.title)" target="_blank" class="share-btn twitter">
            <i class="fab fa-twitter"></i> Twitter
          </a>
          <a :href="'https://wa.me/?text=' + encodeURIComponent('Escucha este episodio: ' + selectedEpisode.title + ' ' + getEpisodeUrl(selectedEpisode))" target="_blank" class="share-btn whatsapp">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
          <button @click="copyToClipboard(getEpisodeUrl(selectedEpisode))" class="share-btn copy">
            <i class="fas fa-link"></i> Copiar enlace
          </button>
        </div>
        <div class="copy-message" v-if="linkCopied">¡Enlace copiado al portapapeles!</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PodcastPage",
  data() {
    return {
      episodes: [
        {
          id: 1,
          number: "001",
          title: "La importancia de la oración en tiempos difíciles",
          date: new Date("2024-05-02"),
          description: "En esta homilía dominical, el Padre Martin reflexiona sobre cómo la oración nos sostiene durante los momentos de prueba y dificultad en nuestras vidas.",
          audioUrl: "/audios/homilia-20240502.mp3", // Esta ruta deberá ajustarse según tu estructura
          duration: 1840, // duración en segundos (30:40)
          tags: ["Homilía", "Oración", "Tiempo Ordinario"]
        },
        {
          id: 2,
          number: "002",
          title: "Reflexión sobre la Virgen del Carmen",
          date: new Date("2024-04-25"),
          description: "Una meditación especial sobre la devoción a Nuestra Señora del Carmen y su importancia en la vida espiritual de los fieles.",
          audioUrl: "/audios/reflexion-virgen-carmen.mp3",
          duration: 1260, // 21:00
          tags: ["Reflexión", "Virgen María", "Devoción"]
        },
        {
          id: 3,
          number: "003",
          title: "El sacramento de la Reconciliación",
          date: new Date("2024-04-18"),
          description: "Enseñanza sobre el sacramento de la Reconciliación, su importancia y cómo prepararnos adecuadamente para recibir este sacramento.",
          audioUrl: "/audios/ensenanza-reconciliacion.mp3",
          duration: 2340, // 39:00
          tags: ["Enseñanza", "Sacramentos", "Reconciliación"]
        },
        {
          id: 4,
          number: "004",
          title: "Homilía del Domingo de Ramos",
          date: new Date("2024-04-11"),
          description: "Reflexión sobre la entrada triunfal de Jesús en Jerusalén y el inicio de la Semana Santa.",
          audioUrl: "/audios/homilia-ramos.mp3",
          duration: 1560, // 26:00
          tags: ["Homilía", "Semana Santa", "Domingo de Ramos"]
        },
        {
          id: 5,
          number: "005",
          title: "La familia como iglesia doméstica",
          date: new Date("2024-04-04"),
          description: "Reflexión sobre el papel fundamental de la familia como primera comunidad de fe y amor, donde se vive y transmite el Evangelio.",
          audioUrl: "/audios/familia-iglesia-domestica.mp3",
          duration: 1980, // 33:00
          tags: ["Enseñanza", "Familia", "Evangelización"]
        }
      ],
      filteredEpisodes: [],
      searchTerm: '',
      selectedCategory: '',
      currentPage: 1,
      itemsPerPage: 6,
      showShareModal: false,
      selectedEpisode: null,
      linkCopied: false
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredEpisodes.length / this.itemsPerPage);
    },
    paginatedEpisodes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredEpisodes.slice(start, end);
    }
  },
  created() {
    this.filteredEpisodes = [...this.episodes];
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    truncateText(text, maxLength) {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + '...';
    },
    filterEpisodes() {
      if (!this.searchTerm.trim() && !this.selectedCategory) {
        this.filteredEpisodes = [...this.episodes];
        return;
      }
      
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredEpisodes = this.episodes.filter(episode => {
        const matchesSearch = !term || 
          episode.title.toLowerCase().includes(term) || 
          episode.description.toLowerCase().includes(term) ||
          episode.tags.some(tag => tag.toLowerCase().includes(term));
        
        const matchesCategory = !this.selectedCategory || 
          episode.tags.includes(this.selectedCategory);
        
        return matchesSearch && matchesCategory;
      });
      
      this.currentPage = 1;
    },
    resetSearch() {
      this.searchTerm = '';
      this.selectedCategory = '';
      this.filteredEpisodes = [...this.episodes];
    },
    downloadEpisode(episode) {
      // Crear un enlace temporal para la descarga
      const link = document.createElement('a');
      link.href = episode.audioUrl;
      link.download = `${episode.title.replace(/\s+/g, '-').toLowerCase()}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    shareEpisode(episode) {
      this.selectedEpisode = episode;
      this.showShareModal = true;
      this.linkCopied = false;
    },
    closeShareModal() {
      this.showShareModal = false;
      this.selectedEpisode = null;
    },
    getEpisodeUrl(episode) {
      // Aquí deberías generar la URL completa al episodio
      return `https://tuparroquia.com/podcast/${episode.id}`;
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.linkCopied = true;
        setTimeout(() => {
          this.linkCopied = false;
        }, 3000);
      });
    }
  }
};
</script>

<style scoped>
.podcast-container {
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

/* Featured Episode */
.featured-episode {
  margin-bottom: 4rem;
}

.featured-episode h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
}

.featured-player {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .featured-player {
    flex-direction: row;
  }
}

.episode-info {
  padding: 2rem;
  flex: 1;
}

.episode-info h3 {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.episode-date {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.episode-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.episode-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1rem;
}

.tag {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.player-container {
  background-color: var(--primary-color);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  flex: 1;
}

.audio-player {
  width: 100%;
  margin-bottom: 1.5rem;
}

.player-controls {
  display: flex;
  gap: 15px;
}

.control-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* Episodes List */
.episodes-list {
  margin-bottom: 4rem;
}

.episodes-list h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .filter-section {
    flex-direction: row;
    justify-content: space-between;
  }
}

.search-box {
  position: relative;
  flex: 1;
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

.category-filter select {
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  background-color: white;
  min-width: 200px;
}

.category-filter select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.episodes-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .episodes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .episodes-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.episode-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.episode-card:hover {
  transform: translateY(-5px);
}

.episode-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  background-color: var(--primary-color);
  color: white;
}

.episode-number {
  font-weight: 600;
}

.episode-duration {
  font-size: 0.9rem;
}

.episode-title {
  padding: 15px 15px 5px;
  color: var(--primary-color);
  font-size: 1.2rem;
  margin: 0;
}

.episode-date {
  padding: 0 15px;
  color: #666;
  font-size: 0.85rem;
  margin: 0 0 10px;
}

.episode-description {
  padding: 0 15px;
  margin: 0 0 15px;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
}

.episode-card .audio-player {
  width: calc(100% - 30px);
  margin: 0 15px 15px;
}

.episode-footer {
  padding: 0 15px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.episode-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

/* No Results */
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

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 2rem;
}

.pagination-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #666;
}

/* Subscription Section */
.subscription-section {
  background-color: var(--secondary-color);
  padding: 3rem;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 3rem;
}

.subscription-section h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.subscription-section p {
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.subscription-platforms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.platform-link {
  background-color: white;
  color: var(--primary-color);
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.platform-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Share Modal */
.share-modal {
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
  max-width: 500px;
  padding: 2rem;
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
}

.close-btn:hover {
  color: #333;
}

.modal-content h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.modal-content p {
  margin-bottom: 1.5rem;
  color: #666;
}

.share-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.share-btn {
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;
}

.share-btn:hover {
  opacity: 0.9;
}

.facebook {
  background-color: #3b5998;
}

.twitter {
  background-color: #1da1f2;
}

.whatsapp {
  background-color: #25d366;
}

.copy {
  background-color: #6c757d;
  border: none;
}

.copy-message {
  margin-top: 15px;
  text-align: center;
  color: #28a745;
  font-weight: 500;
}

@media (max-width: 767px) {
  .share-options {
    grid-template-columns: 1fr;
  }
}
</style>