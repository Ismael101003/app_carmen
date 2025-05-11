// vue.config.js
module.exports = {
  pwa: {
    name: 'Parroquia Nuestra Señora del Carmen',
    themeColor: '#8B5A2B',
    msTileColor: '#8B5A2B',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: 'index.html',
      // Archivos a cachear para acceso offline
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://i.postimg.cc/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
            }
          }
        },
        {
          urlPattern: new RegExp('/audios/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'audio-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 7 * 24 * 60 * 60 // 7 días
            }
          }
        }
      ]
    },
    // Configuración del manifest.json
    manifestOptions: {
      name: 'Parroquia Nuestra Señora del Carmen',
      short_name: 'Parroquia Carmen',
      description: 'Sitio web oficial de la Parroquia Nuestra Señora del Carmen',
      start_url: '/',
      display: 'standalone',
      background_color: '#F5F5DC',
      theme_color: '#8B5A2B',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: './img/icons/android-chrome-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  }
}