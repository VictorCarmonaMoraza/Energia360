import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantService } from '../../../services/plant.service';

@Component({
  selector: 'app-create-plants',
  templateUrl: './create-plants.component.html',
  styleUrl: './create-plants.component.scss'
})
export class CreatePlantsComponent implements OnInit {

  plantaFormNew: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.plantaFormNew = this.fb.group({
      name: [''],
      energyType: [''],
      country: [''],
      cityOrRegion: [''],
      latitude: [''],
      longitude: [''],
      installedCapacity: [''],
      startDate: [''],
      owner: [''],
      status: [''],
      estimatedAnnualProduction: [''],
      emissionsAvoided: [''],
      constructionCost: [''],
      numberOfUnits: [''],
      capacityFactor: [''],
      technologyProvider: [''],
      rating: ['']
    });
  }
}
