import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);
const redirectLoggedInToTabs = redirectLoggedInTo(['']);

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login', pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', ...canActivate(redirectLoggedInToTabs)},
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule', ...canActivate(redirectLoggedInToTabs) },
  { path: 'camp-info', loadChildren: './pages/camp-info/camp-info.module#CampInfoPageModule' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
