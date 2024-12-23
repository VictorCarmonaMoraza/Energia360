import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../../services/plant.service';
import { Plant } from '../../../models/plant';

@Component({
  selector: 'app-infor-plants',
  templateUrl: './infor-plants.component.html',
  styleUrl: './infor-plants.component.scss'
})
export class InforPLantsComponent implements OnInit {

  private plantId: number;
  private dataPlant: Plant;
  plantaFormInfo: FormGroup;

  //Constructor
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private plantService: PlantService
  ) { }

  //Inicializador del componente
  ngOnInit(): void {
    //Inicializacion del formulario
    this.initForm();
    this.plantId = +this.route.snapshot.paramMap.get('id');
    this.getDataPlant(this.plantId);
  }

  //Obtener todos los datos de la planta seleccionada para mostrar en el formulario
  getDataPlant(plantid: number) {
    this.plantService.getDataPlantById(plantid).subscribe({
      next: (response: Plant) => {
        this.mainForm(response);
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Request completed');
      }
    })
  }

  mainForm(data: Plant) {
    this.plantaFormInfo = this.fb.group({
      namePlant: [{ value: data.name || '', disabled: true }],
      energyTypePlant: [{ value: data.energyTypeId || '', disabled: true }],
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
