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

  public destroyed$ = new Subject();

  constructor(public contactService: ContactService){}

  ngOnInit(){
    this.contactService.contactsList$.pipe(
      tap((contactList) => {
        this.contactList = contactList;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();

  };

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  };

  saveContactList(){
    this.contactService.saveContactsList(this.contactList);
  };

  clearSavedJobs(){
    this.contactService.clearSaveJobs();
  };

  //below should input parameter should be of type contact.
    contactEntered(contact: any){};
}
