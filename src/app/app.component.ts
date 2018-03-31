import { Component, OnInit } from '@angular/core';
import { SomeService } from './some.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  instant: string;
  showSpinner = false;

  constructor(private someService: SomeService) {}

  ngOnInit(): void {
    window.setTimeout(() => this.showSpinner = !this.instant, 300);
    this.someService.getFoo().subscribe(instant => {
      this.instant = instant;
      this.showSpinner = false;
    });
  }
}
