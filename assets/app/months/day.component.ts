import {Component, Input, OnInit} from "@angular/core";
import { MonthsService } from "./months.service";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html'
})

export class DayComponent{

    @Input() ap;
    @Input('dateData') dateData: any;

    constructor(private monthsService: MonthsService){

    }

    onClick(){
        if(this.ap.day){
            this.monthsService.active({day:this.ap.day, dateData: this.dateData, appointments: this.ap.appointments});
        }
    }

}