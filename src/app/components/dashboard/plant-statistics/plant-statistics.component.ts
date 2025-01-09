import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../../services/plant.service';
import { RenewableEnergyPlant } from '../../../models/plant';
import { FormControl, FormGroup } from '@angular/forms';
import * as echarts from 'echarts';


@Component({
  selector: 'app-plant-statistics',
  templateUrl: './plant-statistics.component.html',
  styleUrl: './plant-statistics.component.scss'
})
export class PlantStatisticsComponent implements OnInit {
  @ViewChild('hoursChartContainer') hoursChartContainer: ElementRef;
  @ViewChild('daysChartContainer') daysChartContainer: ElementRef;
  @ViewChild('monthsChartContainer') monthsChartContainer: ElementRef;
  @ViewChild('yearsChartContainer') yearsChartContainer: ElementRef;
  private hoursChart: echarts.ECharts;
  private daysChart: echarts.ECharts;
  private monthsChart: echarts.ECharts;
  private yearsChart: echarts.ECharts;

  public tittle: string = 'Estadistica de una planta';
  plants: RenewableEnergyPlant[] = [];
  formFilter: FormGroup;

  constructor(private plantService: PlantService) {
  }


  ngOnInit(): void {
    //1-Obtenemos todas las plantas del sistema
    this.getListPlant();
    this.initForm();
  }

  ngAfterViewInit() {
    this.initChart(this.hoursChartContainer.nativeElement, 'Hours');
    this.initChart(this.daysChartContainer.nativeElement, 'Days');
    this.initChart(this.monthsChartContainer.nativeElement, 'Months');
    this.initChart(this.yearsChartContainer.nativeElement, 'Years');
  }

  //Obtener todas las plantas de energias renovables
  getListPlant() {
    this.plantService.getAllPlants().subscribe({
      next: (response: RenewableEnergyPlant[]) => {
        // Aquí se maneja la respuesta exitosa
        console.log('Response:', response);
        this.plants = response;
      },
      error: (err) => {
        // Aquí se maneja cualquier error que ocurra en la llamada
        console.error('Error occurred:', err);
      },
      complete: () => {
        // Este bloque opcional se ejecuta cuando el observable termina (si aplica)
        console.log('Request completed');
      }
    })
  }

  initForm() {
    this.formFilter = new FormGroup({
      plantId: new FormControl(''),
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date()),
    });
  }

  //Obtner informacion del formulario
  ModifyFrom() {
    console.log(this.formFilter.controls['plantId'].value);
    console.log(this.formFilter.controls['startDate'].value);
    console.log(this.formFilter.controls['endDate'].value);
  }

  //DATA PARA LAS GRAFICAS
  initChart(container: HTMLElement, chartType: string) {
    const chart = echarts.init(container);
    const xAxisData = [];
    const data1 = [];

    // Definir el rango y la frecuencia de los datos según el tipo de gráfica
    let rangeMultiplier = 1;
    let frequencyDivider = 5;
    let color = '#5470C6'; // Color predeterminado

    switch (chartType) {
      case 'Hours':
        rangeMultiplier = 5;
        frequencyDivider = 2;
        color = '#5470C6'; // Azul para las horas
        break;
      case 'Days':
        rangeMultiplier = 10;
        frequencyDivider = 3;
        color = '#91CC75'; // Verde para los días
        break;
      case 'Months':
        rangeMultiplier = 15;
        frequencyDivider = 4;
        color = '#EE6666'; // Rojo para los meses
        break;
      case 'Years':
        rangeMultiplier = 20;
        frequencyDivider = 5;
        color = '#73C0DE'; // Cian para los años
        break;
    }

    // Generar datos
    for (let i = 0; i < 100; i++) {
      xAxisData.push(`${chartType.slice(0, 1)}${i}`);
      data1.push((Math.sin(i / frequencyDivider) * (i / frequencyDivider - 10) + i / 6) * rangeMultiplier);
    }

    // Configuración de la opción de la gráfica
    const option: echarts.EChartsOption = {
      tooltip: {},
      xAxis: {
        data: xAxisData,
        splitLine: { show: false }
      },
      yAxis: {},
      series: [{
        name: chartType,
        type: 'bar',
        data: data1,
        emphasis: { focus: 'series' },
        animationDelay: idx => idx * 10,
        itemStyle: {
          color: color // Usar el color asignado para cada tipo de gráfico
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5
    };

    chart.setOption(option);

    // Asignar la instancia de la gráfica a la propiedad adecuada
    switch (chartType) {
      case 'Hours':
        this.hoursChart = chart;
        break;
      case 'Days':
        this.daysChart = chart;
        break;
      case 'Months':
        this.monthsChart = chart;
        break;
      case 'Years':
        this.yearsChart = chart;
        break;
    }
  }

  // ngOnDestroy(): void {
  //   if (this.myChart) {
  //     this.myChart.dispose();
  //   }
  // }
}
