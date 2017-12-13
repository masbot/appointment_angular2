import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";

import {ModalComponent} from "./modal/modal.component";
import {ModalsComponent} from "./modal/modals.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {SignUpComponent} from "./auth/signup.component";
import {AuthService} from "./auth/auth.service";
import {SignInComponent} from "./auth/signin.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { routing } from "./app.routing";
import {HttpModule} from "@angular/http";
import {AdminComponent} from "./admin/admin.component";
import {MonthModule} from "./months/month.module";
import { AboutComponent } from "./auth/about.component";

@NgModule({
    declarations: [
        AppComponent,
        ModalComponent,
        ModalsComponent,
        AuthenticationComponent,
        SignUpComponent,
        SignInComponent,
        AdminComponent,
        AboutComponent
    ],
    providers: [AuthService],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        MonthModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}