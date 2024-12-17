import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { ListComponent } from './list/list.component'; 
export const routes: Routes = [
    { path: '', component: AppComponent }, // Default route
    { path: 'dashboard', component: DashboardComponent }, // Route for the list view
    { path: 'list', component: ListComponent }, // Route for the list view
    { path: '**', redirectTo: '' } // Redirect any unknown routes to the default route
];
