import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlantsComponent } from './create-plants.component';

describe('CreatePlantsComponent', () => {
  let component: CreatePlantsComponent;
  let fixture: ComponentFixture<CreatePlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePlantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
