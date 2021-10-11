import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuAssignmentService } from './../../../services/menu-assignment.service';
import { CryptService } from './../../../services/crypt.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../../list.service';
import { Component, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { EventEmitter } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare var SuccessAlert:any;
declare var errorAlert:any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-roleentry',
  templateUrl: './roleentry.component.html',
  styleUrls: ['./roleentry.component.css']
})
export class RoleentryComponent implements OnInit {
  @Output()
  showDetails = new EventEmitter();
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  public loading = false;p: number;   pagecount:number;

 
 
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo:5000,
    height: '200px',
  };

  constructor( private listService: ListService,private router: Router, private cryptService: CryptService, private menuAssignmentService: MenuAssignmentService, private modalService: NgbModal) { }
    ngOnInit() {

      (function ($) {
        $(document).ready(function() {
          $('#exampleModal').on('shown.bs.modal', function () {
            $('#roleidselect').focus();
        })
      });
      })(jQuery);



    this.EncryptPageName();
    this.EncryptPageUrl();
    this.roledetail=""
    this.selectrolereturn1="";
    this.roleName1="";
    this.descriptionrole="";
    this.readPrivilege1 = false;
    this.writePrivilege1 = false;
    this.RoleList();

    //this.clear();
 
  }

  
  EncryptPageName() {
    this.cryptService.encrypt("Role Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  rowNumber1: number;
  roleId: string;
  roleName1: string;
  descriptionrole: string;
  readPrivilege1: boolean = false;
  writePrivilege1: boolean = false;
  createdate: any;
  updatedate: any;
  roledetail: any;
  dummyroledetail: any;
  role_id:string;
  datafromrespo:string;
  InsertRole() {
 
    // this.role_id = this.roleName["param1"];
   // var dummyroledata = $('#dummyroleid1').val();
  var dummyroledatarole = this.selectrolereturn1;
  
    var rolenamedatatxt =this.roleName1;
    var descriptiondata3role = this.descriptionrole;
    this.roleName1 = rolenamedatatxt.substring(0, 1).toUpperCase() + rolenamedatatxt.substring(1);
    this.descriptionrole = descriptiondata3role.substring(0, 1).toUpperCase() + descriptiondata3role.substring(1);

    var isValid = true;
   if(!dummyroledatarole && dummyroledatarole.length <= 0){

       isValid = false;
      $('#msg_errorentry3').html('Please Select Role Owner').show();
      $('#roleidselect').focus();
     setTimeout(function(){document.getElementById("msg_errorentry3").style.display="none";}, 3000);
    }
   else if(!rolenamedatatxt && rolenamedatatxt.length <= 0) {
   
       isValid = false;
       $('#msg_errorentry3').html('Please Enter Role Name').show();
       $('#rolenametxt_id1').focus();
   setTimeout(function(){document.getElementById("msg_errorentry3").style.display="none";}, 3000);
     }
    else
     if (!descriptiondata3role && descriptiondata3role.length <= 0){

       isValid = false;
       $('#msg_errorentry3').html('Please Enter Description').show();
       $('#descriptionentry5').focus();
       setTimeout(function(){document.getElementById("msg_errorentry3").style.display="none";}, 3000);
     }
     else
     if ((this.readPrivilege1 == false && this.writePrivilege1 == false)){
  
       isValid = false;
       $('#msg_errorentry3').html('Please Checked Access Role').show();
      //  $('#descriptionentry5').focus();
       setTimeout(function(){document.getElementById("msg_errorentry3").style.display="none";}, 3000);
     }
   else{
  
        let dataL = {
          remark: "NA",
          roleId: "",
          roleName: this.roleName1,
          roleFunctionality: this.descriptionrole,
          read: this.readPrivilege1,
          write: this.writePrivilege1,
          selectOwnersRoleId: this.selectrolereturn1,
      pageID: "12",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
try { AddLoader() } catch (e) { alert(e) }
    this.menuAssignmentService.InsertRoleInRoleManagement(dataL).subscribe((data) => 
    {
      
try { RemoveLoader() } catch (e) { alert(e) }
     // console.log(data);
     
        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;

        if (data.statuscode == '200') {
          SuccessAlert(msg);
       this.RoleDetail();
       this.roledetail=null;
       this.selectrolereturn1=null;
       this.roleName1=null;
       this.descriptionrole=null;
       this.readPrivilege1 = false;
       this.writePrivilege1 = false;
          this.closemodal();
         this.showDetails.emit()
      }
      else
      {
        errorAlert(msg);
      }
    });}


  
  }

  roleListArray1:[];
  RoleList() {
   
    let dataL = {
      param1:"",
      param2: "",
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
try { AddLoader() } catch (e) { alert(e) }
    this.listService.RoleList(dataL).subscribe((response) => {
      
try { RemoveLoader() } catch (e) { alert(e) }
      let list1 = response.entity;
      this.roleListArray1 = list1;
    //  alert(JSON.stringify(this.roleListArray1))
    })

  }

  selectrolereturn1:any;
  AssignRoleList()
  {
      var roledummytextid = this.roledetail["param1"];
      this.selectrolereturn1 = roledummytextid;
     // alert(this.selectrolereturn1);
  }

  clear()
  {
  // this.roledetail=""
  // this.roleName1="";
  // this.descriptionrole="";
  // this.readPrivilege1 = false;
  // this.writePrivilege1 = false;

  this.roledetail=null;
       this.selectrolereturn1=null;
       this.roleName1=null;
       this.descriptionrole=null;
       this.readPrivilege1 = false;
       this.writePrivilege1 = false;
  }
  itemsPerPage:number=10;
  count: number; viewcount: number;
roleDetails:any;
RoleDetail() {
  this.loading = true;
 this.p = 1; this.pagecount = 10;


 this.itemsPerPage=this.pagecount;
 let keydata = {
    param1:"",
    pageNo: this.p,
    itemsPerPage: this.pagecount,
    searchBy: "",
    searchType: "",
    totalRecords: "NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  
try { AddLoader() } catch (e) { alert(e) }
this.menuAssignmentService.RoleDetailsInRoleManagement(keydata).subscribe((data) => {
  
try { RemoveLoader() } catch (e) { alert(e) }
  let resdatalist = data.entity.responsedatalist;
      let vendorlist = resdatalist;
      this.roleDetails  = vendorlist;
      this.count = data.entity.count;
      this.viewcount = data.entity.viewCount;

      this.loading = false;
    });
}

closemodal() {

    $("#exampleModal").modal('hide');
$('.modal-backdrop.show').css('display', 'none');
  }


}
