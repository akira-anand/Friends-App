import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userparams';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]
  // pageNumber = 1;
  // pageSize = 5;
  constructor(private memberService: MemberService) {
    this.userParams=this.memberService.getUserParams();
    //  this.memberService.getMember
  }

  ngOnInit(): void {
    // this.members$=this.memberService.getMembers();
    this.loadMembers();
  }
 
  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    }
    )
  }
  resetFilters(){
    this.userParams=this.memberService.resetUserParams();
    this.loadMembers();
  }
  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams); 
    this.loadMembers();
  }
  resetfilters() {
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }
}
