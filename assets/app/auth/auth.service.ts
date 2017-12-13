import 'rxjs/Rx';
import {Injectable, EventEmitter} from "@angular/core";
import {User} from "./user.modal";
import {Headers, Response, Http} from "@angular/http";
import {Observable} from "rxjs";
@Injectable()

export class AuthService {

    clicksignup = new EventEmitter();
    clicksignin = new EventEmitter();
    aboutIn = new EventEmitter();

    constructor(private http: Http){}

    // clickSignUp(data){
    //     this.clicksignup.emit(data);
    // }
    //
    // clickSignIn(data){
    //     this.clicksignin.emit(data);
    // }

    signup(user:User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('https://syoo-appt.herokuapp.com/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    signin(user:User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('https://syoo-appt.herokuapp.com/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

    about(){
        this.aboutIn.emit();
    }


}