import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ItineraryItem {
  time: string;
  activity: string;
  location: string;
  cost: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']   
})
export class AppComponent {
  title = 'CitlA';

  // Control de Vistas: 'auth' | 'survey' | 'itinerary'
  currentView: string = 'auth';
  isLogin: boolean = true;

  // Datos del Usuario y Encuesta
  user = {
    email: '',
    password: '',
    name: ''
  };

  survey = {
    interest: '',       // Gustos 
    activityType: '',   // Tipo de ambiente
    socialContext: '',  // Cita o Amigos
    groupSize: 2
  };

  // Datos del Itinerario Generado
  generatedItinerary: ItineraryItem[] = [];

  // Opciones basadas en la encuesta
  interests = [
    'Gastronomía',
    'Entretenimiento (Cine/Juegos)',
    'Cultura/Arte',
    'Vida Nocturna',
    'Naturaleza'
  ];

  // Alternar entre Login y Registro
  toggleAuth(): void {
    this.isLogin = !this.isLogin;
  }

  // Iniciar Sesión o Registrarse
  submitAuth(): void {
    if (this.user.email && this.user.password) {
      console.log('Usuario autenticado:', this.user);
      this.currentView = 'survey';
    } else {
      alert('Por favor completa los campos');
    }
  }

  // Generar Itinerario
  generateItinerary(): void {
    this.currentView = 'itinerary';

    const planContext =
      this.survey.socialContext === 'date'
        ? 'Cita Romántica'
        : 'Salida Grupal';

    this.generatedItinerary = [
      {
        time: '4:00 PM',
        activity: 'Punto de Encuentro y Café',
        location: 'Café Temático "El Péndulo"',
        cost: '$150 MXN',
        icon: '☕'
      },
      {
        time: '5:30 PM',
        activity: this.survey.interest || 'Actividad Principal',
        location:
          this.survey.socialContext === 'date'
            ? 'Cine VIP'
            : 'Escape Room Enigma',
        cost: '$400 MXN',
        icon: '🎬'
      },
      {
        time: '8:00 PM',
        activity: 'Cena y Bebidas',
        location: 'Terraza "Cielo de la CDMX"',
        cost: '$600 MXN',
        icon: '🍽️'
      }
    ];
  }

  // Reiniciar flujo
  reset(): void {
    this.currentView = 'survey';
    this.survey = {
      interest: '',
      activityType: '',
      socialContext: '',
      groupSize: 2
    };
  }
}
