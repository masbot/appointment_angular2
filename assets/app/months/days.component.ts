import {Component, Input, OnInit} from "@angular/core";
import {ModalsService} from "../modal/modals.service";
import {MonthsService} from "./months.service";
@Component({
    selector: 'app-days',
    template: `
        <ul class="dates">
            <app-day
                [dateData]="dateData"
                [ap]="ap"
                *ngFor="let ap of appt">
                
            </app-day>
        </ul>
    `
})

export class DaysComponent implements OnInit{

    @Input('dateData') dateData: any;
    date = [];
    appt: any[] = [];

    constructor(private modalsService: ModalsService, private monthsService: MonthsService) {}

    ngOnInit() {
        this.modalsService.getAppointment(this.dateData)
            .subscribe(
                (appointments: any[]) =>{
                    this.appt = appointments;
                }
            );

        this.monthsService.nextMonth.subscribe(
            data => {
                this.getNextMonth(data);
            }
        );
    }

    getNextMonth(dateData){
        this.modalsService.getNextAppointment(dateData)
            .subscribe(
                (appointments: any[]) => {
                    this.appt = appointments;
                }
            )
    }

}