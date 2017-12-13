import {Component} from "@angular/core";
import {MonthsService} from "./months.service";
@Component({
    selector:'app-month',
    templateUrl: './month.component.html'
})

export class MonthComponent {
    month = [];
    dateData = {
        date: null,
        monthName: null,
        month: null
    };

    constructor(private monthsService: MonthsService){
        //var month = new Array();
        this.month[0] = "January";
        this.month[1] = "February";
        this.month[2] = "March";
        this.month[3] = "April";
        this.month[4] = "May";
        this.month[5] = "June";
        this.month[6] = "July";
        this.month[7] = "August";
        this.month[8] = "September";
        this.month[9] = "October";
        this.month[10] = "November";
        this.month[11] = "December";

        var d = new Date();
        var n = this.month[d.getMonth()];
        this.dateData.date = d;
        this.dateData.monthName = n;
        this.dateData.month = d.getMonth();
    }

    next(){
        var dateData = this.dateData;
        var d = new Date();
        var month = dateData.month += 1;
        dateData.monthName = this.month[month];
        d.setMonth(month);
        dateData.date = d;
        this.monthsService.next(dateData);
    }

}