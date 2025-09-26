import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-web',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './web.html',
  styleUrls: ['./web.css']
})
export class Web implements AfterViewInit, OnDestroy {
  @ViewChild('grid', { static: true }) gridRef!: ElementRef<HTMLDivElement>;

  // Modals / carousel
  showTechModal = false;
  showDetailModal = false;
  tecnologiasModal: string[] = [];
  selectedProyecto: any = null;
  currentSlide = 0;

  // resize observer similar al componente profesionales para visibleIndex (opcional)
  private resizeObserver: any;
  visibleIndex = 0;

  ngAfterViewInit() {
    this.observeResize();
  }
  ngOnDestroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  openTechModal(tecs: string[]) {
    this.tecnologiasModal = tecs;
    this.showTechModal = true;
  }
  closeTechModal() { this.showTechModal = false; }

  abrirDetalle(p: any) {
    this.selectedProyecto = p;
    this.currentSlide = 0;
    this.showDetailModal = true;
  }
  cerrarDetalle() {
    this.showDetailModal = false;
    this.selectedProyecto = null;
    this.currentSlide = 0;
  }
  prevSlide() {
    if (!this.selectedProyecto) return;
    this.currentSlide = (this.currentSlide - 1 + this.selectedProyecto.imagenes.length) % this.selectedProyecto.imagenes.length;
  }
  nextSlide() {
    if (!this.selectedProyecto) return;
    this.currentSlide = (this.currentSlide + 1) % this.selectedProyecto.imagenes.length;
  }

  // Carrusel: mover por tarjeta exacta
  scrollNext() {
    const el = this.gridRef.nativeElement;
    const first = el.querySelector('.project-card') as HTMLElement;
    if (!first) return;
    const gap = this.getGap(el);
    const cardWidth = first.clientWidth + gap;
    el.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
  scrollPrev() {
    const el = this.gridRef.nativeElement;
    const first = el.querySelector('.project-card') as HTMLElement;
    if (!first) return;
    const gap = this.getGap(el);
    const cardWidth = first.clientWidth + gap;
    el.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  }
  private getGap(el: HTMLElement) {
    const style = getComputedStyle(el);
    // fallback gap value
    const gap = parseFloat(style.getPropertyValue('gap')) || 20;
    return gap;
  }

  private observeResize() {
    const el = this.gridRef.nativeElement;
    this.resizeObserver = new ResizeObserver(() => {
      const children = Array.from(el.children) as HTMLElement[];
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((c, i) => {
        const rect = c.getBoundingClientRect();
        const center = rect.left + rect.width / 2 + el.scrollLeft - el.getBoundingClientRect().left;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      this.visibleIndex = best;
    });
    this.resizeObserver.observe(el);
  }

  // getTechIcon (misma mapping que usas; copia/pega la versión completa)
  getTechIcon(name: string) {
    const key = (name || '').toLowerCase();
    const map: any = {
    // ✅ Con icono en devicon
  'angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'sql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'unity': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
  'figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'css': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'ionic': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg',
  'firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'android studio': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg',
  'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'nest.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
  'fastapi': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'github actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'tensorflow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',

  // ❌ Sin icono en devicon (usa fallback)
  'servicenow': 'https://companieslogo.com/img/orig/NOW-6d5a01eb.png?t=1647966832',
  'workflows': 'https://cdn-icons-png.flaticon.com/512/12450/12450714.png',
  'ng2charts': 'https://th.bing.com/th/id/R.ed2f373e10b05199cfbc134da918f167?rik=3IdcJi%2fmVIuh6Q&riu=http%3a%2f%2fwww.chartjs.org%2fimg%2fchartjs-logo.svg&ehk=%2buADGAry2N%2fO%2biwQxzXH0FzQb8P4tqWWCHkLofou284%3d&risl=&pid=ImgRaw&r=0',
  'vite': 'https://logospng.org/download/vite-js/vite-js-4096-logo.png',
  'vercel': 'https://cdn.sanity.io/images/34ent8ly/production/223a29eb0698fb7fbc6d158a6f7e698d155e025f-824x824.png',
  'render': 'https://avatars.githubusercontent.com/u/42682871?s=280&v=4',
  'jwt': 'https://logodix.com/logo/1989689.png',
  'pwa': 'https://user-images.githubusercontent.com/3104648/28351989-7f68389e-6c4b-11e7-9bf2-e9fcd4977e7a.png',
  'ci/cd': 'https://miro.medium.com/v2/resize:fit:1000/1*nh_OKoFf6JynPmvOzpAzLQ.png',
  'postman': 'https://images.icon-icons.com/3053/PNG/512/postman_macos_bigsur_icon_189815.png',
  'jasmine': 'https://howtodoinjava.com/wp-content/uploads/2016/07/Jasmine-Logo.png',
  'jest': 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/jest-js-icon.png',
  'pandas': 'https://img.icons8.com/color/600/pandas.png',
  'keras': 'https://tse4.mm.bing.net/th/id/OIP.mczXtkESCH-kAmk6WSqocQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
  };
 
    return map[key] || 'assets/icons/fallback.svg';
  }

  // datos de ejemplo
  proyectos = [
    {
      titulo: 'QuickDineHub',
      descripcion: 'PWA de pedidos en línea para restaurantes.',
      tecnologias: ['Angular', 'Node.js', 'Express', 'Firebase', 'PWA'],
      github: 'https://github.com/tuusuario/quickdinehub',
      demo: 'https://quickdinehub.web.app',
      imagen: 'https://www.bing.com/th/id/OIP.m-sUac2RtjBjxZyF9M9zkwHaDt?w=337&h=211&c=8&rs=1&qlt=70&o=7&cb=thws5&pid=3.1&rm=3',
    },
    {
      titulo: 'Portfolio Web',
      descripcion: 'Sitio personal responsivo, deploy en Vercel.',
      tecnologias: ['Next.js', 'TypeScript', 'Vite', 'Vercel'],
      github: 'https://github.com/tuusuario/quickdinehub',
      demo: 'https://quickdinehub.web.app',
      imagen: 'https://th.bing.com/th/id/R.a243c72be94e93f1399f3399b06c7677?rik=hrhQ9%2b%2fJ1SSPHA&riu=http%3a%2f%2fwww.riskmanagementmonitor.com%2fwp-content%2fuploads%2f2014%2f12%2fLaptop1.jpg&ehk=OfidPRNnM1a1JERcjUs9J725LwV1tT7YdUTEmeAi5Gw%3d&risl=1&pid=ImgRaw&r=0',
    },
     {
      titulo: 'Portfolio Web',
      descripcion: 'Sitio personal responsivo, deploy en Vercel.',
      tecnologias: ['Next.js', 'TypeScript', 'Vite', 'Vercel'],
      github: 'https://github.com/tuusuario/quickdinehub',
      demo: 'https://quickdinehub.web.app',
      imagen: 'https://th.bing.com/th/id/R.a243c72be94e93f1399f3399b06c7677?rik=hrhQ9%2b%2fJ1SSPHA&riu=http%3a%2f%2fwww.riskmanagementmonitor.com%2fwp-content%2fuploads%2f2014%2f12%2fLaptop1.jpg&ehk=OfidPRNnM1a1JERcjUs9J725LwV1tT7YdUTEmeAi5Gw%3d&risl=1&pid=ImgRaw&r=0',
    },
     {
      titulo: 'Portfolio Web',
      descripcion: 'Sitio personal responsivo, deploy en Vercel.',
      tecnologias: ['Next.js', 'TypeScript', 'Vite', 'Vercel'],
      github: 'https://github.com/tuusuario/quickdinehub',
      demo: 'https://quickdinehub.web.app',
      imagen: 'https://th.bing.com/th/id/R.a243c72be94e93f1399f3399b06c7677?rik=hrhQ9%2b%2fJ1SSPHA&riu=http%3a%2f%2fwww.riskmanagementmonitor.com%2fwp-content%2fuploads%2f2014%2f12%2fLaptop1.jpg&ehk=OfidPRNnM1a1JERcjUs9J725LwV1tT7YdUTEmeAi5Gw%3d&risl=1&pid=ImgRaw&r=0',
    }
  ];
}
