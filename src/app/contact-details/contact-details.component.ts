import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {


@Input() contactDetails: Contact = {};
contact: Contact = {};

constructor(public contactService: ContactService){}

ngOnInit(){
  this.contact = this.contactDetails;
}

}
