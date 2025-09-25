# World Game App → Find the city

## Iniciar proyecto en local:

    • Descargar o clonar el repositorio
    • Acceder al directorio donde se ha almacenado la descarga
    • Instalar las dependencias con `npm install`
    • Utilizar `npm run dev` para iniciar el proyecto

## Qué se ha realizado:

    • Desarrollo completo del juego utilizando Leaflet para la gestión del mapa y sus eventos.
    • Inclusión de las posiciones de las capitales a partir del JSON proporcionado.
    • Uso de un GeoJSON para cargar la información en el mapa.
    • Implementación de la fórmula de Haversine para calcular distancias entre coordenadas.
    • Aplicación de un enfoque de programación funcional.
    • Implementación de una modal para brindar feedback al usuario.
    • No se ha utilizado ningún framework de CSS (reduciendo la carga).
    • Validaciones preliminares para el futuro backend: el nombre de usuario debe tener entre 3 y 16 caracteres, no incluir espacios en blanco y no ser “localPlayer” (nombre por defecto utilizado en el sistema).

## Pruebas realizadas

He probado el juego de manera nativa en los siguientes navegadores:
    • Brave
    • Chrome
    • Firefox
    • Safari
    • Opera
    
Además, he utilizado https://www.browserling.com/ para realizar un doble chequeo e incluir:
    • Vivaldi
    • Edge
    • Tor

## Qué se mejoraría:

    • Incluir una sección “Cómo se juega” (no está en esta versión, pero podría añadirse en próximas).
    • Desarrollar un backend para gestionar las 10 puntuaciones más altas y permitir su visualización desde cualquier dispositivo.
    • Mejorar el icono que muestra la posición de la ciudad.
    • Optimizar el posicionamiento de los nombres de los países: actualmente, con turf, en países con polígonos muy extensos el nombre aparece en el centro del polígono y no del país. Aunque se ha resuelto que no aparezcan en océanos, no siempre se ubican en el centro del territorio.

## Gestión de puntuaciones:

Actualmente he implementado localStorage para que las puntuaciones se conserven a nivel local incluso tras recargar la app o volver a acceder más tarde.
Para el manejo global de puntuaciones, propondría un backend a medida con alguna de estas opciones:
    • Almacenamiento en un JSON, actualizando solo cuando una nueva puntuación supere a las existentes.
    • Implementar una base de datos con los campos username, score, date, limitando el número de registros.

## Extras incluidos:

    • Sección de settings para activar o desactivar los nombres de los países (modo difícil).
    • Posibilidad de habilitar/deshabilitar el modo online (actualmente no disponible, pero sería un backend sencillo para actualizar la lista de puntuaciones).
    • Visualización de los 10 scores más altos, almacenados en localStorage para que persistan incluso tras recargar la página, con un botón adicional para vaciar la lista.
