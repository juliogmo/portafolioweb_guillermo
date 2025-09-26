import { Component,signal,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
 menuOpen = signal(false);
currentSection: string = 'home';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = document.querySelectorAll<HTMLElement>('section');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // margen superior
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id') || '';
      }
    });

    this.currentSection = current || 'home';
  }
}