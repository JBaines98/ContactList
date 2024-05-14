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
  searchBySelect: string = '';
  showEditOrOpen: string = 'edit';
  contactSelected: Contact = {};

  public behaviorSearchFilter$ = new BehaviorSubject<any>('');
  public searchFilter$ = this.behaviorSearchFilter$.asObservable();

  public destroyed$ = new Subject();

  constructor(public contactService: ContactService) {};

  ngOnInit() {
    combineLatest([this.searchFilter$, this.contactService.contactsList$])
      .pipe(
        tap(
          ([searchFilter, contactList]) =>
            {
              this.searchByFilter(searchFilter, contactList)
            }
        ),
        takeUntil(this.destroyed$)
      ).subscribe();

      this.contactService.contactDetails$.pipe(
        tap((contactDetails) => {
          this.contactSelected = contactDetails;
          // if(this.contactSelected){
          //   this.showContactDetails = true;
          // };
        }),
        takeUntil(this.destroyed$)
      ).subscribe();

      this.contactService.showEditOrOpen$.pipe(
        tap((showEditOrOpen) => {
          this.showEditOrOpen = showEditOrOpen;
        }),
        takeUntil(this.destroyed$)
      ).subscribe();

    // this.contactService.contactsList$.pipe(
    //   tap((contactList) => {
    //     this.contactList = contactList;
    //   }),

    // ).subscribe();
  };

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  };

  searchByFilter(searchFilter: string, contactList: Contact[]){
    switch(this.searchBySelect){
      case 'firstName': {
        this.contactList = contactList.filter((x) => 
        x.firstName?.includes(searchFilter))
        break;
      }
      case 'lastName': {
        this.contactList = contactList.filter((x) =>
        x.lastName?.includes(searchFilter))
        break;
      }
      case 'addressFirstLine': {
        this.contactList = contactList.filter((x) => 
        x.addressFirstLine?.includes(searchFilter))
        break;
      }
      case 'addressSecondLine': {
        this.contactList = contactList.filter((x) => 
        x.addressSecondLine?.includes(searchFilter))
        break;
      }
      case 'cityOrTown': {
        this.contactList = contactList.filter((x) => 
        x.cityOrTown?.includes(searchFilter))
        break;
      }
      case 'county': {
        this.contactList = contactList.filter((x) =>
        x.county?.includes(searchFilter))
        break;
      }
      case 'postCode': {
        this.contactList = contactList.filter((x) =>
        x.postCode?.includes(searchFilter))
        break;
      }
      case 'email': {
        this.contactList = contactList.filter((x) => 
        x.email?.includes(searchFilter))
        break;
      }
      case 'dateOfBirth': {
        this.contactList = contactList.filter((x) =>
        x.dateOfBirth?.includes(searchFilter))
        break;
      }
      case 'telephone': {
        this.contactList = contactList.filter((x) =>
        x.telephone?.includes(searchFilter))
        break;
      }
      default: {
        this.contactList = contactList
        break;
      }
    }
  };

  saveContactList() {
    this.contactService.saveContactsList(this.contactList);
  };

  clearSavedJobs() {
    this.contactService.clearSaveJobs();
    this.showContactList = false;
  };

  openDetailsClicked(contactDetails: Contact){
    this.showEditOrOpen = 'open';
    this.contactSelected = contactDetails;
    console.log("JACK IS GREAT")
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
