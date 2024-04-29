import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactToAdd: Contact = {};
  contactToDelete: Contact = {};
  contactList: Contact[] = [];
  contactDetailsToOpen: Contact = {};

  private behaviorContactsList$ = new BehaviorSubject<Contact[]>([{}]);
  public contactsList$ = this.behaviorContactsList$.asObservable();
  private behaviorDetailsToOpen$ = new BehaviorSubject<Contact>({});
  public contactDetailsToOpen$ = this.behaviorDetailsToOpen$.asObservable();


  constructor() {}
   
  addContact(contact: Contact){
    this.contactToAdd = contact;
    this.contactList.push(this.contactToAdd);
    this.behaviorContactsList$.next(this.contactList);
    console.log("Contact added.");
    this.contactToAdd = {};
  };

  openContactDetails(contact: Contact){
    this.contactDetailsToOpen = contact;
    this.behaviorDetailsToOpen$.next(this.contactDetailsToOpen);
  };

  deleteContact(contact: Contact){
    // this.contactToDelete = contact;
    // this.contactList = this.contactList.filter((el) => !contact.includes(el))
    // this.contactList = this.contactList.filter((list) => {
    //   list.firstName === contact.firstName;
    //   list.lastName === contact.lastName;
    //   list.addressFirstLine === contact.addressFirstLine;
    //   list.addressSecondLine === contact.addressSecondLine;
    //   list.cityOrTown === contact.cityOrTown;
    //   list.county === contact.county;
    //   list.postCode === contact.postCode;
    //   list.email === contact.email;
    //   list.dateOfBirth === contact.dateOfBirth;
    //   list.telephone === contact.telephone;
    // });
    // this.behaviorContactsList$.next(this.contactList);
  };
}
