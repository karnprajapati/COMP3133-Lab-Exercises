import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>{{ title }}</h1>
      </header>
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <p>&copy; {{ currentYear }} SpaceX Explorer | Data provided by SpaceX API</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: 'Roboto', sans-serif;
    }
    
    .app-header {
      background-color: #1a1a1a;
      color: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .app-header h1 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 500;
    }
    
    .app-content {
      flex: 1;
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    
    .app-footer {
      background-color: #1a1a1a;
      color: rgba(255, 255, 255, 0.7);
      padding: 1rem 2rem;
      text-align: center;
      font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
      .app-header h1 {
        font-size: 1.4rem;
      }
      
      .app-content {
        padding: 0.5rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'SpaceX Explorer';
  currentYear = new Date().getFullYear();
}