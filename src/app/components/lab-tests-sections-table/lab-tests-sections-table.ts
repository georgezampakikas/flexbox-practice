import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { UserService } from '../../shared/user-service';
import { take } from 'rxjs';
import { LabTestGroup, LabTestV2Dto } from '../../shared/patient-modal';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-lab-tests-sections-table',
  imports: [
    FormsModule,
    NzDividerModule,
    NzButtonModule,
    NzFormModule,
    NzCheckboxModule,
    NzIconModule
],
  templateUrl: './lab-tests-sections-table.html',
  styleUrl: './lab-tests-sections-table.scss'
})
export class LabTestsSectionsTable implements OnInit {
  labTestsByCategory: LabTestGroup[] = [];
  selectedValues: LabTestV2Dto[] = [];

  private drawerRef = inject(NzDrawerRef);
  private userService = inject(UserService);

 ngOnInit(): void {
    this.userService.getLabTestV2()
      .pipe(take(1))
      .subscribe(labTests => {
        this.labTestsByCategory = this.groupByCategory(labTests);
      });
  }

  private groupByCategory(tests: LabTestV2Dto[]): LabTestGroup[] {
    const grouped = tests.reduce((acc, test) => {
      if (!acc[test.category]) {
        acc[test.category] = [];
      }
      acc[test.category].push(test);
      return acc;
    }, {} as Record<string, LabTestV2Dto[]>);

    return Object.entries(grouped).map(([category, tests]) => ({
      category,
      tests
    }));
  }

  deleteSelectedValue(id: number) {
    this.selectedValues = this.selectedValues.filter(value => value.id !== id);
  }

  closeDrawer(): void {
    this.drawerRef.close();
  }

  onSubmit(): void {

  }
}
