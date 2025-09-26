import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ia.html',
  styleUrls: ['./ia.css']
})
export class Ia {
  @ViewChild('grid', { static: false }) grid!: ElementRef;

  proyectos = [
    {
      titulo: 'Predicciones de Ventas',
      fecha: '2025',
      imagen: 'https://www.solofondos.com/wp-content/uploads/2015/11/fondos-de-pantalla-para-paginas-web-colores-claros-768x482.jpg',
      objetivo: 'IA para predicciones de ventas usando modelos ML.',
      tecnologias: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib'],
      imagenes: [
        { url: 'https://www.solofondos.com/wp-content/uploads/2015/11/fondos-de-pantalla-para-paginas-web-colores-claros-768x482.jpg', desc: 'Predicción de ventas por región' },
        { url: 'https://www.solofondos.com/wp-content/uploads/2015/11/fondos-de-pantalla-para-paginas-web-colores-claros-768x482.jpg', desc: 'Visualización de resultados' }
      ]
    }
  ];

  showModal = false;
  selectedProyecto: any = null;
  currentSlide = 0;

  abrirModal(proyecto: any) {
    this.selectedProyecto = proyecto;
    this.currentSlide = 0;
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.selectedProyecto = null;
  }

  prevSlide() {
    if (!this.selectedProyecto) return;
    this.currentSlide =
      (this.currentSlide - 1 + this.selectedProyecto.imagenes.length) %
      this.selectedProyecto.imagenes.length;
  }

  nextSlide() {
    if (!this.selectedProyecto) return;
    this.currentSlide =
      (this.currentSlide + 1) % this.selectedProyecto.imagenes.length;
  }

  scrollNext() {
    this.grid.nativeElement.scrollBy({ left: 340, behavior: 'smooth' });
  }

  scrollPrev() {
    this.grid.nativeElement.scrollBy({ left: -340, behavior: 'smooth' });
  }

  getTechIcon(tech: string): string {
    const icons: Record<string, string> = {
      Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'scikit-learn': 'https://raw.githubusercontent.com/scikit-learn/scikit-learn/main/doc/logos/scikit-learn-logo.png',
      Pandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
      Matplotlib: 'https://matplotlib.org/stable/_static/logo2.svg'
    };
    return icons[tech] || 'https://cdn-icons-png.flaticon.com/512/565/565547.png';
  }
}

