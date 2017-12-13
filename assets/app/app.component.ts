import {Component, Input, OnInit} from '@angular/core';
import {MonthsService} from "./months/months.service";
import {ModalsService} from "./modal/modals.service";
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MonthsService, ModalsService, AuthService]
})
export class AppComponent implements OnInit{

    overlayHtml: any = '';
    isLoggedIn = false;

    constructor(private monthsService: MonthsService,
                private modalsService: ModalsService
    ){}


    ngOnInit( ) {
        this.monthsService.clickDay.subscribe(
            data => {
                if(data){
                    this.overlayHtml = '<div class="modal-backdrop fade in"></div>';
                }
            }
        );

        this.modalsService.modal.subscribe(
            result => {
                this.overlayHtml = '';
            }
        )
    }

}