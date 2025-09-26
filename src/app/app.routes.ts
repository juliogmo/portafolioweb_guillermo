import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Proyectos } from './components/proyectos/proyectos';
import { Profesionales } from './components/proyectos/profesionales/profesionales';
import { Web } from './components/proyectos/web/web';
import { Ia } from './components/proyectos/ia/ia';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'proyectos', component: Proyectos },
  { path: 'proyectos/profesionales', component: Profesionales },
  { path: 'proyectos/web', component: Web },
  { path: 'proyectos/ia', component: Ia },
];