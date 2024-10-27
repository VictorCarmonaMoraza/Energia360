import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UppFilesPlantsComponent } from './upp-files-plants.component';

describe('UppFilesPlantsComponent', () => {
  let component: UppFilesPlantsComponent;
  let fixture: ComponentFixture<UppFilesPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UppFilesPlantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UppFilesPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
