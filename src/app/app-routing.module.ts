import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { StarshipViewComponent } from './starship-view/starship-view.component';

const routes: Routes = [
  {
    component: MainMenuComponent,
    path: ''
  },
  {
    component: StarshipViewComponent,
    path: 'bridge'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
