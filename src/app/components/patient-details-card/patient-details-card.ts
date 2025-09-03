import { Component } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';


import { LabeledTextDetails } from "../labeled-text-details/labeled-text-details";



@Component({
  selector: 'app-patient-details-card',
  imports: [
    NzImageModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    NzTagModule,
    LabeledTextDetails,
],
  templateUrl: './patient-details-card.html',
  styleUrl: './patient-details-card.scss'
})
export class PatientDetailsCard {
  readonly userInfo = {
    amka: '2910300000',
    number: '69000000',
    fathersName: 'Αθανάσιος',
    emergencyContact: 'Αθανάσιος Κωνσταντίνος',
    phoneCall: '2410579060',
    email: 'info@info-domain.com',
    address: 'Φαρσάλων 15Α, Λάρισα, 41223',
    user: 'user',
    star: 'star',
    idcard: 'idcard',
    environment: 'environment',
    mail: 'mail',
    phone: 'phone'
  };
}
