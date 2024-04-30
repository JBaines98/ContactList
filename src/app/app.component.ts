import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContactList';
  contactList: Contact[] = [];
  contactListString: any = null;
  public destroyed$ = new Subject();

  constructor(public contactService: ContactService){}

  ngOnInit(){
    this.contactService.contactsList$.pipe(
      tap((contactList) => {
        this.contactList = contactList;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
    let savedContacts = localStorage.getItem('app.contactList');
    this.contactListString = savedContacts;
    console.log(this.contactListString);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  saveContactList(){
    let contactListToSave = this.contactList;
    localStorage.setItem('app.contactList', JSON.stringify(contactListToSave));
  }

  //below should input parameter should be of type contact.
    contactEntered(contact: any){}
}
