import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactToAdd: Contact = {};
  contactList: Contact[] = [];
  contactDetailsToOpen: Contact = {};

  public destroyed$ = new Subject();
  private behaviorContactsList$ = new BehaviorSubject<Contact[]>([{}]);
  public contactsList$ = this.behaviorContactsList$.asObservable();
  private behaviorDetailsToOpen$ = new BehaviorSubject<Contact>({});
  public contactDetailsToOpen$ = this.behaviorDetailsToOpen$.asObservable();

  constructor(public localStorageService: LocalStorageService) {
    this.localStorageService.getSavedContactsSaved()
    this.localStorageService.savedContacts$.pipe(
      tap((savedContactList: any) => {
        this.contactList = savedContactList;
        this.behaviorContactsList$.next(this.contactList);
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  };
   
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

  saveContactsList(contactList: Contact[]){
    this.localStorageService.saveContactList(contactList);
  }

  deleteContact(contact: Contact){
    const index: number = this.contactList.indexOf(contact);
    if(index !== -1){
      this.contactList.splice(index, 1);
    }
    this.behaviorContactsList$.next(this.contactList);

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
