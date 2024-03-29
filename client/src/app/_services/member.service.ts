import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userparams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';



@Injectable({
  providedIn: 'root'
})


export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;
  // httpOptions = {
  //   headers: new HttpHeaders({
  //   Authorization:'Bearer '+JSON.parse(localStorage. getItem('user')).token
  //   })
  //   };
  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }
  getUserParams() {
    return this.userParams;
  }
  setUserParams(params: UserParams) {
    this.userParams = params;
  }
  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl+'likes',params,this.http);
  }
  getMembers(userParams: UserParams) {
    // console.log(Object.values(userParams).join('-'));
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    // let params = new HttpParams();
    // if (this.members.length > 0) return of(this.members);
    // return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
    //   map(members => {
    //     this.members = members;
    //     return members;
    //   })
    // );
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    // if (page !== null && itemsPerPage !== null) {
    //   params = params.append('pageNumber', page.toString());
    //   params = params.append('pageSize', itemsPerPage.toString());
    // }
    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params,this.http)
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }



  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);
    // console.log(this.memberCache);
    // const member = this.members.find(x => x.userName === username);
    // if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
  updateMember(member: Member) {
    return this.http.put(this.baseUrl +
      'users', member).pipe(
        map(() => {
          const index = this.members.indexOf(member);
          this.members[index] = member;
        })
      )
    // return this.http.put(this.baseUrl+'users',member);
  }
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }
  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  
}
