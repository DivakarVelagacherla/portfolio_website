import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingHeader } from './shared/landing-header/landing-header';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog';
import { Footer } from './core/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingHeader, ConfirmDialogComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
