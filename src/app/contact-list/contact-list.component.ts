import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  public destroyed$ = new Subject();
  @Input() showFunctions: boolean = false;
  @Input() contact: Contact = {};
  @Input() indexNumber: number = 0;
  @Output() openDetailsClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() contactToEmit: EventEmitter<Contact> = new EventEmitter();

  isExpanded: boolean = false;

  constructor(public contactService: ContactService){}

  ngOnInit(){
    this.indexNumber = this.indexNumber + 1;
  }


  deleteContact(){
    this.contactService.deleteContact(this.contact);
  };

  editContactDetails(){
    this.contactService.editContactDetails(this.contact);
  };

  removeFromSavedJobs(){
    this.contactService.removeFromSavedjobs(this.contact);
  };

  openContactDetails(){
    this.openDetailsClicked.emit(true);
    this.contactToEmit.emit(this.contact);
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
