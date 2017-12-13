import {NgModule} from "@angular/core";
import {MonthsComponent} from "./months.component";
import {MonthComponent} from "./month.component";
import {DaysComponent} from "./days.component";
import {DayComponent} from "./day.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations:[
        MonthsComponent,
        MonthComponent,
        DaysComponent,
        DayComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: []
})

export class MonthModule{

}