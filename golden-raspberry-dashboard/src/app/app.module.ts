import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component'; // Adjust the path as necessary
import { AppRoutingModule } from './app-routing.module'; // Importando o módulo de roteamento
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component'; // Import the ListComponent
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './dashboard/dashboard.component'; // Adjust the path as necessary
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }