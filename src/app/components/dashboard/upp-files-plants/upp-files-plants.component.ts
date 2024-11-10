import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { PlantService } from '../../../services/plant.service';

@Component({
  selector: 'app-upp-files-plants',
  templateUrl: './upp-files-plants.component.html',
  styleUrl: './upp-files-plants.component.scss'
})
export class UppFilesPlantsComponent {
  data: any[] = []; // Aquí almacenaremos los datos del Excel

  constructor(private plantService: PlantService) {

  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      console.error('Cannot use multiple files');
      return;
    }

    const file: File = target.files[0];
    this.loadData(file);
  }

  loadData(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.plantService.importFile(formData).subscribe({
      next: (success) => console.log('Import was successful:', success),
      error: (error) => console.error('Import failed:', error)
    });
  }
}
