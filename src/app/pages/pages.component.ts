import { Component, OnInit } from '@angular/core';
declare function customInitFunctions(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  ngOnInit(): void {
    customInitFunctions();
  }
}
