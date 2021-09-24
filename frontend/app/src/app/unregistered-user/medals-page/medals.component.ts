import { Component, OnInit } from '@angular/core';
import { Nation } from 'src/app/model/nation.model';
import { NationService } from 'src/app/service/nation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.css']
})
export class MedalsComponent implements OnInit {

  constructor(private nationService: NationService, private router: Router) { }

  ngOnInit(): void {
    this.getNationsWithMedals();
  }

  nations: Nation[];

  getNationsWithMedals() {
    this.nationService.getNationsWithMedals().subscribe((nat: Nation[]) => {
      this.nations = nat;
    })
  }
 }
