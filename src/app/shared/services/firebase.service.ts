import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase,AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userdetails:  AngularFireList<any[]>
 
  
  constructor(public afstore: AngularFirestoreModule) {
    
   }
  



/*
  adduserdetails(userdetail){
     //Create root reference
     let storageRef = firebase.storage().ref();
    
      for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
     
      iRef.put(selectedFile).then((snapshot) => {
        userdetail.image = selectedFile.name;
        userdetail.path = path;
        return this.userdetails.push(userdetail);
      });
      
      }
      
    }
    
*/

  }
