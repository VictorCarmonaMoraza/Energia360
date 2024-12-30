import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantService } from '../../../services/plant.service';
import { HistoricPlant, RenewableEnergyPlant } from '../../../models/plant';
import L, { Icon, Map, Marker, marker, tileLayer } from 'leaflet';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Router } from '@angular/router';
// import * as am5index from "@amcharts/amcharts5/index";



interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-energy-plants',
  templateUrl: './energy-plants.component.html',
  styleUrl: './energy-plants.component.scss',
})
export class EnergyPlantsComponent implements OnInit {

  plantaForm: FormGroup;
  plants: RenewableEnergyPlant[] = [];
  historicPlant: HistoricPlant[] = [];
  private map!: Map;
  private plantMarkers: Marker[] = []

  dataGrafica: any;

  constructor(
    private fb: FormBuilder,
    private plantService: PlantService,
    private router: Router
  ) {
    this.plantaForm = this.fb.group({
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

  ngOnInit(): void {
    this.getListPlant();

    // this.cols = [
    //   { field: 'name', header: 'Name' },
    //   { field: 'rating', header: 'Rating' }
    // ];

    //this.loadDefaultChart();
  }

  ngAfterViewInit(): void {
    //this.getListPlant();
    this.initMap();
    //this.crearGrafica();
    //this.CrearGrafica2();

  }

  initForm(plant: RenewableEnergyPlant) {
    this.plantaForm.patchValue({
      name: plant.name,
      energyType: plant.energyTypeId,
      country: plant.country,
      cityOrRegion: plant.cityOrRegion,
      latitude: plant.latitude,
      longitude: plant.longitude,
      installedCapacity: plant.installedCapacity + ' MW',
      startDate: plant.startDate,
      owner: plant.owner,
      status: plant.status,
      estimatedAnnualProduction: plant.estimatedAnnualProduction,
      emissionsAvoided: plant.emissionsAvoided + ' CO2',
      constructionCost: plant.constructionCost + ' USD',
      numberOfUnits: plant.numberOfUnits,
      capacityFactor: plant.capacityFactor,
      technologyProvider: plant.technologyProvider,
      rating: plant.rating
    });
  }

  initMap() {
    // Crear el mapa en el elemento con id "mapaVictor"
    this.map = new Map('mapaVictor').setView([0, 0], 2); // Vista inicial centrada en un punto genérico

    // Añadir capa de mapa
    tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.map);
  }

  addAllMarkers(plants: RenewableEnergyPlant[]) {
    // Limpiar cualquier marcador previo en el mapa
    this.plantMarkers.forEach(marker => this.map.removeLayer(marker));
    this.plantMarkers = [];

    // Crear un icono personalizado
    const solar = new Icon({
      iconUrl: 'assets/solar.png', // Ruta a tu icono personalizado
      iconSize: [32, 32], // Ajusta el tamaño del icono
      iconAnchor: [16, 32], // Punto del icono que está anclado al marcador
      popupAnchor: [0, -32] // Punto de la ventana emergente en relación con el icono
    });
    const eolica = new Icon({
      iconUrl: 'assets/eolica.png', // Ruta a tu icono personalizado
      iconSize: [32, 32], // Ajusta el tamaño del icono
      iconAnchor: [16, 32], // Punto del icono que está anclado al marcador
      popupAnchor: [0, -32] // Punto de la ventana emergente en relación con el icono
    });
    const geo = new Icon({
      iconUrl: 'assets/Geotermica.png', // Ruta a tu icono personalizado
      iconSize: [32, 32], // Ajusta el tamaño del icono
      iconAnchor: [16, 32], // Punto del icono que está anclado al marcador
      popupAnchor: [0, -32] // Punto de la ventana emergente en relación con el icono
    });
    const hidro = new Icon({
      iconUrl: 'assets/Hidroelectrica.png', // Ruta a tu icono personalizado
      iconSize: [32, 32], // Ajusta el tamaño del icono
      iconAnchor: [16, 32], // Punto del icono que está anclado al marcador
      popupAnchor: [0, -32] // Punto de la ventana emergente en relación con el icono
    });
    const mar = new Icon({
      iconUrl: 'assets/Mareomotriz.png', // Ruta a tu icono personalizado
      iconSize: [32, 32], // Ajusta el tamaño del icono
      iconAnchor: [16, 32], // Punto del icono que está anclado al marcador
      popupAnchor: [0, -32] // Punto de la ventana emergente en relación con el icono
    });
    const oceano = new Icon({
      iconUrl: 'assets/Oceanica.png', // Ruta a tu icono personalizado
      iconSize: [32, 32], // Ajusta el tamaño del icono
      iconAnchor: [16, 32], // Punto del icono que está anclado al marcador
      popupAnchor: [0, -32] // Punto de la ventana emergente en relación con el icono
    });
    const bio = new Icon({
      iconUrl: 'assets/Biomasa.png', // Ruta a tu icono personalizado
      iconSize: [32, 32], // Ajusta el tamaño del icono
      iconAnchor: [16, 32], // Punto del icono que está anclado al marcador
      popupAnchor: [0, -32] // Punto de la ventana emergente en relación con el icono
    });

    // Agregar un marcador para cada planta y ajustarlo en el mapa
    plants.forEach(plant => {
      // Seleccionar el icono en función del valor de `energyType`
      let selectedIcon;
      if (plant.energyTypeId === 1) {
        selectedIcon = solar;
      } else if (plant.energyTypeId === 2) {
        selectedIcon = eolica;
      } else if (plant.energyTypeId === 3) {
        selectedIcon = hidro;
      } else if (plant.energyTypeId === 4) {
        selectedIcon = geo;
      }
      else if (plant.energyTypeId === 5) {
        selectedIcon = bio;
      }
      else if (plant.energyTypeId === 6) {
        selectedIcon = mar;
      } else {
        selectedIcon = oceano;
      }

      // Contenido completo del popup para mostrar en el tooltip
      const popupContent = `
      <div class="map-popup">
        <div class="row mb-3 fw-bold text-center">
          <div class="col">
            ${plant.name} <!-- Título -->
          </div>
        </div>
        <div class="row text-center">
          <div class="col">
            <img src="${selectedIcon.options.iconUrl}" alt="Descripción de la imagen" style="width:30%; height:auto;"/> <!-- Imagen -->
          </div>
        </div>
        <div class="row text-center mt-3">
          <div class="col cap-max-value">
            Volum màxim: m<sup>3</sup>
          </div>
        </div>
        <div class="row text-center">
          <div class="col cap-max-value">
            Volum mínim:
          </div>
        </div>
        <div class="row text-center mt-3">
          <div class="col cap-actual-value">
            Volum actual:
          </div>
        </div>
      </div>
    `;



      // Agregar un marcador para cada planta y ajustarlo en el mapa
      const plantMarker = marker([plant.latitude, plant.longitude], { icon: selectedIcon })
        .addTo(this.map)
        .bindPopup(popupContent);

      // Abrir el popup al pasar el mouse por encima
      plantMarker.on('mouseover', () => {
        plantMarker.openPopup();
      });

      // Cerrar el popup al retirar el mouse del marcador
      plantMarker.on('mouseout', () => {
        plantMarker.closePopup();
      });

      this.plantMarkers.push(plantMarker);
    });

    // Ajustar el mapa para que abarque todos los marcadores
    const bounds = L.latLngBounds(this.plantMarkers.map(marker => marker.getLatLng()));
    if (bounds.isValid()) {
      this.map.fitBounds(bounds);
    }



  }

  //Obtener todas las plantas de energias renovables
  getListPlant() {
    this.plantService.getAllPlants().subscribe({
      next: (response: RenewableEnergyPlant[]) => {
        // Aquí se maneja la respuesta exitosa
        console.log('Response:', response);
        this.plants = response;
        //this.initMap(response);
        this.initForm(response[0])
        this.addAllMarkers(response);
        // Puedes asignar la respuesta a una variable o procesarla como necesites
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


  //Listado de plantas con informacion

  cols!: Column[];

  // getSeverity(status: string):string {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }

  selectPlant(plant: RenewableEnergyPlant) {
    // Asegurarse de que el mapa esté inicializado
    if (!this.map) {
      console.error('El mapa no está inicializado.');
      return;
    }

    // Actualizar el formulario con los datos de la planta seleccionada
    this.plantaForm.patchValue({
      name: plant.name,
      energyType: plant.energyTypeId,
      country: plant.country,
      cityOrRegion: plant.cityOrRegion,
      latitude: plant.latitude,
      longitude: plant.longitude,
      installedCapacity: plant.installedCapacity + ' MW',
      startDate: plant.startDate,
      owner: plant.owner,
      status: plant.status,
      estimatedAnnualProduction: plant.estimatedAnnualProduction,
      emissionsAvoided: plant.emissionsAvoided + ' CO2',
      constructionCost: plant.constructionCost + ' USD',
      numberOfUnits: plant.numberOfUnits,
      capacityFactor: plant.capacityFactor,
      technologyProvider: plant.technologyProvider,
      rating: plant.rating
    });

    // Centrar el mapa y resaltar el marcador seleccionado
    const selectedMarker = this.plantMarkers.find(marker =>
      marker.getLatLng().lat === plant.latitude && marker.getLatLng().lng === plant.longitude
    );

    if (selectedMarker) {
      selectedMarker.openPopup(); // Abrir el popup del marcador seleccionado
      this.map.setView([plant.latitude, plant.longitude], 7); // Centrar el mapa en la planta seleccionada
    }

    // Obtener datos históricos de la planta
    this.plantService.getHistoricPlant(plant.id).subscribe({
      next: (response: HistoricPlant[]) => {
        console.log('Response:', response);
        this.historicPlant = response;

        const dataGrafica = response.map(item => {
          const date = new Date(item.recordDate);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return {
            recordDate: `${day}/${month}/${year}`, // Formato DD/MM/YYYY
            value: item.estimatedAnnualProduction
          };
        });

        this.CrearGrafica2(dataGrafica);
        console.log(dataGrafica);
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }


  //Grafica
  crearGrafica() {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartGraficaLinea");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0
    }));


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);


    // Generate random data
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round((Math.random() * 10 - 5) + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count) {
      let data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        pan: "zoom"
      })
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));


    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));


    // Set data
    let data = generateDatas(1200);
    series.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

  }

  CrearGrafica3(dataResponse: any) {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new("chartGraficaBarras");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
      paddingRight: 1
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    xRenderer.grid.template.setAll({
      location: 1
    })

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "recordDate",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: yRenderer
    }));

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "recordDate",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    let data = dataResponse;

    xAxis.data.clear(); // Borra los datos previos del eje X
    series.data.clear(); // Borra los datos previos de la serie
    xAxis.data.setAll(data);
    series.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }

  CrearGrafica2(dataResponse: any) {
    const chartContainerId = "chartGraficaBarras";

    // Check if a root instance already exists for this DOM element
    if (am5.registry.rootElements.some(root => root.dom.id === chartContainerId)) {
      const existingRoot = am5.registry.rootElements.find(root => root.dom.id === chartContainerId);
      if (existingRoot) {
        existingRoot.dispose(); // Dispose of the existing root
      }
    }

    // Create a new root element
    let root = am5.Root.new(chartContainerId);

    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Rest of the chart creation logic remains the same
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0,
      paddingRight: 1
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    xRenderer.grid.template.setAll({
      location: 1
    });

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "recordDate",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    });

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: yRenderer
    }));

    // Create series
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "recordDate",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    // Clear previous data and set new data
    xAxis.data.clear();
    series.data.clear();
    xAxis.data.setAll(dataResponse);
    series.data.setAll(dataResponse);

    // Animations
    series.appear(1000);
    chart.appear(1000, 100);
  }


  loadDefaultChart(idPlant: number) {
    // Generar datos por defecto
    const defaultData = [
      { recordDate: '01/01/2024', value: 100 },
      { recordDate: '02/01/2024', value: 120 },
      { recordDate: '03/01/2024', value: 90 },
      { recordDate: '04/01/2024', value: 150 },
      { recordDate: '05/01/2024', value: 170 },
      { recordDate: '06/01/2024', value: 160 }
    ];

    //Obtener los datos de la planta

    // Crear la gráfica con datos por defecto
    this.CrearGrafica2(defaultData);
  }

  InfoPlant(plantId: number) {
    console.log(plantId);
    const routePath = ['/dashboard/info', plantId];
    console.log('Navigating to:', routePath.join('/'));  // Imprime la ruta como una cadena
    this.router.navigate(routePath);
  }

}


