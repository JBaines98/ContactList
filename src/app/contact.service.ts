import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactToAdd: Contact = {};
  contactList: Contact[] = [];

  private behaviorContactsList$ = new BehaviorSubject<Contact[]>([{}]);
  public contactsList$ = this.behaviorContactsList$.asObservable();


  constructor() {}
   
  addContact(contact: Contact){
    this.contactToAdd = contact;
    this.contactList.push(this.contactToAdd);
    this.behaviorContactsList$.next(this.contactList);
    console.log("hello");
  }
}
