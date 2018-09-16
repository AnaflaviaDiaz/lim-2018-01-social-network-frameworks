import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { GetupdremService } from '../../services/getupdrem/getupdrem.service';
@Component({
  selector: 'app-body-post',
  templateUrl: './body-post.component.html',
  styleUrls: ['./body-post.component.css']
})
export class BodyPostComponent implements OnInit {
 
  constructor(
    public _getUpdRemSrv: GetupdremService
  ) { }
  public firebase = firebase;
  Arrayposts: any;
  posts: any;

  ngOnInit() {
    this.getPost();
    // firebase.database().ref().child('posts').on('value', (snap) => {
    //   const currentUserId = firebase.auth().currentUser.uid;
    //   this.posts = snap.val();
    //   this.Arrayposts = Object.keys(snap.val());
    //   console.log(this.posts)
    // });
  }

  public getPost() {
    this._getUpdRemSrv.getPost().then(result => {
      this.posts = result;
      this.Arrayposts = Object.keys(result)
    });
  }

  removePost() {

  }
  addLike(postId) {
    const uid = (firebase.auth().currentUser.uid);
    let postRef = firebase.database().ref('posts/' + postId);
    postRef.transaction((post) => {
      if (post) {
        if (post.likes && post.likes[uid]) {
          post.likesCount--;
          post.likes[uid] = null;
        } else {
          post.likesCount++;
          if (!post.likes) post.likes = {};
          post.likes[uid] = true;
        }
      }
      return post;
    });
  }

}
