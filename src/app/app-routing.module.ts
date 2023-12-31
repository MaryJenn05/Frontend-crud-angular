import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { NotFoundComponent } from './public/components/not-found/not-found.component';
import { ListEntityComponent } from './registry/pages/list-entity/list-entity.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "data", component: ListEntityComponent},
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
