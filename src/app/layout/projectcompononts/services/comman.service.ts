import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  constructor() { }
  
  mainvalue(){
      let headerkey = sessionStorage.getItem("hk");
      let roleid = sessionStorage.getItem("rid");
      let loginname = sessionStorage.getItem("ln");
      let welcomename = sessionStorage.getItem("weln");
      
      let userdata = {
        "headerkey":headerkey,
        "roleid":roleid,
        "loginname":loginname,
        "welcomename":welcomename
      }
      return userdata;
  }
}
