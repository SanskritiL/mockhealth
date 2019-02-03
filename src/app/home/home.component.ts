import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../shared/services/firebase.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { User, Userdeets } from '../shared/services/user';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profileUrl: Observable<string | null>;
  list: Userdeets[];
   
  user: any;
  imageURL: any;
  id:any;

  constructor(private router: Router, public route: ActivatedRoute,private service: FirebaseService, public afsm: AngularFireStorage ) {}
  
  ngOnInit() {

    this.service.getUserDetails().subscribe(actionArray=>{
      this.list = actionArray.map(item => {
       let storageRef = firebase.storage().ref();
       let spaceRef =storageRef.child(item.payload.doc.data()['path'])
       storageRef.child(item.payload.doc.data()['path']).getDownloadURL().then((url)=>{
          this.imageURL = url;
       });
        
        return {
          
           ...item.payload.doc.data()

           } as Userdeets
      })
    })
 
}

 


}
