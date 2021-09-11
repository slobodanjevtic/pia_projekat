import { Component, OnInit } from '@angular/core';
import { Nation } from 'src/app/model/nation.model';

@Component({
  selector: 'app-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.css']
})
export class MedalsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  nations: Nation[];
}
