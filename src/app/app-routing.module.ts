import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { PagesRountingModule } from './pages/pages.routing';
import { AuthRountingModule } from './auth/auth.routing';

const routes: Routes = [

  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: NopageFoundComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    PagesRountingModule,
    AuthRountingModule
  ]
})
export class AppRoutingModule { }
