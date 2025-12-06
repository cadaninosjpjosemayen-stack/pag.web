/* =======================================================
🚀 CONTROL DE PANEL SUPERIOR (Navegación del menú)
======================================================= */

const navItems = document.querySelectorAll(".top-nav .nav-item");
const paneles = document.querySelectorAll(".panel");

function mostrarPanel(id) {
  paneles.forEach(p => {
    p.classList.remove("active");
    p.hidden = true;
  });

  const panel = document.getElementById(id);
  if (panel) {
    panel.hidden = false;
    setTimeout(() => panel.classList.add("active"), 20);
  }
}

navItems.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.dataset.target;
    if (targetId) mostrarPanel(targetId);
  });
});

/* =======================================================
🚀 CONTROL SIDEBAR (Botones laterales)
======================================================= */

const botones = document.querySelectorAll(".acc-btn");

const map = {
  "historia": "historia",
  "jesús nazareno": "jesus-nazareno",
  "jesus nazareno": "jesus-nazareno",
  "señor sepultado": "senor-sepultado",
  "senor sepultado": "senor-sepultado",
  "jesús resucitado": "jesus-resucitado",
  "jesus resucitado": "jesus-resucitado"
};

botones.forEach(btn => {
  btn.addEventListener("click", () => {
    const texto = btn.textContent.trim().toLowerCase();
    const panelId = map[texto];
    if (panelId) mostrarPanel(panelId);
  });
});

/* =======================================================
🚀 GALERÍA DE IMÁGENES Y BOTÓN PRÓXIMAMENTE
======================================================= */

const imageInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const gallery = document.getElementById("gallery-container");
const uploadStatus = document.getElementById("uploadStatus");

// Array de imágenes con tus archivos reales
const imagenesGaleria = [
  'img/image1.jpeg',
  'img/iamge2.jpeg',
  'img/image3.jpeg',
  'img/iamge4.jpeg',
  'img/image5.jpeg',
  'img/image6.jpeg',
  'img/image7.jpeg',
  'img/image8.jpeg',
  'img/image9.jpeg'
];

let currentImageIndex = 0;

/* =======================================================
🚀 MODAL PARA VER IMÁGENES EN GRANDE CON NAVEGACIÓN
======================================================= */

// Crear modal dinámicamente
const modal = document.createElement('div');
modal.id = 'imageModal';
modal.style.cssText = `
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
`;

const modalImg = document.createElement('img');
modalImg.id = 'modalImage';
modalImg.style.cssText = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border: 3px solid var(--gold);
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(212, 175, 55, 0.5);
  transition: opacity 0.3s;
`;

const closeBtn = document.createElement('span');
closeBtn.innerHTML = '×';
closeBtn.style.cssText = `
  position: absolute;
  top: 20px;
  right: 40px;
  color: var(--gold);
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
  z-index: 1001;
`;

closeBtn.onmouseover = () => closeBtn.style.color = '#fff';
closeBtn.onmouseout = () => closeBtn.style.color = 'var(--gold)';

// Botón ANTERIOR
const prevBtn = document.createElement('button');
prevBtn.innerHTML = '❮';
prevBtn.style.cssText = `
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(212, 175, 55, 0.9);
  color: #000;
  border: none;
  font-size: 40px;
  padding: 15px 25px;
  cursor: pointer;
  border-radius: 5px;
  z-index: 1001;
  font-weight: bold;
  transition: background 0.3s;
`;
prevBtn.onmouseover = () => prevBtn.style.background = '#D4AF37';
prevBtn.onmouseout = () => prevBtn.style.background = 'rgba(212, 175, 55, 0.9)';

// Botón SIGUIENTE
const nextBtn = document.createElement('button');
nextBtn.innerHTML = '❯';
nextBtn.style.cssText = `
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(212, 175, 55, 0.9);
  color: #000;
  border: none;
  font-size: 40px;
  padding: 15px 25px;
  cursor: pointer;
  border-radius: 5px;
  z-index: 1001;
  font-weight: bold;
  transition: background 0.3s;
`;
nextBtn.onmouseover = () => nextBtn.style.background = '#D4AF37';
nextBtn.onmouseout = () => nextBtn.style.background = 'rgba(212, 175, 55, 0.9)';

// Contador
const counter = document.createElement('div');
counter.id = 'imageCounter';
counter.style.cssText = `
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--gold);
  font-size: 20px;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 25px;
  border-radius: 25px;
  z-index: 1001;
`;

modal.appendChild(modalImg);
modal.appendChild(closeBtn);
modal.appendChild(prevBtn);
modal.appendChild(nextBtn);
modal.appendChild(counter);
document.body.appendChild(modal);

// Función para cambiar imagen
function cambiarImagen(direction) {
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = imagenesGaleria.length - 1;
  } else if (currentImageIndex >= imagenesGaleria.length) {
    currentImageIndex = 0;
  }
  
  modalImg.style.opacity = '0';
  setTimeout(() => {
    modalImg.src = imagenesGaleria[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${imagenesGaleria.length}`;
    modalImg.style.opacity = '1';
  }, 200);
}

// Eventos de los botones
prevBtn.onclick = (e) => {
  e.stopPropagation();
  cambiarImagen(-1);
};

nextBtn.onclick = (e) => {
  e.stopPropagation();
  cambiarImagen(1);
};

// Cerrar modal
function cerrarModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

modal.onclick = cerrarModal;
closeBtn.onclick = cerrarModal;

// Prevenir que el clic en la imagen cierre el modal
modalImg.onclick = (e) => e.stopPropagation();

// Cerrar con ESC y navegar con flechas
document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block') {
    if (e.key === 'Escape') cerrarModal();
    if (e.key === 'ArrowLeft') cambiarImagen(-1);
    if (e.key === 'ArrowRight') cambiarImagen(1);
  }
});

// Crear galería
function crearGaleria() {
  if (!gallery) return;
  
  gallery.innerHTML = '';
  
  imagenesGaleria.forEach((src, index) => {
    const div = document.createElement("div");
    div.classList.add("gallery-item");
    div.style.cursor = 'pointer';
    
    const img = document.createElement("img");
    img.classList.add("uploaded-img");
    img.src = src;
    img.alt = "Imagen de la hermandad " + (index + 1);
    
    img.onload = function() {
      img.style.opacity = "0";
      setTimeout(function() {
        img.style.transition = "opacity 0.5s";
        img.style.opacity = "1";
      }, index * 100);
    };
    
    // Si la imagen no carga, mostrar mensaje
    img.onerror = function() {
      div.innerHTML = '<p style="color: var(--gold); text-align: center; padding: 20px;">Imagen no disponible</p>';
    };
    
    // Click para abrir modal
    div.onclick = function() {
      currentImageIndex = index;
      modal.style.display = 'block';
      modalImg.src = src;
      counter.textContent = `${currentImageIndex + 1} / ${imagenesGaleria.length}`;
      document.body.style.overflow = 'hidden';
    };
    
    div.appendChild(img);
    gallery.appendChild(div);
  });
}

// Botón próximamente
if (uploadBtn && imageInput) {
  uploadBtn.addEventListener("click", function() {
    uploadStatus.textContent = "🔜 Función próximamente disponible";
    uploadStatus.style.color = "#feca57";
    uploadStatus.style.fontSize = "1rem";
    uploadStatus.style.fontWeight = "bold";
    
    imageInput.value = '';
    
    setTimeout(function() {
      uploadStatus.textContent = "";
    }, 3000);
  });
}

// Iniciar galería
if (gallery) {
  crearGaleria();
}