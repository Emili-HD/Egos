# REGISTRO DE CAMBIOS

## [0.19.1] (12-04-2024)
### Cambios
* Añadido CHANGELOG.md para seguimiento del equipo

## [0.19.0] (12-04-2024)
### Nuevas Características
* Añadido el módulo viewport para discriminar qué partes se renderizan en cada dispositivo para optimizar la carga de la página

### Mejoras
* División de la navegación en componentes
* 'HeaderBrand' - Logo, link a home
* 'NavPrimary' - Navegación principal
* 'NavSecondary' - Botón de pedir cita y preparado para contener una navegación alternativa a páginas
* 'Logros' - Ahora es un componente. Los svg ahora son NuxtImg
* Mejora del tamaño de las tipografías en algunos dispositivos

### Cambios
* Actualización de módulos
* Nueva página "Gracias" para redirigir cuando se envía un formulario
* Cambio de favicon.ico
* Ahora se muestran los precios en los 'cards' de cirugías en la home
* Ahora los precios incluídos en las landings se pueden mostrar como "€/día", "€/mes" o "desde"
* Botón 'Cita' ahora sólo se renderiza en dispositivos móbiles en vez de ocultar/mostrar
* 'ElementsLogros' sólo se renderiza en desktop en cada submenú
* Añadido formulario en página 'casos-reales'

## [0.18.0] (09-04-2024)
## Cambios
* Nueva página para cada 'doctor'
* Añadido componente 'reviews' a cada doctor
* Añadido Google Recaptcha
* Ahora se puede enviar reseñas desde un formulario en la página 'doctor' de nuxt a wp-headless
* Actualización del sitemap.xml para que recoja el listado de doctores
* Añadidos micro datos en landings

## Mejoras
* Añadida funcionalidad para admitir vídeos de youtube
* Añadido plugins/intersect para cargar vídeos sólo cuando es necesario y mejorar carga
* Añadido timestamp a las consultas useFetch para control de cache
* Añadido cache-control.js
