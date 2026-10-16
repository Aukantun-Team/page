# AUKANTUN — GitHub Pages

Página completa en español, lista para publicar. Incluye el diseño morado, negro y blanco, fondo animado, menú, pestañas internas, redes sociales, BioteCard, feedback, equipo y contacto.

Es un sitio estático en HTML, CSS y JavaScript: no necesita Node.js, npm ni un paso de compilación.

## Publicar desde la web de GitHub

1. Descomprime `aukantun-github-pages.zip`.
2. Crea o abre el repositorio donde quieras publicar la página.
3. En **Add file → Upload files**, sube el contenido descomprimido y confirma el commit. `index.html`, `styles.css`, `app.js` y la carpeta `assets` deben quedar directamente en la raíz del repositorio. No subas el ZIP ni dejes `index.html` dentro de otra carpeta.
4. Abre **Settings → Pages**.
5. En **Build and deployment → Source**, elige **Deploy from a branch**.
6. Selecciona la rama que contiene los archivos, normalmente **main**, y la carpeta **/(root)**. Pulsa **Save**.
7. Espera a que finalice la publicación y abre el enlace que muestra GitHub Pages.

El archivo `.nojekyll` viene incluido para servir directamente los archivos estáticos. Si tu selector de archivos lo oculta, puedes crearlo como un archivo vacío con ese nombre en la raíz del repositorio.

La dirección habitual será `https://TU-USUARIO.github.io/TU-REPOSITORIO/`. Las rutas de imágenes, fuentes, CSS y JavaScript son relativas, por lo que funcionan tanto en un repositorio de proyecto como en un dominio propio.

Documentación oficial: https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Contenido

| Archivo o carpeta | Función |
| --- | --- |
| `index.html` | Portada, menú y contenido de las secciones. |
| `styles.css` | Estética, adaptación a móviles y animaciones. |
| `app.js` | Menú, pestañas, teclado y control de movimiento. |
| `assets/` | Logos, fuentes locales y licencia de las fuentes. |
| `.nojekyll` | Publicación estática directa. |
| `ASSETS.md` | Procedencia de los recursos y fuentes del contenido. |

## Secciones incluidas

- **Nosotros:** descripción del equipo y sus cuatro integrantes.
- **Redes sociales:** Instagram, TikTok y YouTube.
- **Proyectos:** BioteCard y próximas ideas.
- **Feedback:** enlace a https://aukantun.framer.website.
- **Contacto:** Instagram y kitunteam@gmail.com.
- **Pie:** © 2026 Aukantun Team · Powered by RAVEN | プログラム.

## Modificar y actualizar

Edita `index.html` para cambiar textos y enlaces, `styles.css` para modificar la apariencia y `app.js` para cambiar las interacciones. Sube los archivos actualizados a la misma rama; GitHub Pages publicará los cambios.

Puedes abrir `index.html` directamente para revisar la página en tu navegador. Todas las imágenes y fuentes están incluidas. Los enlaces externos necesitan conexión a Internet.

## Interacciones

- Flechas para seleccionar opciones del menú; Inicio/Fin para saltar al inicio o final.
- Enter activa la opción enfocada.
- En las pestañas internas, las flechas izquierda y derecha cambian de sección.
- Escape o Volver cierra el panel.
- El botón de animación pausa o reanuda el fondo y recuerda la preferencia localmente.
- Se respeta la preferencia de movimiento reducido del sistema.
