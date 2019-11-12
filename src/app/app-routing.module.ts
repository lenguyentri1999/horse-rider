import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  { path: 'trails', loadChildren: './pages/trails/trails.module#TrailsPageModule' },
  { path: 'camps', redirectTo: '/tabs/tab1', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
