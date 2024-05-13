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

  public destroyed$ = new Subject();
  @Input() showFunctions: boolean = false;
  @Input() contact: Contact = {};
  @Input() indexNumber: number = 0;

  isExpanded: boolean = false;

  constructor(public contactService: ContactService){}

  ngOnInit(){
    this.indexNumber = this.indexNumber + 1;
  }


  deleteContact(){
    this.contactService.deleteContact(this.contact);
  };

  openContactDetails(){
    this.contactService.openContactDetails(this.contact);
  };

  removeFromSavedJobs(){
    this.contactService.removeFromSavedjobs(this.contact);
  };

  expandClicked(){
    if(this.isExpanded === false){
      this.isExpanded = true;
    }else{
      this.isExpanded = false;
    }
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
