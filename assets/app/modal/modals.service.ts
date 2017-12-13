import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Appointment} from "./appointment.model";
@Injectable()

export class ModalsService {
    private appointments = [];
    private myAppt = [];

    modal = new EventEmitter();
    constructor(private http: Http) {}
    private spaces: number;

    modalOff(bool){
        this.modal.emit(bool)
    }

    addAppointment(appointment: Appointment){
        const body = JSON.stringify(appointment);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('https://syoo-appt.herokuapp.com/appointment' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const appointment = new Appointment(result.obj.barber, result.obj.appointment, result.obj.date, result.obj._id, result.obj.user._id);
                var time = new Date(appointment.appointment);
                var t = time.getDate();
                this.myAppt.push(time);
                var n = this.spaces;
                var index = t + n;
                this.appointments[index-1].appointments.push(time);
                this.appointments[index-1].total++;
                return appointment;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getAppointment(dateData){
        this.createMonth(dateData);

        var month = '?month=' + dateData.month;
        var year = '&test=' + dateData.date.getFullYear();

        return this.http.get('https://syoo-appt.herokuapp.com/appointment' + month + year)
            .map((response: Response) => {
                const appointments = response.json().obj;
                this.transformAppt(appointments);
                return this.appointments;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    //get next month
    //update back end by getting data by date
    //then update the
    getNextAppointment(dateData){
        this.appointments = [];
        this.createMonth(dateData);
        var month = '?month=' + dateData.month;
        var year = '&test=' + dateData.date.getFullYear();
        return this.http.get('https://syoo-appt.herokuapp.com/appointment'+ month + year)
            .map((response: Response) => {
                const appointments = response.json().obj;
                this.transformAppt(appointments);
                return this.appointments;

            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteAppointment(appointment: Appointment){
        this.appointments.splice(this.appointments.indexOf(appointment), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('https://syoo-appt.herokuapp.com/appointment' + appointment.appointmentId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    myAppointment(){
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('https://syoo-appt.herokuapp.com/appointment/myappointment' + token, "", {headers: headers})
            .map((response: Response) => {
                const appointments = response.json().obj;
                this.myAppt = [];
                for(let appt of appointments){
                    var time = new Date(appt.appointment);
                    this.myAppt.push(time);
                }
                return this.myAppt;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    private daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }

    private transformAppt(appointments){
        for(let appt of appointments){
            var time = new Date(appt.appointment);
            var t = time.getDate();
            var n = this.spaces;
            var index = t + n;
            this.appointments[index-1].appointments.push(time);
            this.appointments[index-1].total++;
        }
    }

    private createMonth(dateData){

        var d = dateData.date;
        var days = this.daysInMonth(d.getMonth()+1, d.getFullYear());
        var n =  new Date(d.getFullYear(), d.getMonth(), 1).getDay();
        this.spaces = n;

        for (var i = 1; i < n+1; i++) {
            this.appointments.push({day:'',appointments:[],total:0});
        }

        for (var i = 1; i < days+1; i++) {
            this.appointments.push({day:i,appointments:[],total:0});
        }
    }
}