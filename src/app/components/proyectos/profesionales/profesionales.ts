import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profesionales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profesionales.html',
  styleUrls: ['./profesionales.css']
})
export class Profesionales implements AfterViewInit, OnDestroy {
  @ViewChild('grid', { static: true }) gridRef!: ElementRef<HTMLDivElement>;

  showModal = false;
  selectedProyecto: any = null;
  currentSlide = 0;
  visibleIndex = 0;
  private resizeObserver: any;

  ngAfterViewInit() {
    this.observeResize();
  }

  ngOnDestroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  abrirModal(proyecto: any) {
    this.selectedProyecto = proyecto;
    this.showModal = true;
    this.currentSlide = 0;
  }

  cerrarModal() {
    this.showModal = false;
    this.selectedProyecto = null;
    this.currentSlide = 0;
  }

  prevSlide() {
    if (!this.selectedProyecto) return;
    this.currentSlide =
      (this.currentSlide - 1 + this.selectedProyecto.imagenes.length) % this.selectedProyecto.imagenes.length;
  }

  nextSlide() {
    if (!this.selectedProyecto) return;
    this.currentSlide =
      (this.currentSlide + 1) % this.selectedProyecto.imagenes.length;
  }

  scrollNext() {
    const el = this.gridRef.nativeElement;
    const cardWidth = this.gridRef.nativeElement.children[0].clientWidth + 22; // ancho tarjeta + gap
    el.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }

  scrollPrev() {
    const el = this.gridRef.nativeElement;
    const cardWidth = this.gridRef.nativeElement.children[0].clientWidth + 22;
    el.scrollBy({ left: -cardWidth, behavior: 'smooth' });
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

  getTechIcon(name: string) {
    const key = name.toLowerCase();
    const map: any = {
      // ✅ Con icono en devicon
      'azure db': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      'angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'node js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
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
      'next': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      'nest': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
      'fastapi': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
      'github actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      'github': 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
      'tensorflow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',

      // ❌ Sin icono en devicon (usa fallback)
      'sql server': 'https://img.icons8.com/color/512/microsoft-sql-server.png',
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
      'keras': 'https://tse4.mm.bing.net/th/id/OIP.mczXtkESCH-kAmk6WSqocQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      'jira': 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',

    };


    return map[key] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg';
  }


  onResize() { }
  proyectos = [
    {
      id: 1,
      titulo: 'Portal de Servicios - It Matters',
      imagen: 'assets/imgproyectos/itmatters/portal_inicio.png',
      empresa: 'CONSULTORA TI "ITMATTERS"',
      rol:'Desarrollador de Software',
      fecha: ' 08/01/2025 - 30/04/2025',
      objetivo: 'Se implementó un portal web en ServiceNow para la gestión de servicios internos e incidentes, '
        + 'con personalización de catálogos de servicio y automatización de procesos mediante workflows, '
        + 'además se desarrolló el frontend con Angular, JavaScript y CSS para mejorar la experiencia de usuario, '
        + 'y se integró la gestión de bases de datos SQL en Azure a través de JDBC para disponibilidad en tiempo real. '
        + 'También se configuró la autenticación con Azure Active Directory (SSO) para fortalecer la seguridad, '
        + 'se habilitó la trazabilidad de procesos críticos relacionados con soporte y monitoreo de sistemas, '
        + 'y se optimizó la productividad mediante la alineación con las mejores prácticas de TI.',
      imagenes: [
      { url: 'assets/imgproyectos/itmatters/portal_inicio.png', desc: 'Pantalla de inicio de portal de empleados' },
      { url: 'assets/imgproyectos/itmatters/Single_Sing_On.png', desc: 'Implementación de SSO' },
      { url: 'assets/imgproyectos/itmatters/catalogo_item.png', desc: 'Configuración de Catálogo de servicios (Demo)' },
      { url: 'assets/imgproyectos/itmatters/servicio.png', desc: 'Catálogo de Servicios (Demo)' },
      { url: 'assets/imgproyectos/itmatters/formulario_con_busqueda.png', desc: 'Formulario de registro de incidentes' },
      { url: 'assets/imgproyectos/itmatters/work_flows.png', desc: 'Uso de WorkFlows para automatización de tareas (Demo)' },
      { url: 'assets/imgproyectos/itmatters/workspace.png', desc: 'Agent Workspace para Gestión de tareas (Demo)' },
    ],
      tecnologias: ['Servicenow', 'Workflows', 'Angular', 'Github actions', 'Azure','Azure db']
    },
    {
      id: 2,
      titulo: 'Plataforma Delivery - QuickDineHub',
      imagen: 'assets/imgproyectos/quick/pagina_inicio.png',
      empresa: 'QuickDineHub',
      rol:'Desarrollador full-stack',
      fecha: ' 01/10/2023 -30/08/2024',
      objetivo: 'Se desarrolló la plataforma QuickDineHub, un sistema de delivery de comida con versión web y aplicación móvil híbrida, '
        + 'implementando un frontend en Angular y un backend con Node.js-Express, integrados con una base de datos NoSQL en MongoDB, '
        + 'además se diseñó una interfaz UI/UX responsiva en Figma, optimizada para diferentes dispositivos y resoluciones, '
        + 'y se implementó una aplicación móvil con Ionic junto con una Progressive Web App (PWA) para mayor accesibilidad, '
        + 'también se creó una app complementaria para dispositivos Wear OS, ampliando la experiencia del usuario, '
        + 'y se desarrollaron skills para Alexa que permiten interacción por voz con el sistema de pedidos, '
        + 'para la gestión del proyecto se utilizó Jira y se aplicó control de versiones con GitHub, '
        + 'todo bajo metodologías ágiles SCRUM y Kanban, utilizando herramientas de pruebas unitarias y automáticas como Jest, Jasmine y Postman.',
      imagenes: [
        { url: 'assets/imgproyectos/quick/pagina_inicio.png', desc: 'Página de Inicio' },
  { url: 'assets/imgproyectos/quick/login_restaurant.png', desc: 'Login por perfil' },
  { url: 'assets/imgproyectos/quick/catalogo_productos.png', desc: 'Catálogo de Productos (cliente)' },
  { url: 'assets/imgproyectos/quick/catalogo_restaurantes.png', desc: 'Catálogo de Restaurantes (cliente)' },
  { url: 'assets/imgproyectos/quick/ofertas.png', desc: 'Ofertas de productos' },
  { url: 'assets/imgproyectos/quick/Pedidos_recomendaciones.png', desc: 'Seguimiento de pedidos y Sistema de Recomendación' },
  { url: 'assets/imgproyectos/quick/carrito.png', desc: 'Carrito de Compras y métodos de pago' },
  { url: 'assets/imgproyectos/quick/formulario_productos.png', desc: 'Formulario de productos (Restaurante)' },
  { url: 'assets/imgproyectos/quick/formulario_ofertas.png', desc: 'Formulario de ofertas (Restaurante)' },
  { url: 'assets/imgproyectos/quick/ordenes.png', desc: 'Bandeja de Pedidos (Restaurante)' },
  { url: 'assets/imgproyectos/quick/inicio_ionic.jpg', desc: 'Login en App Móvil' },
  { url: 'assets/imgproyectos/quick/catalogo_ionic.jpg', desc: 'Catálogo de productos (Móvil)' },
  { url: 'assets/imgproyectos/quick/carrito_ionic.jpg', desc: 'Carrito de compras (Móvil)' },
  { url: 'assets/imgproyectos/quick/mis_pedidos_ionic.jpg', desc: 'Seguimiento de pedidos' },
  { url: 'assets/imgproyectos/quick/notificaciones_push.png', desc: 'Notificaciónes Push' },
  { url: 'assets/imgproyectos/quick/Alexa_skills.png', desc: 'Skills con Alexa para hacer compra de productos' }
      ],
      tecnologias: ['Angular', 'Express','Node js','Ionic','javascript','Typescript','Figma', 'MongoDB', 'Bootstrap','JWT','PWA','Github','ci/cd', 'Jira','Render','Firebase','Jest','Postman','Jasmine','Docker']
    },
    {
      id: 3,
      titulo: 'Portal de Asesorias - UTHH',
      imagen: 'assets/imgproyectos/uthh/inicio_sesion.png',
      empresa: 'UTHH',
      rol:'Desarrollador full-stack',
      fecha: ' 01/05/2022 - 20/08/2022',
      desarrollo: ['Web', 'PWA'],
      objetivo: 'Se desarrolló un sistema de gestión de asesorías académicas compuesto por una aplicación web y una aplicación móvil, '
        + 'la aplicación web cuenta con un frontend en React, backend en Node.js-Express y base de datos SQL Server, '
        + 'mientras que la aplicación móvil se implementó en Java para Android, con un diseño UI/UX responsivo en Figma, '
        + 'se implementó la metodología SCRUM para la planificación y seguimiento del proyecto, '
        + 'y se emplearon herramientas de pruebas unitarias y automáticas como Jest, Jasmine y Postman, '
        + 'el sistema incluye módulos para docentes (agendar, cancelar asesorías y generar reportes de asistencia), '
        + 'tutores (visualizar información de alumnos con bajo rendimiento), y alumnos (visualizar y confirmar asistencia a asesorías), '
        + 'atendiendo la necesidad del área de Tecnologías de la Información de la Universidad Tecnológica de la Huasteca Hidalguense en Hidalgo.',
      imagenes: [
  { url: 'assets/imgproyectos/uthh/inicio_sesion.png', desc: 'Inicio de sesión del Portal' },
  { url: 'assets/imgproyectos/uthh/agendar_asesorias.png', desc: 'Modulos del docente' },
  { url: 'assets/imgproyectos/uthh/reporte_asesorias.png', desc: 'Creación de reportes' },
  { url: 'assets/imgproyectos/uthh/asesorias_lista.png', desc: 'Modulos del alumno' },
  { url: 'assets/imgproyectos/uthh/inicio_sesion_movil.png', desc: 'Login en app móvil' },
  { url: 'assets/imgproyectos/uthh/lista_de_alumnos_docente.png', desc: 'Asesorias que impartirá el docente' },
  { url: 'assets/imgproyectos/uthh/lista_docente.png', desc: 'Lista de Asistencia' },
  { url: 'assets/imgproyectos/uthh/alumno_asesorias.png', desc: 'Lista de asesorías del alumno' },
  { url: 'assets/imgproyectos/uthh/alumno_confirmar.png', desc: 'Confirmación de asistencia y validación de firma' }
],
      tecnologias: ['React', 'Express', 'Node js', 'Sql Server', 'Javascript','Java','Figma','Android Studio','Firebase','Github','ci/cd', 'Vercel','Firebase','Jest','Postman','Jasmine','Docker']
    }
  ];
}
