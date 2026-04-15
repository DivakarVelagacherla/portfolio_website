import { Injectable } from '@angular/core';
import { ConfirmDialog } from '../models/confirm-dialogue.model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  isOpen: boolean = false;
  message: string = '';
  confirmText: string = 'Continue';
  cancelText: string = 'Cancel';
  private confirmCallback: () => void = () => {};

  open(config: ConfirmDialog): void {
    this.message = config.message;
    this.confirmText = config.confirmText ?? 'Continue';
    this.cancelText = config.cancelText ?? 'Cancel';
    this.confirmCallback = config.onConfirm;
    this.isOpen = true;
  }

  confirm(): void {
    this.confirmCallback();
    this.close();
  }

  cancel(): void {
    this.close();
  }

  private close(): void {
    this.isOpen = false;
    this.message = '';
    this.confirmCallback = () => {};
  }
}
