import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'; // 👈 Importa CommonModule

@Component({
  selector: 'app-skills',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills {
  categories = [
    { name: 'Lenguajes de Programación', items: ['JavaScript','TypeScript','Python','C#','Java','PHP','C++'] },
    { name: 'Frontend', items: ['Angular','React','HTML5','CSS3','Figma','Bootstrap','Tailwind CSS'] },
    { name: 'Backend', items: ['Node.js','Express.js','ASP.NET','Flask','Fast API','Django'] },
    { name: 'Web & APIs', items: ['WebSocket','RESTful APIs','JWT'] },
    { name: 'Bases de Datos', items: ['MySQL','Sql Server','PostgreSQL','MongoDB','Azure DB'] },
    { name: 'Desarrollo Móvil', items: ['React Native','Ionic','Java/Kotlin'] },
    { name: 'DevOps & Cloud', items: ['Docker','CI/CD Pipelines','Git','GitHub','Jira','Trello','Vercel','Render','Firebase','Azure','ServiceNow'] },
    { name: 'Pruebas', items: ['Jest','Jasmine','Postman','Cypress','Integration Testing'] },
    { name: 'Metodologías', items: ['SCRUM','Kanban','XP','ITIL'] },
    { name: 'Data & Machine Learning', items: ['TensorFlow','Keras','Scikit-learn','Pandas','NumPy','CNN','Data Visualization'] },
    { name: 'Herramientas Empresariales e Inteligencia de Negocios', items: ['Power BI','Tableau','Data Analysis','Excel', 'ServiceNow', 'SAP'] }
  ];

  getSkillIcon(skill: string): string {
    const key = skill.toLowerCase();
    const map: any = {
      //CON ICONO CDN
  'angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  'angular material': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  'asp.net': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
  'azure db': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'bootstrap': 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg',
  'c#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  'c++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'css3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'django': 'https://1000marcas.net/wp-content/uploads/2021/06/Django-Logo.png',
  'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'express.js': 'https://cdn.worldvectorlogo.com/logos/expressjs.svg',
  'fast api': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'html5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'ionic': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg',
  'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'java/kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'numpy': 'https://numpy.org/images/logo.svg',
  'pandas': 'https://img.icons8.com/color/600/pandas.png',
  'php': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'react native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'scikit-learn': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
  'spring boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  'tailwind css': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
  'tensorflow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'trello': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg',
  'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',

  //SIN ICONO CDN
  'azure': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
  'cypress':'https://cdn.worldvectorlogo.com/logos/cypress-1.svg',
  'ci/cd pipelines': 'https://miro.medium.com/v2/resize:fit:1000/1*nh_OKoFf6JynPmvOzpAzLQ.png',
  'cnn': 'https://cdn-icons-png.flaticon.com/512/3647/3647567.png',
  'data analysis': 'https://cdn-icons-png.flaticon.com/512/876/876629.png',
  'data visualization': 'https://cdn-icons-png.flaticon.com/512/3721/3721409.png',
  'excel': 'https://static.vecteezy.com/system/resources/previews/017/396/828/non_2x/microsoft-excel-mobile-apps-logo-free-png.png',
  'github': 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
  'integration testing': 'https://cdn-icons-png.flaticon.com/512/2040/2040803.png',
  'itil': 'https://i0.wp.com/greenlightworldwide.com/wp-content/uploads/2019/07/itil-logo.png?fit=696%2C313&ssl=1',
  'jasmine': 'https://www.pikpng.com/pngl/m/129-1291662_jasmine-logo-png-transparent-jasmine-angular-clipart.png',
  'jest': 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/jest-js-icon.png',
  'jira': 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
  'kanban': 'https://cdn-icons-png.flaticon.com/512/3475/3475761.png',
  'keras': 'https://tse4.mm.bing.net/th/id/OIP.mczXtkESCH-kAmk6WSqocQHaHa',
  'postman': 'https://images.icon-icons.com/3053/PNG/512/postman_macos_bigsur_icon_189815.png',
  'power bi': 'https://1000marcas.net/wp-content/uploads/2022/08/Microsoft-Power-BI-Logo-2013.png',
  'render': 'https://avatars.githubusercontent.com/u/42682871?s=280&v=4',
  'sap': 'https://upload.wikimedia.org/wikipedia/commons/8/8f/SAP-Logo.svg',
  'scrum': 'https://cdn-icons-png.flaticon.com/512/8553/8553379.png',
  'servicenow': 'https://logos-world.net/wp-content/uploads/2022/02/ServiceNow-Emblem.png',
  'sql server': 'https://img.icons8.com/color/512/microsoft-sql-server.png',
  'tableau': 'https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png',
  'vercel': 'https://cdn.sanity.io/images/34ent8ly/production/223a29eb0698fb7fbc6d158a6f7e698d155e025f-824x824.png',
  'websocket': 'https://cdn-icons-png.flaticon.com/512/270/270798.png',
  'restful apis': 'https://cdn-icons-png.flaticon.com/512/3143/3143527.png',
  'jwt': 'https://logodix.com/logo/1989689.png',
  'xp': 'https://cdn.iconscout.com/icon/free/png-256/free-xp-icon-svg-download-png-1070696.png'

    };
    return map[key] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg';
  }
}