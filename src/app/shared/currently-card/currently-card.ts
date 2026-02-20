import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currently-card',
  imports: [],
  templateUrl: './currently-card.html',
  styleUrl: './currently-card.css',
})
export class CurrentlyCard implements OnInit {
  problemsSolved: number = 59;
  width: number = 0;

  ngOnInit(): void {
    this.width = (this.problemsSolved / 300) * 100;
  }
}
