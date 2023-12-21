import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './public/components/not-found/not-found.component';
import { HeaderComponent } from './public/components/header/header.component';
import { HomeComponent } from './public/pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListEntityComponent } from './registry/pages/list-entity/list-entity.component';
import { AddEditDialogComponent } from './registry/components/add-edit-dialog/add-edit-dialog.component';
import { ViewDialogComponent } from './registry/components/view-dialog/view-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    HomeComponent,
    ListEntityComponent,
    AddEditDialogComponent,
    ViewDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
