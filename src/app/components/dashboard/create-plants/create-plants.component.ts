import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantService } from '../../../services/plant.service';
import { EnergyType } from '../../../models/energy';
import { EnergyService } from '../../../services/energy.service';
import { RenewableEnergyPlant, RenewableEnergyPlantCreation } from '../../../models/plant';

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
    private energyService: EnergyService,
    private plantService: PlantService
  ) { }

  ngOnInit(): void {

    this.initForm();
  }

  loadEnergyType() {
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
      energyTypeId: [''],
      country: [''],
      cityOrRegion: [''],
      latitude: [''],
      longitude: [''],
      installedCapacity: [0],
      startDate: [''],
      owner: [''],
      status: [''],
      estimatedAnnualProduction: [0],
      emissionsAvoided: [0],
      constructionCost: [0],
      numberOfUnits: [0],
      capacityFactor: [0],
      technologyProvider: [''],
      rating: [0],
      history: ['']
    });
  }

  onSubmit() {
    console.log(this.plantaFormNew.value);


    // if (this.plantaFormNew.valid) {
    //   const plantData: RenewableEnergyPlantCreation = {
    //     name: this.plantaFormNew.value.name,
    //     energyTypeId: this.plantaFormNew.value.energyTypeId,
    //     country: this.plantaFormNew.value.country,
    //     cityOrRegion: this.plantaFormNew.value.cityOrRegion,
    //     latitude: this.plantaFormNew.value.latitude,
    //     longitude: this.plantaFormNew.value.longitude,
    //     installedCapacity: this.plantaFormNew.value.installedCapacity,
    //     startDate: this.plantaFormNew.value.startDate,
    //     owner: this.plantaFormNew.value.owner,
    //     status: this.plantaFormNew.value.status,
    //     estimatedAnnualProduction: this.plantaFormNew.value.estimatedAnnualProduction,
    //     emissionsAvoided: this.plantaFormNew.value.emissionsAvoided,
    //     constructionCost: this.plantaFormNew.value.constructionCost,
    //     numberOfUnits: this.plantaFormNew.value.numberOfUnits,
    //     capacityFactor: this.plantaFormNew.value.capacityFactor,
    //     technologyProvider: this.plantaFormNew.value.technologyProvider,
    //     rating: this.plantaFormNew.value.rating,
    //     history: this.plantaFormNew.value.history,
    //     renewableEnergyDataHistories: this.plantaFormNew.value.renewableEnergyDataHistories ?? [],
    //   };

    console.log(this.plantaFormNew.controls['energyTypeId'].value)
      const getFormValueOrEmpty = (controlName: string): any => {
        console.log(this.plantaFormNew.controls[controlName].value);
        const value = this.plantaFormNew.controls[controlName].value;
        return value !== undefined ? value : ""; // Devuelve el valor o vacío si es undefined
      };

      const getSelectValueOrNull = (controlName: string): any => {
        const value = this.plantaFormNew.controls[controlName].value;
        return value !== undefined && value !== null ? value : null; // Devuelve null para selects si no hay valor
      };

      const mockRenewableEnergyPlant: RenewableEnergyPlantCreation = {
        name: getFormValueOrEmpty('name'),
        energyTypeId: getFormValueOrEmpty('energyTypeId'),
        country: getFormValueOrEmpty('country'),
        cityOrRegion: getFormValueOrEmpty('cityOrRegion'),
        latitude: getFormValueOrEmpty('latitude'),
        longitude: getFormValueOrEmpty('longitude'),
        installedCapacity: getFormValueOrEmpty('installedCapacity'),
        startDate: getFormValueOrEmpty('startDate'),
        owner: getFormValueOrEmpty('owner'),
        status: getFormValueOrEmpty('status'),
        estimatedAnnualProduction: getFormValueOrEmpty('estimatedAnnualProduction'),
        emissionsAvoided: getFormValueOrEmpty('emissionsAvoided'),
        constructionCost: getFormValueOrEmpty('constructionCost'),
        numberOfUnits: getFormValueOrEmpty('numberOfUnits'),
        capacityFactor: getFormValueOrEmpty('capacityFactor'),
        technologyProvider: getFormValueOrEmpty('technologyProvider'),
        rating: getFormValueOrEmpty('rating'),
        history: getFormValueOrEmpty('history'),
        // renewableEnergyDataHistories: [], // Propiedad opcional vacía
        // nameEnergy: "" // Propiedad opcional vacía
      };

      this.plantService.postCreatePlant(mockRenewableEnergyPlant).subscribe({
        next: (response) => {
          console.log("Se creo la planta correctamente", response);
        },
        error: (error) => {
          console.log("error al crear la planta", error);
        },
        // complete: () => {
        //   console.log('Request completed');
        // }
      });
    // }
    // else {
    //   console.error('Form is invalid');
    // }

  }
}
