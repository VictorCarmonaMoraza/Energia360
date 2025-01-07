import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantStatisticsComponent } from './plant-statistics.component';

describe('PlantStatisticsComponent', () => {
  let component: PlantStatisticsComponent;
  let fixture: ComponentFixture<PlantStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
