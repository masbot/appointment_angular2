import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";
import {ModalsService} from "../modal/modals.service";
@Component({
    selector: 'app-header',
    templateUrl: './authentication.component.html'
})

export class AuthenticationComponent implements OnInit{

    constructor(private authService: AuthService, private modalsService: ModalsService){
        this.signin();
    }

    isSignIn = true;
    isAbout = false;
    myAppt = [];

    signup(){
        this.isSignIn = false;
    }

    signin(){
        this.isSignIn = true;
    }

    about(){
        this.isAbout = true;
    }

    back(){
        this.isAbout = false;
    }

    onLogout(){
        this.authService.logout();
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    getMyAppt(){
        this.modalsService.myAppointment()
            .subscribe(
                data => {
                    this.myAppt = data;
                },
                error => console.error(error)
            )
    }

    userSignIn(){
        this.myAppt = [];
        this.getMyAppt();
    }

    ngOnInit(){
        this.getMyAppt();

        this.authService.aboutIn.subscribe(
            data => {
                console.log("aboutttt");
                this.isAbout = true;
            }
        );
    }

}