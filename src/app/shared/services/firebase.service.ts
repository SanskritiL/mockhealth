import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { defineBase } from '@angular/core/src/render3';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userdetails:  AngularFireList<any>;
  userdetail: FirebaseListObservable<any[]>;
  userkoval:any
  constructor(private hm: AngularFireDatabaseModule, private firestore: AngularFirestore
    ) {
      this.folder = 'profilepicture';
    }
    folder: any;
    
    
    
    adduserdetails(userdetail){
      var db = firebase.firestore();
     //Create root reference
     let storageRef = firebase.storage().ref();
    
      for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
     
      iRef.put(selectedFile).then((snapshot) => {
        userdetail.image = selectedFile.name;
        userdetail.path = path;
        this.firestore.collection('userdeets').add(userdetail)

      });
      console.log(userdetail)

      }
      
    }
    

    getUserDetails(){
      this.getUserObject()
       return this.firestore.collection('userdeets').snapshotChanges();
    }
    //Just checking
    getUserObject(){
      console.log("new me")
      var db = firebase.firestore();

      this.userkoval = db.collection("userdeets");
          console.log(this.userkoval)

     
    }


  }
