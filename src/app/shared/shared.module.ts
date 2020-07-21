import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // フォーム要素を扱うためのモジュール
import { IonicModule } from '@ionic/angular'; // Ionicのカスタム要素を取り扱うためのモジュール
import { ProfilePage } from './profile/profile.page';



@NgModule({
  declarations: [ProfilePage],
  entryComponents:[ProfilePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class SharedModule { }
