import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfContactsComponent } from './number-of-contacts.component';

describe('NumberOfContactsComponent', () => {
  let component: NumberOfContactsComponent;
  let fixture: ComponentFixture<NumberOfContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberOfContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberOfContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
