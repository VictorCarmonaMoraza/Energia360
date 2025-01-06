import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantService } from '../../../services/plant.service';
import { EnergyType } from '../../../models/energy';
import { EnergyService } from '../../../services/energy.service';
import { Plant, RenewableEnergyPlant } from '../../../models/plant';

@Component({
  selector: 'app-create-plants',
  templateUrl: './create-plants.component.html',
  styleUrl: './create-plants.component.scss'
})
export class CreatePlantsComponent implements OnInit {

  plantForm : FormGroup;
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
    this.plantForm  = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      energyTypeId: ['', [Validators.required]],
      country: ['', [Validators.required]],
      cityOrRegion: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      installedCapacity: [0, [Validators.required]],
      startDate: ['', [Validators.required]],
      owner: ['', [Validators.required, Validators.minLength(5)]],
      status: ['', [Validators.required]],
      estimatedAnnualProduction: [0, [Validators.required]],
      emissionsAvoided: [0, [Validators.required]],
      constructionCost: [0, [Validators.required]],
      numberOfUnits: [0, [Validators.required]],
      capacityFactor: [0, [Validators.required]],
      technologyProvider: ['', [Validators.required]],
      rating: [0, [Validators.required]],
      history: ['']
    });
  }

  createPlant() {
    const getFormValueOrEmpty = (controlName: string): any => {
      let value = this.plantForm .controls[controlName].value;
      if (controlName === 'startDate' && value) {
        value = new Date(value).toISOString();  // Convierte la fecha a formato ISO si el campo es 'startDate'
      }
      return value !== undefined ? value : ""; // Devuelve el valor o vacío si es undefined
    };

    const getSelectValueOrNull = (controlName: string): any => {
      const value = this.plantForm .controls[controlName].value;
      return value !== undefined && value !== null ? value : null; // Devuelve null para selects si no hay valor
    };

    console.log(this.plantForm.controls['name'].value);
    const mockRenewableEnergyPlant: Plant = {
      name: this.plantForm.controls['name'].value,
      energyTypeId: this.plantForm.controls['energyTypeId'].value,
      //energyTypeId: getFormValueOrEmpty('energyTypeId'),
      //country: getFormValueOrEmpty('country'),
      country: this.plantForm.controls['country'].value,
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

  cleanFrom() {
    this.plantForm .reset();
  }

  isValidFields(field: string): boolean | null {
    return this.plantForm .controls[field].errors
      && this.plantForm .controls[field].touched;
  }

  getFieldError(field: string): string {

    if (!this.plantForm .controls[field]) return null;

    const errors = this.plantForm .controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return 'Este campo es requerido';
          case 'minlength':
            return `´Minimo ${errors['minlength'].requiredLength } caracters.`;
      }
    }
    return null;
  }
}
