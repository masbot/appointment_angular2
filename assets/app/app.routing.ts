import {RouterModule, Routes} from "@angular/router";
import {MonthsComponent} from "./months/months.component";
import {AdminComponent} from "./admin/admin.component";
import { AboutComponent } from "./auth/about.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/calendar', pathMatch: 'full'},
    {path: 'calendar', component: MonthsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'admin', component: AdminComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);