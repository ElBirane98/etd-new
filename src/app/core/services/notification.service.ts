import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();
  
  private history: Notification[] = [];
  private nextId = 0;

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
    const id = this.nextId++;
    const notification: Notification = { message, type, id };
    this.history.unshift(notification); // Add to beginning
    if (this.history.length > 50) this.history.pop(); // Keep last 50
    this.notificationSubject.next(notification);
  }

  getHistory(): Notification[] {
    return this.history;
  }

  clearHistory() {
    this.history = [];
  }


  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  handleError(err: any, defaultMessage: string = 'Une erreur est survenue') {
    let message = defaultMessage;
    
    if (err.status === 422 && err.error?.errors) {
      // Erreurs de validation Laravel
      const firstError = Object.values(err.error.errors)[0] as string[];
      message = firstError[0];
    } else if (err.error?.error) {
      // Erreur technique détaillée (notre try-catch)
      message = err.error.error;
    } else if (err.error?.message) {
      // Message d'erreur standard Laravel
      message = err.error.message;
    } else if (typeof err.error === 'string') {
      message = err.error;
    }
    
    this.error(message);
  }

  info(message: string) {

    this.show(message, 'info');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }
}
