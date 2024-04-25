import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

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
  }

}
