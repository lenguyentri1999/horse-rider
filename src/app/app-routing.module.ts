import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddCampComponent } from './components-admin/add-camp/add-camp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing', pathMatch: 'full',
  },
  {
    path: 'camp-info/:id',
    loadChildren: './pages/camp-info/camp-info.module#CampInfoPageModule',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  // },
  {
    path: 'login', loadChildren: './pages/login/login.module#LoginPageModule',
  },
  {
    path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule',
  },
  { path: 'launch', loadChildren: './pages/launch/launch.module#LaunchPageModule' },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminPageModule' },
  { path: 'blog', loadChildren: './pages/blog/blog.module#BlogPageModule' },
  { path: 'blog-info/:id', loadChildren: './pages/blog-info/blog-info.module#BlogInfoPageModule' },

  // { path: 'admin-add-camp', loadChildren: './pages/admin-add-camp/admin-add-camp.module#AdminAddCampPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
