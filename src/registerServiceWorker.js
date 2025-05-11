/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'La aplicación está siendo servida desde caché por un service worker.\n' +
        'Para más detalles, visita https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker ha sido registrado.')
    },
    cached () {
      console.log('El contenido ha sido cacheado para uso offline.')
    },
    updatefound () {
      console.log('Descargando nuevo contenido.')
    },
    updated () {
      console.log('Nuevo contenido disponible; por favor actualiza la página.')
      // Aquí puedes mostrar una notificación al usuario para que actualice
      const updateNotification = document.createElement('div');
      updateNotification.className = 'update-notification';
      updateNotification.innerHTML = `
        <div class="update-notification-content">
          <p>¡Hay una nueva versión disponible!</p>
          <button id="update-button">Actualizar ahora</button>
        </div>
      `;
      document.body.appendChild(updateNotification);
      
      document.getElementById('update-button').addEventListener('click', () => {
        window.location.reload();
      });
    },
    offline () {
      console.log('No hay conexión a internet. La aplicación está funcionando en modo offline.')
    },
    error (error) {
      console.error('Error durante el registro del service worker:', error)
    }
  })
}