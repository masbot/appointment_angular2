import 'rxjs/Rx';

import {Observable} from "rxjs";
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Appointment} from "../modal/appointment.model";
@Injectable()

export class MonthsService {

    clickDay = new EventEmitter();
    getThisMonth = new EventEmitter();
    nextMonth = new EventEmitter();

    constructor(private http: Http) {}

    active(bool){
        this.clickDay.emit(bool);
    }

    next(obj){
        this.nextMonth.emit(obj);
    }
}