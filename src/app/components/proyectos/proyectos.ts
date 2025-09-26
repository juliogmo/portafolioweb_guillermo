import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Profesionales } from './profesionales/profesionales';
import { Web } from './web/web';
import { Ia } from './ia/ia';

@Component({
  selector: 'app-proyectos',
  imports: [CommonModule, RouterModule,Profesionales],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})
export class Proyectos {

    
}