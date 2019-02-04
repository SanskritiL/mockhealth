import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user';
import { FirebaseService } from '../shared/services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
//import {AngularFireDatabaseModule, }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
userdetail:any
id:any;
fullname:any;
major:any;
hobbies:any;
image:any;
profileCompleted: boolean;
userInfo: User;
email:any;
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private authservice: AuthService
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  onAddSubmit(form: NgForm){
    let userdetail = {
      email: this.userInfo.email,
      fullname: this.fullname,
      hobbies: this.hobbies,
      major:this.major,
      image: this.image,
      profileCompleted: true
      

    }
    this.firebaseService.adduserdetails(userdetail);

    this.router.navigate(['home']);
    console.log("Lets see");
    }


  logout(){
    this.authservice.SignOut()
  }
  ngOnInit() {
   /*this.id = this.route.snapshot.params['id'];
   this.firebaseService.getUserDetails(this.id).subscribe(userdetail=>{
     this.userdetail = userdetail;
   })
   */
   
  }

}
