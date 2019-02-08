import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../shared/services/firebase.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { User, Userdeets } from '../shared/services/user';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { IfStmt } from '@angular/compiler';
import * as $ from 'jquery';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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

  $(window).scroll(function(){

    var wScroll = $(this).scrollTop();
    console.log(wScroll)
   const text = document.querySelector('.everything');
   if(wScroll> $('.bottom').offset().top){
     text.classList.add('land')
 
   }

  });
  //for css
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');
  const container = document.querySelector('.container');
  const navItems = document.querySelectorAll('.nav-items');
  //set initial state of menu
  let showMenu = false;
  menuBtn.addEventListener('click',toggleMenu);
  function toggleMenu(){
    if(!showMenu){
        menuBtn.classList.add('close');
         container.classList.add('show');
      

        showMenu= true;
    }
    else{
      menuBtn.classList.remove('close');
      container.classList.remove('show');



      showMenu = false;
    }
  }

/*
  let sliderImages = document.querySelectorAll('.slide'),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector('#arrow-right'),
  current = 0;
  console.log(sliderImages)
//clear all images
function reset(){
 for(let i =0; i < sliderImages.length;i++){
   sliderImages[i].style.display = 'none';
 }
}
//init slider
function startSlide(){
 reset();
 
 sliderImages[0].style.display='block';
 
}
//Show prev
function slideLeft(){
 reset();
 sliderImages[current-1].style.display='block';
 current--;
}

//show next 
function slideRight(){
 reset();
 sliderImages[current+1].style.display='block';
 current++;
}
//left arrow clik
arrowLeft.addEventListener('click',function(){
 console.log("meow")
 if(current === 0){
   current = sliderImages.length;
 }
 slideLeft();
});

//right arrow clik
arrowRight.addEventListener('click',function(){
 if(current === sliderImages.length-1){
   current = -1
 }
 slideRight();
});


startSlide();

*/

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

     
this.displayHome()



      


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
       console.log("You're being redirected. <3 <3"
            )     }

    })
  })

}

//select DOM Items
 







}
