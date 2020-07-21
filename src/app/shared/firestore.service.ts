//理解が怪しいポイント

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
// rxjs/operatorsからRxJSをPromissに変換するためにfirstオペレータを取得
import { first, concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


export interface IUser {
  displayName: string;
  photoDataUrl: string;
}

export interface IMessage {
  uid: string;
  message: string;
  timestamp: number;
}

// チャットで表示する際にはメッセージとユーザプロフィールの両方が必要だから，新しい型を作って，上の二つを継承する
export interface IChat extends IUser, IMessage {}
 
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userDoc: AngularFirestoreDocument<IUser>;
  messageCollection: AngularFirestoreCollection<IMessage>;
  userCollection: AngularFirestoreCollection<IUser>;
  constructor(public af: AngularFirestore) { 
    // チャットメッセージを時系列順で表示するためにタイムスタンプ順にソートするように設定．
    this.messageCollection = this.af.collection<IMessage>('chat', ref => ref.orderBy('timestamp', 'desc'));
    this.userCollection = this.af.collection<IUser>('users');
  }

  // メッセージを追加（送信）するメソッド
  messageAdd(message: IMessage) {
    return this.messageCollection.add(message);
  }

  // メッセージのコレクションをユーザプロフィールを使って，IChat型に加工してRxJSのObservableの形でreturnする．
  //pipe()内でconcatオペレータを利用している．
  //チャットに表示するためには，メッセージのコレクションだけでなく，ユーザのコレクションからプロフィールを取得して結合する必要があるため．
  //ユーザのコレクションからプロフィールを取得は都度一度しか取得しないのでPromissに変換してユーザ一覧を取得．
  //concatMapオペレータ内でプロフィールを取得してmessage.map()内でそれぞれのmessageに一致するuserを見つけて，Object.assign()メソッドでこの二つのオブジェクトをコピーしてreturn
  chatInit(): Observable<IChat[]> {
    return this.messageCollection.valueChanges( {idField: 'messageId'} )
      .pipe(concatMap(async messages => {
        const users = await this.userCollection.valueChanges( {idField: 'uid'} )
          .pipe(first()).toPromise(Promise);
        return messages.map(message => {
          const user = users.find(u => u.uid === message.uid);
          return Object.assign(message, user);
        });
      }));
  }

  // ユーザ情報を初期化するメソッド
  userInit(uid: string): Promise<IUser> {
    this.userDoc = this.af.doc<IUser>('users/' + uid);
    return this.userDoc.valueChanges().pipe(first()).toPromise(Promise);
  }

  // ユーザ情報を更新するメソッド
  userSet(user: IUser): Promise<void> {
    return this.userDoc.set(user); 
  }
}
