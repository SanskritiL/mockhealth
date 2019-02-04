import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../shared/services/firebase.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { User, Userdeets } from '../shared/services/user';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profileUrl: Observable<string | null>;
  
  //declaring variables
  fullname: string;
  major:any;
  hobbies:any;
  list: Userdeets[];
  path:any;
  user: any;
  imageURL: any;
  id:any;
  userInfo: User;
  email:any;
  constructor(private router: Router, public route: ActivatedRoute,private service: FirebaseService, public afsm: AngularFireStorage ) {

    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.email = this.userInfo.email;
    console.log("yahako email  jp: " +this.email)
    
  }
  
 displayHome(){

 }


  /*ngOnInit() {

    this.service.getUserDetails().subscribe(actionArray=>{
      this.list =actionArray.map(item => {

      if( this.email===item.payload.doc.data()['email']){
       let storageRef = firebase.storage().ref();
       let spaceRef =storageRef.child(item.payload.doc.data()['path'])
       
       storageRef.child(item.payload.doc.data()['path']).getDownloadURL().then((url)=>{
          this.imageURL = url;
          console.log("yo ho" )
          console.log(this.imageURL)
        });
          return {
             
             ...item.payload.doc.data()
            
             } as Userdeets
            
            }
      }); 
  
    })
 
  }

 
*/
ngOnInit(){
  this.service.getUserDetails().subscribe(actionArray=>{
   actionArray.map(item => {

     if(item.payload.doc.data()['email'] === this.email){
       this.fullname = item.payload.doc.data()['fullname']
       this.path = item.payload.doc.data()['path']
       let storageRef = firebase.storage().ref();
       let spaceRef =storageRef.child(item.payload.doc.data()['path'])
       
       storageRef.child(item.payload.doc.data()['path']).getDownloadURL().then((url)=>{
          this.imageURL = url;
        });

     }
     else{
       this.fullname ="You're being redirected. <3 <3"
     }

    })
  })

}

}
