import { Component, signal } from '@angular/core';
import { Navbar} from './components/navbar/navbar';
import { Home} from './components/home/home';
import { About } from './components/about/about';
import { Proyectos } from './components/proyectos/proyectos';
import { Skills } from './components/skills/skills';
import { RouterModule } from "@angular/router";
import { Footer } from './components/footer/footer';
@Component({
  selector: 'app-root',
  imports: [Navbar, Home, About, Proyectos, Skills,Footer, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('portafolioguille');
}
