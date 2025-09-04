import { Component } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';


import { LabeledTextDetails } from "../labeled-text-details/labeled-text-details";
import { LabeledTextInput } from '../labeled-text-details/labeled-text-input.modal';



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

  personalInfo: LabeledTextInput = {
    label: 'AMKA',
    text: '2910300000',
    icon: 'idcard',
    type: 'text',
  };

  fathersName: LabeledTextInput = {
    label: 'Όνομα Πατρός:',
    text: 'Αθανάσιος',
    icon: 'user',
    type: 'text',
  };

  emergencyCall: LabeledTextInput = {
    label: 'Επαφή Άμεσης Ανάγκης:',
    text: 'Aθανάσιος Κωνσταντίνος',
    icon: 'star',
    type: 'text',
  };

  contact: LabeledTextInput = {
    label: 'Οικίας',
    text: '2410579060',
    icon: 'phone',
    type: 'telephone',
  };

  email: LabeledTextInput = {
    label: 'Email:',
    text: 'info@info-domain.com',
    icon: 'mail',
    type: 'url',
  };

  address: LabeledTextInput = {
    label: 'Διεύθυνση:',
    text: 'Φαρσάλων 15Α, Λάρισα, 41223',
    icon: 'environment',
    type: 'url',
  };

  // readonly userInfo = {
  //   amka: '2910300000',
  //   number: '69000000',
  //   fathersName: 'Αθανάσιος',
  //   emergencyContact: 'Αθανάσιος Κωνσταντίνος',
  //   phoneCall: '2410579060',
  //   email: 'info@info-domain.com',
  //   address: 'Φαρσάλων 15Α, Λάρισα, 41223',
  //   user: 'user',
  //   star: 'star',
  //   idcard: 'idcard',
  //   environment: 'environment',
  //   mail: 'mail',
  //   phone: 'phone'
  // };
}
