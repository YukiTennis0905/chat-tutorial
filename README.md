# chat-tutorial
package.json の内容に従ってインストールするため以下のコマンドを使う。
```
npm i
```

environmentフォルダのenvironment.tsの中にfirebaseを使用するために必要なapiKeyなどを設定する場所があるので、
うめる。

```
export const environment = {
  production: false,
  firebase: {
    apiKey: "入れてね",
    authDomain: "入れてね",
    databaseURL: "入れてね",
    projectId: "入れてね",
    storageBucket: "入れてね",
    messagingSenderId: "入れてね",
    appId: "入れてね"
  }
};
```


あとはionic serveで実行。
