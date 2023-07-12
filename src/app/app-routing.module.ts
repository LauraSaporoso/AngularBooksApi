import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBookComponent } from './search-book/search-book.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { DetailsComponent } from './details/details.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: SearchBookComponent,
  },
  {
    path: 'details/:idBook',
    component: DetailsComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
