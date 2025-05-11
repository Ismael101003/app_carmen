<template>
  <div v-if="showInstallPrompt" class="install-prompt">
    <div class="install-content">
      <div class="install-icon">
        <i class="fas fa-download"></i>
      </div>
      <div class="install-text">
        <h3>Instala nuestra aplicación</h3>
        <p>Accede más rápido y recibe notificaciones de eventos importantes</p>
      </div>
      <button @click="installPWA" class="install-button">Instalar</button>
      <button @click="closePrompt" class="close-button">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InstallPWA',
  data() {
    return {
      deferredPrompt: null,
      showInstallPrompt: false
    }
  },
  mounted() {
    // Escuchar el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevenir que Chrome muestre la mini-infobar
      e.preventDefault();
      // Guardar el evento para usarlo más tarde
      this.deferredPrompt = e;
      // Verificar si ya se ha mostrado el prompt antes
      const hasShownPrompt = localStorage.getItem('pwaPromptShown');
      if (!hasShownPrompt) {
        // Mostrar nuestro propio prompt
        this.showInstallPrompt = true;
      }
    });

    // Escuchar el evento appinstalled
    window.addEventListener('appinstalled', () => {
      // Ocultar nuestro prompt de instalación
      this.showInstallPrompt = false;
      // Limpiar el deferredPrompt
      this.deferredPrompt = null;
      // Registrar que la app fue instalada
      console.log('PWA fue instalada');
    });
  },
  methods: {
    async installPWA() {
      if (!this.deferredPrompt) {
        return;
      }
      // Mostrar el prompt de instalación
      this.deferredPrompt.prompt();
      // Esperar a que el usuario responda al prompt
      const { outcome } = await this.deferredPrompt.userChoice;
      // Registrar la respuesta del usuario
      console.log(`Usuario respondió al prompt de instalación: ${outcome}`);
      // Limpiar el deferredPrompt
      this.deferredPrompt = null;
      // Ocultar nuestro prompt
      this.showInstallPrompt = false;
      // Guardar en localStorage que ya se mostró el prompt
      localStorage.setItem('pwaPromptShown', 'true');
    },
    closePrompt() {
      this.showInstallPrompt = false;
      // Guardar en localStorage que el usuario cerró el prompt
      // Podemos mostrar de nuevo después de un tiempo
      const now = new Date().getTime();
      localStorage.setItem('pwaPromptDismissed', now.toString());
    }
  }
}
</script>

<style scoped>
.install-prompt {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 1000;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.install-content {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  align-items: center;
  position: relative;
}

.install-icon {
  background-color: var(--primary-color);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.install-icon i {
  font-size: 24px;
}

.install-text {
  flex-grow: 1;
}

.install-text h3 {
  margin: 0 0 5px;
  color: var(--primary-color);
  font-size: 1.2rem;
}

.install-text p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.install-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 15px;
  transition: background-color 0.3s;
}

.install-button:hover {
  background-color: var(--accent-color);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
}

.close-button:hover {
  color: #333;
}

@media (min-width: 768px) {
  .install-prompt {
    max-width: 500px;
    left: 20px;
    right: auto;
  }
}
</style>