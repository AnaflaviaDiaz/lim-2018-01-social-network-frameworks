import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public post = {};
  public updates = {};
  public date : any;

  constructor() { }

  writeUserData(user, name) {
    return new Promise((resolve) => {
      firebase
        .database()
        .ref('users/' + user.uid).set({
          username: name,
          email: user.email,
          photo: user.photoURL ||'https://previews.123rf.com/images/kannaa123rf/kannaa123rf1609/kannaa123rf160900065/66702728-cara-de-ni%C3%B1a-cabeza-de-perfil-avatar-femenina-ilustraci%C3%B3n-del-vector-para-el-dise%C3%B1o-de-la-belleza-icono-plana.jpg'
        });
      resolve(true);
    });
  }

  writePostData(description, privacity, img) {
    this.date = firebase.database.ServerValue.TIMESTAMP;
    return new Promise((resolve) => {
      const _user = firebase.auth().currentUser;
      firebase
      .database()
      .ref('/users/' + _user.uid)
      .once('value', (snapshot) => {
        firebase
          .database()
          .ref('posts')
          .push()
          .set({
            img: img || null,
            description: description || '',
            privacity: privacity,
            date: this.date,
            authorName: snapshot.val().username,
            authorPhoto: snapshot.val().photo || 'no hay',
            authorId: _user.uid,
            likesCount: 0
         });
        resolve(true);
      })
    });
  }
}
