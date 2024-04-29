import { Component, Input } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  contactToDelete: Contact = {};

  public destroyed$ = new Subject();
  @Input() showFunctions: boolean = false;
  @Input() contact: Contact = {};

  constructor(public contactService: ContactService){}


  deleteContact(){
    this.contactToDelete = this.contact;
    this.contactService.deleteContact(this.contact);
  };

  openContactDetails(){
    this.contactService.openContactDetails(this.contact);
  }

  // ngOnInit(){
  //   this.contactService.contactsList$.pipe(
  //     tap((contactList) => {
  //       this.contactList = contactList;
  //     }),
  //     takeUntil(this.destroyed$)
  //   ).subscribe();
  // }

  // ngOnDestroy(): void {
  //   this.destroyed$.next(this.destroyed$);
  //   this.destroyed$.complete();
  // }

}
