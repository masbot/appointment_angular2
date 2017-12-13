import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
@Component({
    selector: 'app-about',
    templateUrl: './about.component.html'
})

export class AboutComponent{

    constructor(private authService: AuthService){

        this.authService.about();

    }

}