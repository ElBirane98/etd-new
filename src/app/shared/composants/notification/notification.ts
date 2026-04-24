import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      <div *ngFor="let n of notifications" 
           class="toast-custom" 
           [ngClass]="n.type"
           (click)="remove(n.id)">
        <div class="icon">
          <i class="bi" [ngClass]="getIcon(n.type)"></i>
        </div>
        <div class="content">
          <div class="message">{{ n.message }}</div>
        </div>
        <div class="close-btn">
          <i class="bi bi-x"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }

    .toast-custom {
      pointer-events: auto;
      min-width: 300px;
      max-width: 450px;
      padding: 16px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      animation: slideIn 0.3s ease-out forwards;
      border-left: 5px solid transparent;
      transition: all 0.2s ease;
    }

    .toast-custom:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    }

    .toast-custom.success { border-left-color: #10b981; }
    .toast-custom.error { border-left-color: #ef4444; }
    .toast-custom.info { border-left-color: #3b82f6; }
    .toast-custom.warning { border-left-color: #f59e0b; }

    .icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .success .icon { background: #d1fae5; color: #10b981; }
    .error .icon { background: #fee2e2; color: #ef4444; }
    .info .icon { background: #dbeafe; color: #3b82f6; }
    .warning .icon { background: #fef3c7; color: #f59e0b; }

    .content { flex: 1; }
    .message { font-weight: 500; color: #1f2937; font-size: 0.95rem; }

    .close-btn { color: #9ca3af; font-size: 1.2rem; }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.95); }
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notifications$.subscribe(n => {
      this.notifications.push(n);
      setTimeout(() => this.remove(n.id), 5000);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  remove(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'bi-check-circle-fill';
      case 'error': return 'bi-exclamation-triangle-fill';
      case 'warning': return 'bi-exclamation-circle-fill';
      default: return 'bi-info-circle-fill';
    }
  }
}
