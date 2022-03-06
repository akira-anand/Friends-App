import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any={};
  loggedIn:boolean;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void{

    this.getCurrentUser();
    
  }
login()
{
  // console.log(this.model);
  this.accountService.login(this.model).subscribe(response=>
    {
      // console.log(response);
      this.loggedIn=true;
    },
    error=>{
      console.log(error);
    });
}
logout()
{
  this.accountService.logout();
  this.loggedIn=false;
}
getCurrentUser(){
  this.accountService.currentUser$.subscribe(user=>{
    this.loggedIn=!!user;
  },error=>{
    console.log(error);
  });
}
}


// this.http.get('https://localhost:5001/api/users').subscribe(response=>
// {
//   this.users=response;
// },error=>{
//   console.log(error);
// })

// setCurrentUser() {
// const user: User = JSON. parse(localStorage.getItem ( 'user') ) ;
// this.accountService.setCurrentUser(user);
// }



