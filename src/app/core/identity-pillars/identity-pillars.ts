import { Component } from '@angular/core';
import { StatsService } from '../../services/stats';

@Component({
  selector: 'app-identity-pillars',
  imports: [],
  templateUrl: './identity-pillars.html',
  styleUrl: './identity-pillars.css',
})
export class IdentityPillars {
  constructor(public statsService: StatsService) {}
}
