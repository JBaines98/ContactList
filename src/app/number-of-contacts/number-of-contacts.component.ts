import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-number-of-contacts',
  standalone: true,
  imports: [],
  templateUrl: './number-of-contacts.component.html',
  styleUrl: './number-of-contacts.component.css'
})
export class NumberOfContactsComponent {

  numberOfContacts: number = 0;
  public destroyed$ = new Subject();

  constructor(public contactService: ContactService){}

  ngOnInit(){
    this.contactService.contactsList$.pipe(
      tap((contactList) => {
        this.numberOfContacts = contactList.length;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  };
}
