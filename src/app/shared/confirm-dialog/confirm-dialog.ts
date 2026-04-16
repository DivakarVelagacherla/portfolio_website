import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../services/confirm-dialog';
import { Button } from '../button/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialogComponent {
  constructor(
    public confirmService: ConfirmDialogService,
    private cdr: ChangeDetectorRef,
  ) {}

  onConfirm(): void {
    this.confirmService.confirm();
  }
  onCancel(): void {
    this.confirmService.cancel();
  }
}
