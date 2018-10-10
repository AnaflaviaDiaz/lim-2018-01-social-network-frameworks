import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GetupdremService {

  constructor() { }

  getPost() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref()
        .child('posts')
        .on('value', (snap) => {
          resolve(snap.val());
        });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref()
        .child('users')
        .on('value', (snap) => {
          resolve(snap.val());
        });
    });
  }

  deletePost(id) {
    return new Promise((resolve, reject) => {
      let updates = {};
      updates['posts/' + id] = null;
      firebase
        .database()
        .ref()
        .update(updates, (error) => {
          if (error) reject(error);
          else resolve('ok');
        });
    });
  }

  updatePost(id, text) {
    return new Promise((resolve, reject) => {
      let updates = {};
      updates['posts/'+id+'/description'] = text;
      firebase
        .database()
        .ref()
        .update(updates, (error) => {
          if(error) {
            reject(error);
          } else resolve('ok');
        });
    });
  }
}
