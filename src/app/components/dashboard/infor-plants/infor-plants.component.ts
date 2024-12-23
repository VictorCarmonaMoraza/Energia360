import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../../services/plant.service';
import { Plant } from '../../../models/plant';
import { EnergyService } from '../../../services/energy.service';
import { EnergyType } from '../../../models/energy';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-infor-plants',
  templateUrl: './infor-plants.component.html',
  styleUrl: './infor-plants.component.scss'
})
export class InforPLantsComponent implements OnInit {

  private plantId: number;
  private dataPlant: Plant;
  plantaFormInfo: FormGroup;
  private nameEnergy: string = '';

  //Constructor
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private plantService: PlantService,
    private enrgyService: EnergyService
  ) { }

  //Inicializador del componente
  ngOnInit(): void {
    //Inicializacion del formulario
    this.initForm();
    this.plantId = +this.route.snapshot.paramMap.get('id');
    this.getDataPlant(this.plantId);
  }

  getDataPlant(plantId: number) {
    this.plantService.getDataPlantById(plantId).pipe(
      switchMap((response: Plant) => {
        return this.enrgyService.getTypeEnergyById(response.energyTypeId).pipe(
          map((responseEnergy: EnergyType) => {
            response.nameEnergy = responseEnergy.name;
            return response; // Devuelve el objeto Plant modificado
          })
        );
      })
    ).subscribe({
      next: (response) => {
        this.mainForm(response);
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  mainForm(data: Plant) {
    console.log(this.nameEnergy);
    this.plantaFormInfo = this.fb.group({
      namePlant: [{ value: data.name || '', disabled: true }],
      energyTypePlant: [{ value: data.nameEnergy || '', disabled: true }],
      capacityPlant:[{ value: data.installedCapacity || '', disabled: true }],
      countryPlant: [{ value: data.country || '', disabled: true }],
      cityOrRegionPlant: [{ value: data.cityOrRegion || '', disabled: true }],
      latitudePlant: [{ value: data.latitude || '', disabled: true }],
      longitudePlant: [{ value: data.longitude || '', disabled: true }],
      installedCapacityPlant: [{ value: data.installedCapacity || '', disabled: true }],
      startDatePlant: [{ value: data.startDate || '', disabled: true }],
      ownerPlant: [{ value: data.owner || '', disabled: true }],
      statusPlant: [{ value: data.status || '', disabled: true }],
      estimatedAnnualProductionPlant: [{ value: data.estimatedAnnualProduction || '', disabled: true }],
      emissionsAvoidedPlant: [{ value: data.emissionsAvoided || '', disabled: true }],
      constructionCostPlant: [{ value: data.constructionCost || '', disabled: true }],
      numberOfUnitsPlant: [{ value: data.numberOfUnits || '', disabled: true }],
      capacityFactorPlant: [{ value: data.capacityFactor || '', disabled: true }],
      technologyProviderPlant: [{ value: data.technologyProvider || '', disabled: true }],
      ratingPlant: [{ value: data.rating || '', disabled: true }],
      historyPlant: [{ value: data.history || '', disabled: true }],
    });
  }

  initForm() {
    this.plantaFormInfo = this.fb.group({
      namePlant: [''],
      countryPlant: [''],
      capacityFactorPlant: [''],
      energyTypePlant: [''],
      statusPlant: [''],
      cityOrRegionPlant: [''],
      latitudePlant: [''],
      longitudePlant: [''],
      installedCapacityPlant: [''],
      startDatePlant: [''],
      ownerPlant: [''],
      estimatedAnnualProductionPlant: [''],
      emissionsAvoidedPlant: [''],
      constructionCostPlant: [''],
      numberOfUnitsPlant: [''],
      technologyProviderPlant: [''],
      ratingPlant: [''],
      historyPlant: ['']
    });
  }

}
