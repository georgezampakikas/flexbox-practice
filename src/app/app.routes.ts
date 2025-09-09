import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'patients', 
        loadComponent: () => import('./components/page/page').then(m => m.Page), 
    },
    {
        path: 'patient-details/:id',
        loadComponent: () => import('./components/patient-details/patient-details').then(m => m.PatientDetails),
    },
    { 
        path: 'new-patients', 
        loadComponent: () => import('./components/new-patients/new-patients').then(m => m.NewPatients), 
    },
    { path: '**', redirectTo: 'patients' }
];
