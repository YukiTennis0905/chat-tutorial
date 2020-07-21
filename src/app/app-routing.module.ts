import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// 非ログイン状態が一致する場合は auth/signin にリダイレクトする設定を変数redirectUnauthorizedと定義．
const redirectUnauthorized = () => redirectUnauthorizedTo(['auth/signin']);
// ログイン状態が一致する場合は / にリダイレクトする設定を変数redirectLoggedInと定義．
const redirectLoggedIn = () => redirectLoggedInTo(['/']);



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  // 作成したAuthModuleをパスauthとして追加する．
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedIn }, 
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
