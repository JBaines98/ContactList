import { Component, EventEmitter, Output } from '@angular/core';
import { ContactService } from '../contact.service';
import { FormControl, FormGroup} from '@angular/forms'
import { Contact } from '../contact.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public contactForm = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    addressFirstLine: new FormControl<string>(''),
    addressSecondLine: new FormControl<string>(''),
    cityOrTown: new FormControl<string>(''),
    county: new FormControl<string>(''),
    postCode: new FormControl<string>(''),
    email: new FormControl<string>(''),
    dateOfBirth: new FormControl<string>(''),
    telephone: new FormControl<string>(''),
  });

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

  ngOnInit(){
    this.contactService.contactDetailsToEdit$.pipe(
      tap((contactDetails) => {
        this.contact = contactDetails;
        this.contactForm = this.contact
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

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

  // ngOnInit(): void{
  //   this.contact.valueChanges.pipe(
  //     tap((changes) => {
  //       this.contactEntered.emit(changes);
  //     }),
  //     takeUntil(this.destroyed$)
  //   ).subscribe();
  // }

  goButtonClicked(): void{
    // this.contactEntered.emit(this.contact);
    if (this.contact.firstName && this.contact.lastName) {
      this.contactService.addContact(this.contact);
      console.log(this.contact);
      this.contact = {
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
    }else{
      alert("You must provide a first and last name.");
    };

  };

    clearButtonClicked(): void{
      this.contact = {
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
      console.log("Form cleared.");
    };

    // this.contact.valueChanges.pipe(
    //   tap((changes) => {
    //     this.contactEntered.emit(changes);
    //   }),
    //   takeUntil(this.destroyed$)
    // ).subscribe();

}


