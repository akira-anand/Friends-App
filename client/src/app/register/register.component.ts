import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input () usersFromHomeComponent: any;
  @Output() cancelRegister= new EventEmitter();
  model:any={};
  constructor(private accountService:AccountService,private toastr:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  register()
  {
// console.log(this.usersFromHomeComponent);
this.accountService.register(this.model).subscribe( response => {
  console. log (response);
  this.cancel();
},
  error => {
  console.log(error.error);
  this.toastr.error(error.error);
  })
}
  cancel()
  {
this.cancelRegister.emit(false);
  }

}
