import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { GetupdremService } from '../../services/getupdrem/getupdrem.service';
import swal from 'sweetalert2';
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
  public canEdit: boolean = false;
  public textEdit: string;
  public actualPost: string;
  public currentUserId: any;
  Arrayposts: any;
  posts: any;

  ngOnInit() {
    firebase
      .database()
      .ref('posts').orderByChild('date')
      .on('value', (snap) => {
        this.currentUserId = firebase.auth().currentUser.uid;
        this.posts = snap.val();
        this.Arrayposts = Object.keys(snap.val()).reverse();
        // console.log(this.posts[post].privacity === Publico || firebase.auth().currentUser.uid === posts[post].authorId)
      });
  }

  removePost(idPost) {
    swal({
      type: 'warning',
      title: 'Eliminar post',
      text: 'Estás seguro?',
      showCancelButton: true,
      confirmButtonColor: '#049F0C',
      cancelButtonColor: '#ff0000',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if (result['value'] === true) {
        this._getUpdRemSrv.deletePost(idPost)
          .then(() => {
            swal({
              type: 'success',
              text: 'Tu post ha sido eliminado'
            });
          });
      }
      else console.log(result);
    });
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

  editPost(idPost) {
    this.actualPost = idPost;
    this.canEdit = true;
    this.textEdit = this.posts[idPost]['description'];
  }

  cancelEditPost() {
    this.canEdit = false;
  }

  saveEditPost(idPost) {
    this._getUpdRemSrv.updatePost(idPost, this.textEdit)
      .then(() => {
        this.canEdit = false;
      });
  }

}
