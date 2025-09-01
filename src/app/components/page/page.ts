import { Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTabsModule } from 'ng-zorro-antd/tabs';



import { DrawerComponent } from '../drawer-component/drawer-component';
import { GeneralInstructions } from "../general-instructions/general-instructions";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzEmptyModule,
    NzDrawerModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzTabsModule,
    GeneralInstructions
],
  templateUrl: './page.html',
  styleUrl: './page.scss'
})
export class Page {
  private drawerService = inject(NzDrawerService);

  openDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Title',
      nzMaskClosable: false,
      nzContent: DrawerComponent,      
    });
  }
}
