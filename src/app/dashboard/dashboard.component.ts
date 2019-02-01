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
selectedFile: File
upload(event){
  const file = event.target.files[0]
}

onUpload(){

}


userInfo: User
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  


  
  ngOnInit() {
   
   
  }

}
