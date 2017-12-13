import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from "@angular/core";
import {AuthService} from "./auth.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "./user.modal";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit, OnChanges{

    @Output() userSignIn = new EventEmitter();
    @Input() isSignIn;
    myForm: FormGroup;
    isFadeSign = false;

    constructor(private authService: AuthService, private router: Router){
    }

    onSubmit(){
        var user = new User(
            this.myForm.value.email,
            this.myForm.value.password
        );

        this.authService.signin(user)
            .subscribe(
                data => {
                    console.log(data);
                    //store token in localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);

                    //get user's appt
                    this.userSignIn.emit(true);

                    //redirect
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
    }

    ngOnInit(){
        console.log(this.isSignIn);
        this.isFadeSign = this.isSignIn;

        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    ngOnChanges(data){
        this.isFadeSign = this.isSignIn;
    }

}