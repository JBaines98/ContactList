import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FormComponent } from './form/form.component';
import { NoSavedContactsComponent } from "./no-saved-contacts/no-saved-contacts.component";
import { NumberOfContactsComponent } from "./number-of-contacts/number-of-contacts.component";
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContactListComponent,
        FormComponent ,

    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        NoSavedContactsComponent,
        NumberOfContactsComponent,
        ContactDetailsComponent,
        ReactiveFormsModule,
        HttpClientModule,
    ]
})
export class AppModule { }
