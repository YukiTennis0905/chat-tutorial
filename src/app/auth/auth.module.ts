// signin.modeule.tsとsignup.modele.tsの二つのモジュールをまとめておく．
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SignupPage } from './signup/signup.page';
import { SigninPage } from './signin/signin.page';


// ルーティングは，各pathに対応するconponentを設定していく．
const routes: Routes = [
  {
    path: 'signup',
    component: SignupPage
  },
  {
    path: 'signin',
    component: SigninPage
  }
];


@NgModule({
  declarations: [SignupPage, SigninPage], //何を宣言しているモジュールなのか
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
})
export class AuthModule { }
