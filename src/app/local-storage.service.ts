import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private behaviorSavedContacts$ = new BehaviorSubject<Contact[]>([{}]);
  public savedContacts$ = this.behaviorSavedContacts$.asObservable();

  constructor() { }

  addContactToSavedArray(){}

  getSavedContactsSaved(){}
}
