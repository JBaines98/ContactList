import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  // public contact: Contact = {};

  constructor(public contactService: ContactService){}

  reactiveForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    addressFirstLine: new FormControl(''),
    addressSecondLine: new FormControl(''),
    cityOrTown: new FormControl(''),
    county: new FormControl(''),
    dateOfBirth: new FormControl(''),
    telephone: new FormControl(0),
  })

}
