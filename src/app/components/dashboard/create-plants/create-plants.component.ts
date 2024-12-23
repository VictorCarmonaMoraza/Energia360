import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantService } from '../../../services/plant.service';
import { EnergyType } from '../../../models/energy';
import { EnergyService } from '../../../services/energy.service';

@Component({
  selector: 'app-create-plants',
  templateUrl: './create-plants.component.html',
  styleUrl: './create-plants.component.scss'
})
export class CreatePlantsComponent implements OnInit {

  plantaFormNew: FormGroup;
  energyTypes: EnergyType[] = [];

  constructor(
    private fb: FormBuilder,
    private energyService:EnergyService
  ) { }

  ngOnInit(): void {

    this.initForm();
  }

  loadEnergyType(){
    //llamada al servicio para obtener todos los tipos de energia por su id
    this.energyService.getAllEnergyTypes().subscribe({
      next: (types) => {
        this.energyTypes = types;
      },
      error: (error) => console.error('Failed to load energy types:', error)
    });
  }

  //Fromulario para la nueva planta
  initForm() {
    //Obtains the data of type of energy
    this.loadEnergyType();

    //Load form
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

  onSubmit(){
    console.log(this.plantaFormNew.value);
  }
}
