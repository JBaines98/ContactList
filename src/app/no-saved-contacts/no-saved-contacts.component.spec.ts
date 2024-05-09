import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSavedContactsComponent } from './no-saved-contacts.component';

describe('NoSavedContactsComponent', () => {
  let component: NoSavedContactsComponent;
  let fixture: ComponentFixture<NoSavedContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoSavedContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoSavedContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
