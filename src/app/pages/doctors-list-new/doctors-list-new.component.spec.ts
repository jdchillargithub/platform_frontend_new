import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsListNewComponent } from './doctors-list-new.component';

describe('DoctorsListNewComponent', () => {
  let component: DoctorsListNewComponent;
  let fixture: ComponentFixture<DoctorsListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsListNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorsListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
