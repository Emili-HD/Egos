// plugins/device-classes.client.js
import { defineNuxtPlugin } from '#app'

// Función para agregar clases al body
const updateBodyClasses = (device) => {
  const { isMobile, isDesktop, isIOS, isAndroid, isMacOS, isWindows, isChrome, isFirefox } = device

  // Función para detectar si la resolución corresponde a una tablet común
  const isCommonTabletResolution = () => {
    const tabletResolutions = [
      { width: 768, height: 1024 },
      { width: 800, height: 1280 },
      { width: 810, height: 1080 },
      { width: 600, height: 960 },
      { width: 800, height: 1334 },
      { width: 820, height: 1180 },
      { width: 1024, height: 1336 },
    ]

    return tabletResolutions.some(res => 
      (window.innerWidth === res.width && window.innerHeight === res.height) ||
      (window.innerWidth === res.height && window.innerHeight === res.width)
    )
  }

  // Función para detectar iPad Pro específicamente
  const isIpadPro = () => {
    const userAgent = navigator.userAgent || window.opera
    const ipadProWidth = 1024
    const ipadProHeight = 1366

    return (
    //   userAgent.includes('iPad') &&
      ((window.innerWidth === ipadProWidth && window.innerHeight === ipadProHeight) ||
       (window.innerWidth === ipadProHeight && window.innerHeight === ipadProWidth))
    )
  }

  // Función para detectar si es tablet
  const isTablet = () => {
    return isIpadPro() || isCommonTabletResolution()
  }

  // Crear una lista de clases basadas en la información del dispositivo
  const classes = [
    isMobile ? 'is-mobile' : '',
    isTablet() ? 'is-tablet' : '',
    isDesktop ? 'is-desktop' : '',
    isIOS ? 'is-ios' : '',
    isAndroid ? 'is-android' : '',
    isMacOS ? 'is-macos' : '',
    isWindows ? 'is-windows' : '',
    isChrome ? 'is-chrome' : '',
    isFirefox ? 'is-firefox' : '',
    isIpadPro() ? 'is-ipad-pro' : ''
  ].filter(Boolean).join(' ')

  const body = document.body
  body.className = classes // Reemplaza las clases en lugar de añadirlas
}

export default defineNuxtPlugin((nuxtApp) => {
  const { $device } = nuxtApp

  if (import.meta.env.SSR === false) { // Verifica si está en el cliente
    // Inicializar las clases del body
    updateBodyClasses($device)

    // Añadir event listener para cambios de tamaño de la ventana
    const handleResize = () => {
      updateBodyClasses($device)
    }

    window.addEventListener('resize', handleResize)

    // Limpiar el event listener cuando se desmonte el componente
    nuxtApp.hook('app:unmount', () => {
      window.removeEventListener('resize', handleResize)
    })
  }
})
