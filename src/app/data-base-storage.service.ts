import { Injectable, OnDestroy } from '@angular/core';
import { Contact } from './contact.model';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataBaseStorageService implements OnDestroy{

  savedContacts: Contact[] = [];
  public destroyed$ = new Subject();
  private behaviorSavedContacts$ = new BehaviorSubject<Contact[]>([]);
  public savedContacts$ = this.behaviorSavedContacts$.asObservable();

  constructor(public http: HttpClient) { }

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  saveContactList(contactList: Contact[]){
    this.http.post<any>("https://localhost:7261//api/Contact/SaveContacts", contactList,
      {
        headers: {
          'Authorization':
          'Basic xxxxxxxxx'
        }
      }
    ).pipe(
      tap(),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  addContact(contact: Contact){
    this.http.post<any>("https://localhost:7261//api/Contact/AddContact", contact,
      {
        headers: {
          'Authorization':
          'Basic xxxxxxxxx'
        }
      }
    ).pipe(
      tap(),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  getContacts(){
    this.http.get<any>("https://localhost:7261//api/Contact/GetContacts",
      {
        headers: {
          'Authorization':
          'Basic xxxxxxxxxx'
        }
      }
    ).pipe(
      tap((savedContactsDB: Contact[]) => {
        this.savedContacts = savedContactsDB;
        this.behaviorSavedContacts$.next(this.savedContacts); 
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  deleteContact(contactToRemove: Contact){
    this.http.delete<any>("https://localhost:7261//api/Contact/DeleteContact/" + contactToRemove.contactId,
      {
        headers: {
          'Authorization':
          'Basic xxxxxxxxx'
        }
      }
    ).pipe(
      tap(),
      takeUntil(this.destroyed$)
    ).subscribe();
    this.savedContacts = this.savedContacts.filter(c => c.contactId !== contactToRemove.contactId)
  }

  updateContact(contact: Contact){
    this.http.put<any>("https://localhost:7261//api/Contact/UpdateContact/" + contact.contactId, contact,
      {
        headers: {
          'Authorization':
          'Basic xxxxxxxx'
        }
      }
    ).pipe(
      tap(),
      takeUntil(this.destroyed$),
    ).subscribe();
  }


}
