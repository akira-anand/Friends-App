import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Buddy Me';
  users:any;
  
  constructor(private http:HttpClient,public accountService:AccountService,private presence:PresenceService){}
  ngOnInit(){
    
    // this.getUsers();
    this.setCurrentUser();
  //   this.http.get('https://localhost:5001/api/users').subscribe(response=>
  //   {
  //     this.users=response;
  //   },error=>{
  //     console.log(error);
  //   })
   }
 
  setCurrentUser() {
  const user: User = JSON. parse(localStorage.getItem ( 'user') ) ;
  if(user)
  {
    this.accountService.setCurrentUser(user);
    this.presence.createHubConnection(user);
  }
  
}
// getUsers(){
//   this.http.get('https://localhost:5001/api/users').subscribe(
//     response=>
//     {
//       this.users=response;
//     },error=>{
//       console.log(error);
//     }
//   )
// }
}
