import { Component, OnInit } from '@angular/core';
import { PassengerDashboardService } from '../../passenger-dashboard.service';
import { Passenger } from '../../models/passenger.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap'

@Component({
    selector: 'passenger-viewer',
    styleUrls: ['passenger-viewer.component.scss'],
    template: `
    <div>   
        <button (click)="goBack()">
           &lsaquo; Go Back
        </button>
        <passenger-form
        [detail]="passenger"
        (update)="onUpdatePassenger($event)"
        ></passenger-form>
    </div>
    `
})
export class PassengerViewerComponent implements OnInit {

    passenger: Passenger;

    constructor(
         private router: Router, 
         private route: ActivatedRoute, 
         private passengerService: PassengerDashboardService) {}
    ngOnInit() {

        this.route.params
            .switchMap((data: Passenger) => this.passengerService.getPassenger(data.id))
            .subscribe((data: Passenger) => this.passenger = data);
    }

    onUpdatePassenger(event: Passenger) {
        console.log(event);
        this.passengerService
        .updatePassengers(event)
        .subscribe((data: Passenger) => {
            this.passenger = Object.assign({}, this.passenger, event);
        });
    }

    goBack() {
        this.router.navigate(['/passengers']);
    }
}