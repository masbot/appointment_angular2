import {Component, OnInit, Input} from "@angular/core";
import {ModalsService} from "./modals.service";

@Component({
    selector: 'app-modals',
    template: `
        <app-modal class="fade modal" [class.in]="inModal" [ngStyle]="{'display':isBlock}" (modalIn)="modalIn($event)" (click)="onClick()">

        </app-modal>  
        `
})

export class ModalsComponent{

    isBlock = 'none';
    inModal = false;
    modal1 = true;

    constructor(private modalsService: ModalsService){}

    modalIn(data){
        if(data){
            this.isBlock = 'block';
            setTimeout(() => {
                this.inModal = true;
            }, 100);
        }else{
            this.modal1 = false;
        }
    }

    onClick(){
        if(this.modal1){
            this.isBlock = 'none';
            this.inModal = false;
            this.modalsService.modalOff(true);
        }else{
            this.modal1 = true;
        }

    }

}