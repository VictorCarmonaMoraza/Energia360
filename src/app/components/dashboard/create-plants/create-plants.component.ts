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
      name: [{ value: '', disabled: true }],
      energyType: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
      cityOrRegion: [{ value: '', disabled: true }],
      latitude: [{ value: '', disabled: true }],
      longitude: [{ value: '', disabled: true }],
      installedCapacity: [{ value: '', disabled: true }],
      startDate: [{ value: '', disabled: true }],
      owner: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }],
      estimatedAnnualProduction: [{ value: '', disabled: true }],
      emissionsAvoided: [{ value: '', disabled: true }],
      constructionCost: [{ value: '', disabled: true }],
      numberOfUnits: [{ value: '', disabled: true }],
      capacityFactor: [{ value: '', disabled: true }],
      technologyProvider: [{ value: '', disabled: true }],
      rating: [{ value: '', disabled: true }]
    });
  }
}
