import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { User, Userdeets } from '../shared/services/user';
import * as firebase from 'firebase';
import {FirebaseService} from '../shared/services/firebase.service';
@Component({
  selector: 'app-viewfriend',
  templateUrl: './viewfriend.component.html',
  styleUrls: ['./viewfriend.component.css']
})
export class ViewfriendComponent implements OnInit {
  list: Userdeets[];
  constructor(private service: FirebaseService, public afsm: AngularFireStorage) { }
  imageURL : any;
fullname:any;
email:any;
hobbies:any;
major:any;


  ngOnInit() {
    this.service.getUserDetails().subscribe(actionArray=>{
      this.list = actionArray.map(item => {
       //let storageRef = firebase.storage().ref();
       //let spaceRef =storageRef.child(item.payload.doc.data()['path'])
       //storageRef.child(item.payload.doc.data()['path']).getDownloadURL().then((url)=>{
         // this.imageURL = url;
       //});

        return {...item.payload.doc.data() } as Userdeets
        
      })
    })

  }

}
