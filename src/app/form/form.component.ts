import { Component, EventEmitter, Output } from '@angular/core';
import { ContactService } from '../contact.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact } from '../contact.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public contact: any = {
    firstName: '',
    lastName: '',
    addressFirstLine: '',
    addressSecondLine: '',
    cityOrTown: '',
    county: '',
    postCode: '',
    email: '',
    dateOfBirth: '',
    telephone: ''
  };
  public destroyed$ = new Subject();

  constructor(public contactService: ContactService){}

  @Output() contactEntered = new EventEmitter();

  // contactForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   addressFirstLine: new FormControl(''),
  //   addressSecondLine: new FormControl(''),
  //   cityOrTown: new FormControl(''),
  //   county: new FormControl(''),
  //   postCode: new FormControl(''),
  //   email: new FormControl(''),
  //   dateOfBirth: new FormControl(''),
  //   telephone: new FormControl(0),
  // })

  ngOnInit(): void{
    this.contact.valueChanges.pipe(
      tap((changes) => {
        this.contactEntered.emit(changes);
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  goButtonClicked(){
    this.contact.valueChanges.pipe(
      tap((changes) => {
        this.contactEntered.emit(changes);
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

}
