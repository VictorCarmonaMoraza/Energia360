import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyPlantsComponent } from './energy-plants.component';

describe('EnergyPlantsComponent', () => {
  let component: EnergyPlantsComponent;
  let fixture: ComponentFixture<EnergyPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyPlantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
