import { Injectable, NgZone } from '@angular/core';
import { User, Userdeets } from "../services/user";
import {auth} from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {FirebaseService} from '../services/firebase.service';
import {HomeComponent} from '../../home/home.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import * as firebase from 'firebase';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: any; //Save logged in user data
    answer: boolean;
    homeornot:boolean;
     val: Userdeets[];
    constructor(
        public service: FirebaseService,
        public afs: AngularFirestore,  //Inject Firestore service
        public afAuth: AngularFireAuth,  //Inject Firebase auth service
        public router: Router,
        
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ){
    
        /* If the user is logged in, saving the data in localStorage
        Else user data is set to null when s/he logs out
         */
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            }
            else{
                localStorage.setItem('user',null);
                JSON.parse(localStorage.getItem('user'));
            }
        })
    }
 

    // Signing in with email and password
    SignIn(email: any, password:any) {
        return this.afAuth.auth.signInWithEmailAndPassword(email,password)
        .then((result) => {
            this.ngZone.run(() => {
                
           this.service.getUserDetails().subscribe(actionArray=>{
            actionArray.map(item => {
                  console.log(item.payload.doc.data()["email"])
                  console.log(item.payload.doc.data()["profileCompleted"])
                  if(item.payload.doc.data()["email"] === email){
                     
                      if(item.payload.doc.data()["profileCompleted"] == true){
                        this.router.navigate(['home']);
                      }
                    }
                   else{
                    
                       this.router.navigate(['dashboard']);
    
                    }
                 
              })
          })



        });


            this.SetUserData(result.user);
        }).catch((error) => {
            window.alert(error.message)
        })

    }

    //Sign up with email/password
    SignUp(email, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            //call the sendVerificationMail() function when new user signs up and return promise
            this.SendVerificationMail();
            this.SetUserData(result.user);
        }).catch((error) => {
            window.alert(error.message)
        })
    }
 //send an email verification 
    SendVerificationMail(){
        return this.afAuth.auth.currentUser.sendEmailVerification()
        .then(() => {
            this.router.navigate(['verify-email-address']);
        })
    }

    //Reset Forgot password
    ForgotPassword(passwordResetEmail) {
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
        .then(()=>{
            window.alert('Password reset email has been sent. Check your inbox');
        }).catch((error)=>{
            window.alert(error)
        })
        
    }
//  Returns true when user is logged in adn email  is verified
get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified!==false) ? true: false;
}
//Sign in with Google
GoogleAuth(){
    return this.AuthLogin(new auth.GoogleAuthProvider());
}

AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        this.ngZone.run(()=>{
            this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
    }).catch((error) => {
        window.alert(error)
    })
}


 SetUserData(user){
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
              uid: user.uid,
               email: user.email,
               displayName: user.displayName,
               photoURL: user.photoURL,
               emailVerified: user.emailVerified 
         }
            return userRef.set(userData, {
                merge: true
            })
         }

//Sign out
SignOut(){
    return this.afAuth.auth.signOut().then(()=>{
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
    })
}

    }


