import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isHeaderVisible: boolean=false;
  

  constructor(private router: Router) {
   
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHeaderVisible = event.url !== '/homepage';
      }
    });
  }
  
  ngOnInit(): void {
    this.isHeaderVisible=false;
  }
}
