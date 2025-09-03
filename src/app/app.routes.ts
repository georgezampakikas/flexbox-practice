import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'patients', 
        loadComponent: () => import('./components/page/page').then(m => m.Page), 
    },
    {
        path: 'patient-details',
        loadComponent: () => import('./components/patient-details/patient-details').then(m => m.PatientDetails),
    },
    { path: '**', redirectTo: 'patients' }
];
