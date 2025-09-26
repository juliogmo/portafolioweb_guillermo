import {  Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  // --------- Texto con efecto máquina ---------
  fullText: string = 'Ingeniero en Desarrollo y Gestión de Software'; // Texto completo a mostrar
  displayText: string = ''; // Texto que se va mostrando letra por letra

  private index = 0; // Índice actual del texto
  private isDeleting = false; // Si estamos borrando
  private typingInterval: any; // Intervalo de escritura

  private typingSpeed = 100;   // Velocidad de escritura por letra (ms)
  private deletingSpeed = 50;  // Velocidad de borrado por letra (ms)
  private pauseTime = 1000;    // Pausa al terminar de escribir o borrar (ms)

  // --------- Canvas hacker / Matrix ---------
  private animationFrameId: number = 0; // ID de la animación para cancelarla

  constructor(private cdr: ChangeDetectorRef) {}

  // Se ejecuta al inicializar el componente
  ngOnInit() {
    this.startTyping();       // Inicia animación de escritura
    this.startMatrixEffect(); // Inicia animación del canvas hacker
  }

  // Se ejecuta al destruir el componente
  ngOnDestroy() {
    clearInterval(this.typingInterval); // Limpia el intervalo de escritura
    cancelAnimationFrame(this.animationFrameId); // Detiene la animación del canvas
  }

  // --------- Función para el efecto escritura ---------
  private startTyping() {
    this.typingInterval = setInterval(() => {
      const current = this.fullText;

      // Si estamos borrando, reducimos el índice
      if (this.isDeleting) {
        this.displayText = current.substring(0, this.index--);
      } else { // Si estamos escribiendo, aumentamos el índice
        this.displayText = current.substring(0, this.index++);
      }

      // Forzamos que Angular detecte cambios en cada letra
      this.cdr.detectChanges();

      // Cuando termina de escribir todo el texto
      if (!this.isDeleting && this.index === current.length + 1) {
        clearInterval(this.typingInterval); // Detenemos temporalmente el intervalo
        setTimeout(() => {
          this.isDeleting = true; // Activamos borrado
          this.startTyping();     // Reiniciamos animación
        }, this.pauseTime);       // Esperamos pausa antes de borrar
      }

      // Cuando termina de borrar todo
      if (this.isDeleting && this.index < 0) {
        clearInterval(this.typingInterval); // Detenemos temporalmente
        setTimeout(() => {
          this.isDeleting = false; // Activamos escritura
          this.index = 0;           // Reiniciamos índice
          this.startTyping();       // Reiniciamos animación
        }, this.pauseTime);         // Esperamos pausa antes de escribir
      }
    }, this.isDeleting ? this.deletingSpeed : this.typingSpeed); // Velocidad depende si se borra o escribe
  }

  // --------- Función para el fondo hacker / Matrix ---------
  private startMatrixEffect() {
  // Obtenemos el canvas por su ID
  const canvas = document.getElementById('hackerCanvas') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Ajustamos canvas al tamaño de la ventana
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Letras disponibles
  const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';//
  const fontSize = 15;
  const columns = Math.floor(canvas.width / fontSize);
  const drops: number[] = Array(columns).fill(1);

  let frameCounter = 0; // Contador de frames para reducir velocidad

  const draw = () => {
    frameCounter++;

    // Dibujamos solo cada 2 frames (ajusta este número para más o menos velocidad)
    if (frameCounter % 2 === 0) {
      // Fondo casi transparente, no tapa la imagen
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Letras cian/neón
      ctx.fillStyle = 'rgba(68, 255, 0, 1)';
      ctx.font = fontSize + 'px monospace';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;

      for (let i = 0; i < drops.length; i++) {
        // Elegimos letra aleatoria
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Velocidad de caída reducida
        drops[i] += 1;

        // Reiniciar letra cuando llega al fondo, con menor frecuencia
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.995) {
          drops[i] = 0;
        }
      }
    }

    // Llamada recursiva para animación
    this.animationFrameId = requestAnimationFrame(draw);
  };

  draw();

  // Redimensionar canvas automáticamente si cambia tamaño de ventana
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
}