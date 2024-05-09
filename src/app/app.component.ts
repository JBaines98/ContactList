import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ContactList';
  contactList: Contact[] = [];
  showContactList: boolean = true;
  searchFilter?: string = undefined;
  searchParamters?: string = undefined;
  data?: any = undefined;

  public behaviorSearchFilter$ = new BehaviorSubject<any>('');
  public searchFilter$ = this.behaviorSearchFilter$.asObservable();

  public destroyed$ = new Subject();

  constructor(public contactService: ContactService) {}

  ngOnInit() {
    combineLatest([this.searchFilter$, this.contactService.contactsList$])
      .pipe(
        tap(
          ([searchFilter, contactList]) =>
            this.contactList = contactList.filter((x) =>
              x.lastName?.includes(searchFilter)
            )
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe();

    // this.contactService.contactsList$.pipe(
    //   tap((contactList) => {
    //     this.contactList = contactList;
    //   }),

    // ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  saveContactList() {
    this.contactService.saveContactsList(this.contactList);
  }

  clearSavedJobs() {
    this.contactService.clearSaveJobs();
    this.showContactList = false;
  }

  searchFilterInputed(){
    this.searchFilter = this.searchParamters;
    this.behaviorSearchFilter$.next(this.searchFilter);
  };

  clearSearchFilterInputed(){
    this.searchFilter = '';
    this.behaviorSearchFilter$.next(this.searchFilter);
  };

  //below should input parameter should be of type contact.
  contactEntered(contact: any) {}
}
