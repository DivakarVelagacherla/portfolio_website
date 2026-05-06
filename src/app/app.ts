import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { LandingHeader } from './shared/landing-header/landing-header';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingHeader, ConfirmDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    const router = inject(Router);
    router.events
      .pipe(filter(e => e instanceof NavigationEnd), take(1))
      .subscribe(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.documentElement.classList.remove('no-transition');
          });
        });
      });
  }
}
