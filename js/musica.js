const detenerMusicaBtn = document.getElementById("detener-musica");
const musicaFondo = document.getElementById("musica-fondo");
const botonImagen = document.getElementById("boton-imagen");

detenerMusicaBtn.addEventListener("click", () => {
  if (!musicaFondo.paused) {
    musicaFondo.pause();
    botonImagen.src = "../img/musica.png";
    botonImagen.alt = "Reproducir música";
  } else {
    musicaFondo.play();
    botonImagen.src = "../img/musica.png";
    botonImagen.alt = "Detener música";
  }
});

// Reproducir música de fondo automáticamente al cargar la página
window.addEventListener("load", () => {
  musicaFondo.play();
  botonImagen.src = "../img/musica.png";
  botonImagen.alt = "Detener música";
});