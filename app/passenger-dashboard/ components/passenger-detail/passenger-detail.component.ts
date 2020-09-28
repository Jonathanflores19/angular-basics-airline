import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';


@Component({
    selector: 'passenger-detail',
    styleUrls: ['passenger-detail.component.scss'],
    template: `
    <hr>
    <div> 
        <span class="status" [class.checked-in]="detail.checkedin">  </span>   
            <div *ngIf="editing">
                <input type="text" 
                [value]="detail.fullname"
                (input)="onNameChange(name.value)"
                #name>
            </div>
            <div *ngIf="!editing">
                {{ detail.fullname }}
            </div>
            <div class="date">
                Check in date:
                {{ detail.checkInDate ? (detail.checkInDate | date: yMMMMd): 'N/A'}}
            </div>
            <button (click)="toggleEdit()">{{ editing ? 'Done': 'Edit'}}</button>
            <button (click)="onDelete()">Delete</button>
            <button (click)="navigatePassenger()">Go to Passenger</button>
    </div>
    <hr>
    `
})
export class PassengerDetailComponent implements OnChanges {
    @Input() detail: Passenger; 
    @Output() remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();
    @Output() edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();
    @Output() view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    editing: Boolean = false;


    constructor() {}

    ngOnChanges(changes) {
        if (changes.detail) {
            this.detail = Object.assign({}, changes.detail.currentValue)
        }
        console.log(changes);
    }

    navigatePassenger() {
        this.view.emit(this.detail);
    }

    onNameChange(name: string) {
        this.detail.fullname = name;
    }
    toggleEdit() {
        if (this.editing) {
            this.edit.emit(this.detail);
        }
        this.editing = !this.editing;

    }
    onDelete() {
        this.remove.emit(this.detail)
    }
}