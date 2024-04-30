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

  ngOnInit(){

  }

  saveContactList(contactList: Contact[]){
    let contactListToSave = contactList;
    localStorage.setItem('app.contactList', JSON.stringify(contactListToSave));
    console.log("Contacts Saved.");
  }

  getSavedContactsSaved(){
    if(localStorage !== null){
      this.savedContacts = JSON.parse(localStorage.getItem('app.contactList') || '[{}]');
      this.behaviorSavedContacts$.next(this.savedContacts)
      console.log("TEST");
    }else{
      console.log("No saved contacts.")
    }

  }


}
