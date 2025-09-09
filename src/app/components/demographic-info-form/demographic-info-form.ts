import { CommonModule } from '@angular/common';
import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-demographic-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzDividerModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzDatePickerModule,
],
  templateUrl: './demographic-info-form.html',
  styleUrl: './demographic-info-form.scss'
})
export class DemographicInfoForm {
  @Input() index!: number;

  @ViewChild('suffixSearchIcon', { static: true }) suffixSearchIcon!: TemplateRef<any>;


  private formBuilder = inject(FormBuilder);
  private drawerRef = inject(NzDrawerRef);

  demographicInfoForm = this.formBuilder.group({
    birthDate: [null],
    birthPlace: [''],
    amka: [''],
    code: [''],
    firstName: [''],
    lastName: [''],
  });


  closeDrawer(): void {
    this.drawerRef.close();
  }

  submitForm(): void {}
}
