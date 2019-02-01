import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user';
import { FirebaseService } from '../shared/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

fullname:any;
major:any;
hobbies:any;
image:any;

userInfo: User
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  onAddSubmit(){
    let userdetail = {
      fullname: this.fullname,
      hobbies: this.hobbies,
      major:this.major

    }
    this.firebaseService.adduserdetails(userdetail);
    console.log("Lets see");
    
    
  }


  
  ngOnInit() {
   
   
  }

}
