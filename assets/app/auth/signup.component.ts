import {Component, OnInit, Input, OnChanges} from "@angular/core";
import {AuthService} from "./auth.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "./user.modal";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignUpComponent implements OnInit, OnChanges{

    myForm: FormGroup;
    isFadeSign = false;
    @Input() isSignIn;

    constructor(private authService: AuthService){}

    onSubmit(){
        var user = new User(
            this.myForm.value.email,
            this.myForm.value.password
        );

        if(this.myForm.value.password != this.myForm.value.confirm){
            alert("passwords are not the same");
            return false;
        }

        this.authService.signup(user)
            .subscribe(
                data => console.log(data)
            );

        this.myForm.reset();
    }

    ngOnInit( ) {
        this.isFadeSign = !this.isSignIn;

        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required),
            confirm: new FormControl(null)
        });
    }

    ngOnChanges(data){
        this.isFadeSign = !this.isSignIn;
    }

}