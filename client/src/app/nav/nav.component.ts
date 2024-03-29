import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public accountService: AccountService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void{

    
  }
login()
{
  // console.log(this.model);
  this.accountService.login(this.model).subscribe(response=>
    {
      this.router.navigateByUrl('/members');
    })
    // error=>{
    //   console.log(error);
    //   this.toastr.error(error.error);
    // });
}
logout()
{
  this.accountService.logout();
  this.loggedIn=false;
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



