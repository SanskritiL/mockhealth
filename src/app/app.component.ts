import { Component } from '@angular/core';
import  { SignInComponent } from '../app/sign-in/sign-in.component';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){}
  title = 'mockHealth';
}
