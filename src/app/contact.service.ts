import { Injectable, OnDestroy } from '@angular/core';
import { Contact } from './contact.model';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { DataBaseStorageService } from './data-base-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnDestroy{

  contactToAdd: Contact = {};
  contactList: Contact[] = [];
  contactToEdit: Contact = {};
  contactDetailsToOpen: Contact = {};

  public destroyed$ = new Subject();
  private behaviorContactsList$ = new BehaviorSubject<Contact[]>([{}]);
  public contactsList$ = this.behaviorContactsList$.asObservable();
  private behaviorDetailsToEdit$ = new BehaviorSubject<Contact>({});
  public contactDetailsToEdit$ = this.behaviorDetailsToEdit$.asObservable();
  private behaviorContactDetails$ = new BehaviorSubject<Contact>({});
  public contactDetails$ = this.behaviorContactDetails$.asObservable();
  private behaviorShowEditOrOpen$ = new BehaviorSubject<string>('edit');
  public showEditOrOpen$ = this.behaviorShowEditOrOpen$.asObservable();

  constructor(public localStorageService: LocalStorageService, public dataBaseStorageService: DataBaseStorageService) {
    this.getContactsFromDB();
  };

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  };

  getContactsFromDB(){
    this.dataBaseStorageService.getContacts();
    this.dataBaseStorageService.savedContacts$.pipe(
      tap((savedContactsFromDB: Contact[]) => {
        this.contactList = savedContactsFromDB;
        this.behaviorContactsList$.next(this.contactList);
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
    console.log("Contacts recieved.");
  }

   
  addContact(contact: Contact){
    // this.contactToAdd = contact;
    // this.contactList.push(this.contactToAdd);
    // this.behaviorContactsList$.next(this.contactList);
    // this.contactToAdd = {};
    this.dataBaseStorageService.addContact(contact);
    this.getContactsFromDB();
    console.log("Contact added.");
    this.contactToAdd = {};
  };

  editContactDetails(contact: Contact){
    // this.contactToEdit = contact;
    // this.behaviorDetailsToEdit$.next(this.contactToEdit);
    // this.behaviorShowEditOrOpen$.next('edit');
    this.dataBaseStorageService.updateContact(contact);
    this.getContactsFromDB();
    console.log("Contact updated.");
    this.contactToEdit = {};
  };

  openContactDetails(contact: Contact){
    this.behaviorContactDetails$.next(contact);
    this.behaviorShowEditOrOpen$.next('open');
  };

  saveContactsList(contactList: Contact[]){
    // this.localStorageService.saveContactList(contactList);
    this.dataBaseStorageService.saveContactList(contactList);
    this.getContactsFromDB();
    console.log("Contacts saved.");
  };

  removeFromSavedContacts(contact: Contact){
    // this.localStorageService.removeFromSavedJobs(contact);
    this.dataBaseStorageService.deleteContact(contact);
    this.getContactsFromDB();
    console.log("Contact deleted.")
  };

  clearSaveJobs(){
    this.localStorageService.clearSavedJobs();
  };

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
