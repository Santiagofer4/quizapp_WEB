import { v4 as uuid } from 'uuid';

import profile1 from 'assets/img/faces/christian.jpg';
import profile2 from 'assets/img/faces/kendall.jpg';
import profile3 from 'assets/img/faces/marc.jpg';

const data = [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description:
      'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    schoolName: 'UBA',
    subjectName: 'Analisis Mamatico I',
    media: profile1,
    quizName: 'Matematica Inicial',
    totalStudents: '594',
    tags: ['Matematica', 'Fisica', 'Quimica', 'Administracion'],
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description:
      'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    schoolName: 'Colegio San Jose',
    subjectName: 'Fisica 1°B',
    media: profile2,
    quizName: 'Fisica 2ndo parcial',
    totalStudents: '625',
    tags: ['Informatica', 'Programacion'],
  },
  {
    id: uuid(),
    createdAt: '03/04/2019',
    description:
      'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    schoolName: 'UTN FRTDF',
    subjectName: 'Quimica Organica',
    media: profile3,
    quizName: 'Practica Qca. Organica II',
    totalStudents: '857',
    tags: ['Etica', 'Derecho', 'Economia'],
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description:
      'Lyft is an on-demand transportation company based in San Francisco, California.',
    schoolName: 'UNTDF',
    subjectName: 'Estadistica y Administracion',
    media: profile1,
    quizName: 'Estadistica examen',
    totalStudents: '406',
    tags: ['Matematica', 'Fisica', 'Quimica', 'Administracion'],
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description:
      'GitHub is a web-based hosting service for version control of code using Git.',
    schoolName: 'UTNLP',
    subjectName: 'Analisis Mametico II',
    media: profile2,
    quizName: 'Integracion 2nda parte',
    totalStudents: '835',
    tags: ['Etica', 'Derecho', 'Economia'],
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description:
      'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    schoolName: 'some school',
    subjectName: 'some subject',
    media: profile3,
    quizName: 'Born-Habber',
    totalStudents: '835',
    tags: ['Informatica', 'Programacion'],
  },
];

export default data;
