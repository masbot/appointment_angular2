import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {MonthsService} from "../months/months.service";
import {Appointment} from "./appointment.model";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ModalsService} from "./modals.service";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit{
    appointment: Appointment;
    myForm: FormGroup;
    times = ['10:00AM', '11:00AM', '12:00PM', '01:00PM', '02:00PM', '03:00PM', '04:00PM', '05:00PM', '06:00PM', '07:00PM'];
    barbers = ['Mario', 'Goodman'];
    availableTime = [];
    isWell: boolean = true;
    date: string;
    today: any;
    appt: any;
    showTime:any;
    // isLoggedIn = false;

    time = undefined;
    barber = undefined;
    _activeTime = undefined;
    _activeBarber = undefined;

    @Output() modalIn = new EventEmitter();

    constructor(private monthsService: MonthsService,
                private modalsService: ModalsService,
                private authService: AuthService
    ){}

    setClass(){
        let classes = {
            well:this.isWell
        };

        return classes;
    }

    modalClick(){
        this.modalIn.emit(false);
    }

    onSubmit() {
        //console.log("isLoggedIn: ", this.isLoggedIn);
        // if(this.isLoggedIn){
        //     this.time = undefined;
        //     this.barber = undefined;
        //     this._activeBarber = undefined;
        //     this._activeTime = undefined;
        //     alert("must be logged in");
        //     return false;
        // }

        var isLogged = this.isLoggedIn();

        if(isLogged){
            var time = this.time;
            if(time.indexOf("PM") > -1){
                time = parseInt(time.substring(0,2));
                time = time + 12;
            }else{
                time = parseInt(time.substring(0,2));
            }

            this.appt.setHours(time);
            this.appt.setMinutes(0);
            this.appt.setSeconds(0);

            const appointment = new Appointment(
                this.barber,
                this.appt,
                new Date()
            );

            this.modalsService.addAppointment(appointment)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );

            this.reset();
        }else{
            alert("please sign in");
        }
    }

    onClickTime(time, index){
        if(index != this._activeTime){
            this.time = time;
            this._activeTime = index;
        }else{
            this.time = undefined;
            this._activeTime = undefined;
        }
    }

    onClickBarber(barber, index){
        if(index != this._activeBarber){
            this.barber = barber;
            this._activeBarber = index;
        }else{
            this.barber = undefined;
            this._activeBarber = undefined;
        }
    }

    reset(){
        this.time = undefined;
        this.barber = undefined;
        this._activeBarber = undefined;
        this._activeTime = undefined;
    }

    ngOnInit( ) {
        this.monthsService.clickDay.subscribe(
            data => {
                var d = data.dateData.date;
                var time = new Date(d.setDate(data.day));
                var appointments = data.appointments;
                this.showTime = time.toString().substring(0,15);
                this.appt = new Date(d.setDate(data.day));
                this.date = d;

                this.setAvailTime(appointments);
                this.modalIn.emit(true);
            }
        );

        this.myForm = new FormGroup({
            time: new FormControl(null, Validators.required),
            barber: new FormControl(null, Validators.required)
        });
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    setAvailTime(appointments){
        this.availableTime = [];
        var availTime = this.times;
        var scheTime = [];

        for( let appt of appointments ){
            var hour = appt.getHours();
            scheTime.push(hour);
        }

        for(let time of availTime){
            var t = null;
            if(time.indexOf("PM") > -1){
                t = parseInt(time.substring(0,2));
                t = t + 12;
            }else{
                t = parseInt(time.substring(0,2));
            }

            if(scheTime.indexOf(t) == -1){
                this.availableTime.push(time);
            }
        }
    }

}