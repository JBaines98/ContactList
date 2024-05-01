import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  savedContacts: any = undefined;

  private behaviorSavedContacts$ = new BehaviorSubject<Contact[]>([{}]);
  public savedContacts$ = this.behaviorSavedContacts$.asObservable();

  constructor() { }


  saveContactList(contactList: Contact[]){
    let contactListToSave = contactList;
    localStorage.setItem('app.contactList', JSON.stringify(contactListToSave));
    console.log("Contacts Saved.");
  };

  removeFromSavedJobs(contact: Contact){
    const index: number = this.savedContacts.indexOf(contact);
    this.savedContacts.splice(index, 1);
    // if(index !== 1 && index !==0){

    //   console.log("IF HIT");
    // }
    localStorage.setItem('app.contactList', JSON.stringify(this.savedContacts));
    this.behaviorSavedContacts$.next(this.savedContacts);
    console.log("Removed from saved contacts.");
  };

  clearSavedJobs(){
    localStorage.clear();
    this.savedContacts = [{}];
    this.behaviorSavedContacts$.next(this.savedContacts);
    console.log("Saved jobs cleared.");
    
  };

  getSavedContactsSaved(){
    if(localStorage !== null){
      this.savedContacts = JSON.parse(localStorage.getItem('app.contactList') || '[{}]');
      this.behaviorSavedContacts$.next(this.savedContacts);
      console.log("TEST");
    }else{
      console.log("No saved contacts.")
    }

  };


}
