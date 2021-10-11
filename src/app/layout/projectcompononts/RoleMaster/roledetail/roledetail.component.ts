import { PdfService } from './../../services/pdf.service';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { ListService } from 'src/list.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { MenuAssignmentService } from './../../services/menu-assignment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-roledetail',
  templateUrl: './roledetail.component.html',
  styleUrls: ['./roledetail.component.css']
})
export class RoledetailComponent implements OnInit {
  itemsPerPage: number = 10;
  rowNumber1: number;
  roleIDencr: string;
  roleName2: string;
  description: string;
  readPrivilege: any = false;
  writePrivilege: any = false;
  createdate: any;
  updatedate: any;
  roledetail: any;
  dummyroledetail: any;
  ownersroleid: any;

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  key: string = 'name'; reverse: boolean = true; write_privilege: string;

  public loading = false; p: number; pagecount: number = 10; count: number; viewcount: number;
  SelectPageText: string; PlaceOrderDetails$: Object; remarkText: string; deleteText: string; filter: any;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };


  constructor(public pdfservice: PdfService, public excelservice: ExportToExcelService, private listService: ListService, private router: Router, private cryptService: CryptService, private menuAssignmentService: MenuAssignmentService, private modalService: NgbModal) { }
  ngOnInit() {


    this.EncryptPageName();
    this.EncryptPageUrl();
    this.RoleList();

    this.RoleDetail();
    this.deleteText = "";
    this.write_privilege = sessionStorage.getItem('writePrivilege');

    if (this.write_privilege == "false") {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewrole").css("display", "none");
      $('#editbtn').hide();
      $('.material-icons md-18').css("display", "none");
      $('#deletebtn').attr('disabled', 'disabled');
      $('#addnewrole').attr('disabled', 'disabled');
    }
  }

  clear() {
    this.roledetail1 = "";
    this.roleName2 = "";
    this.description = "";
    this.readPrivilege = false;
    this.writePrivilege = false;
    this.remarkroleText = "";

  }
  RoleList() {

    let dataL = {
      param1: "",
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
  roledetail1: any;
  roledetail2: any;
  setdata(com) {
    this.rowNumber1 = com.rowNumber;
    this.roleIDencr = com.param1;
    this.roleName2 = com.param2;
    this.description = com.param3;
    this.readPrivilege = com.param4;
    this.writePrivilege = com.param5;
    this.createdate = com.param6;
    this.updatedate = com.param7;
    this.ownersroleid = this.cryptService.encrypt(com.param8);
    this.roledetail1 = com.param9;
    this.dummyroledetail = this.ownersroleid;
    this.backdetailsbtn();

  }


  check(data) {
    try {
      if (typeof data == 'object') {
        //   console.log("come in object if")
        //  alert(data.param1);
        return data.param1;
      }
      else if (data == '') {
        //   console.log("come in Else if")
      }
      else {
        //  console.log(data.length)

        return data;
      }
    } catch (e) {
      return '';
    }
  }




  EncryptPageName() {
    this.cryptService.encrypt("Role Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  roleDetails = [];
  RoleDetail() {
    this.loading = true;
    this.p = 1;
    this.pagecount = 10;
    this.itemsPerPage = this.pagecount;

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
      this.roleDetails = vendorlist;
      this.count = data.entity.count;
      this.viewcount = data.entity.viewCount;

      this.loading = false;
    });
    this.RoleDetail1();
    $('.modal-backdrop.show').css('display', 'none');
  }
  roleDetails1: any;
  RoleDetail1() {
    this.loading = true;
    this.p = 1;
    let keydata = {

      pageNo: this.p,
      itemsPerPage: "",
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

      let resdatalist = data.entity.list;
      let vendorlist = resdatalist;
      this.roleDetails1 = vendorlist;
      this.PrepareExcelData(this.roleDetails1);
      // this.count = data.entity.count;
      // this.viewcount = data.entity.viewCount;

      this.loading = false;
    });


  }


  RolepageChanged(event) {

    var search = $('#searchData').val();
    var selectrow = $('#selectrow2').val();
    this.p = event;
    this.pagecount = selectrow;
    this.itemsPerPage = this.pagecount;

    let keydata = {
      param1: "",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Distributor Detail Grid BIND LIST 
    try { AddLoader() } catch (e) { alert(e) }

    this.menuAssignmentService.RoleDetailsInRoleManagement(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      let resdatalist = data.entity.list;
      let vendorlist = resdatalist;
      this.roleDetails = vendorlist;
      this.count = data.entity.count;
      this.viewcount = data.entity.viewCount;

      this.loading = false;
    });
    $('.modal-backdrop.show').css('display', 'none');
  }

  Refreshfunction() {
    this.filter = "";
    this.RoleDetail();
    $('.modal-backdrop.show').css('display', 'none');
  }

  searchdata() {
    var search = $('#searchData').val();
    var selectrow = $('#selectrow2').val();

    this.pagecount = selectrow;
    this.itemsPerPage = this.pagecount;
    this.loading = true;


    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.menuAssignmentService.RoleDetailsInRoleManagement(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      let resdatalist = data.entity.list;
      let vendorlist = resdatalist;
      this.roleDetails = vendorlist;
      this.count = data.entity.count;
      this.viewcount = data.entity.viewCount;
      this.loading = false;
    });
    $('.modal-backdrop.show').css('display', 'none');
  }



  editpageform() {
    // alert("click");
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    this.RoleList();
    this.ownerrole_id1 = this.getid(this.roleListArray1, this.roledetail1);

    //  console.log("KJ Value : "+this.divisiondetail);
    //  console.log(this.selectdumdivision);
    //  console.log(this.selectdumdivision);
    //  console.log();
    if (this.write_privilege == "false") {
      $('#editbtn').hide();
    }
    $('.modal-backdrop.show').css('display', 'none');
  }


  getid(data, value) {
    try {
      if (typeof value === 'object') {
        return value.param1;
        // return data.param1;
      }
      else {
        //alert(value)
        var index = data.findIndex(x => x.param2 === value);
        //alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }
  roleListArray1 = []; ownerrole_id1: any;
  editRole() {

    this.ownerrole_id1 = this.getid(this.roleListArray1, this.roledetail1);

    var dummyroledata = $('#dummyroleid').val();

    var rolenamedata = $('#rolenametxt_id2').val();

    var descriptiondata3 = $('#descriptionentry5').val();

    var remark = $('#remarkupdaterole').val();

    this.roleName2 = rolenamedata.substring(0, 1).toUpperCase() + rolenamedata.substring(1);

    this.description = descriptiondata3.substring(0, 1).toUpperCase() + descriptiondata3.substring(1);

    this.remarkroleText = remark.substring(0, 1).toUpperCase() + remark.substring(1);

    var isValid = true;
    if (!dummyroledata && dummyroledata.length <= 0) {

      isValid = false;
      $('#msg_errorentry4').html('Please Select Role Owner').show();
      $('#roleid').focus();
      setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
    }
    if (!rolenamedata && rolenamedata.length <= 0) {
      // console.log("rolenamedata:"+rolenamedata);
      isValid = false;
      $('#msg_errorentry4').html('Please Enter Role Name').show();
      $('#rolenametxt_id2').focus();
      setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
    }
    else
      if (!descriptiondata3 && descriptiondata3.length <= 0) {


        isValid = false;
        $('#msg_errorentry4').html('Please Enter Description').show();
        $('#descriptionentry5').focus();
        setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
      }
      else
        if ((this.readPrivilege == "false" && this.writePrivilege == "false")) {
          isValid = false;
          $('#msg_errorentry4').html('Please Checked Access Role').show();
          setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
        } else
          if (!remark && remark.length <= 0) {
            isValid = false;
            $('#msg_errorremark').html('Please Enter Remark').show();
            $('#remarkupdaterole').focus();
            setTimeout(function () { document.getElementById("msg_errorremark").style.display = "none"; }, 3000);
          }
          else {

            let dataL = {
              remark: this.remarkroleText,
              roleId: this.roleIDencr,
              roleName: this.roleName2,
              roleFunctionality: this.description,
              read: this.readPrivilege,
              write: this.writePrivilege,
              selectOwnersRoleId: this.ownerrole_id1,
              // this.ownersroleid,
              // param1: "NA",
              // param2: this.roleIDencr,
              // param3: this.roleName2,
              // param4: this.description,
              // param5: this.readPrivilege,
              // param6: this.writePrivilege,
              // param7: this.ownersroleid,
              pageID: "12",
              pageName: this.encryptedpageNameValue,
              pageURL: this.encryptedpageUrlValue
            }
            try { AddLoader() } catch (e) { alert(e) }

            this.menuAssignmentService.UpadateRoleInRoleManagement(dataL).subscribe((data) => {
              try { RemoveLoader() } catch (e) { alert(e) }

              //  alert(data);
              this.datafromrespo = data.entity;
              var msg = this.datafromrespo;
              if (data.statuscode == '200') {
                SuccessAlert(msg);
             
                this.Refreshfunction();
                $('#myModalwizard').modal('hide');
                $('#modeldelete').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
              }
              else {
                errorAlert(msg);
              }

            });
          }



  }
  datafromrespo: string;
  selectsectionupdate: any; remarkroleText: any;
  AssignRoleList() {

    this.ownersroleid = this.roledetail1["param1"];
    this.dummyroledetail = this.ownersroleid;
    //alert(this.selectsectionupdate)
  }

  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    // document.getElementById("customerdtls").style.display="block";
    // document.getElementById("bankdtls").style.display="block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="block";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "none";
    //  document.getElementById("bankdtls").style.display="none";
    //  document.getElementById("customerdtls").style.display="none";
    if (this.write_privilege == "false") {
      $('#editbtn').hide();
    }
    $('.modal-backdrop.show').css('display', 'none');
  }

  RoleDeletefunction() {
    var isValid = true;
    var deleteremark = $('#roledelremark').val();
    this.deleteText = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#roledelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.deleteText,
        param2: this.roleIDencr,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }


      this.menuAssignmentService.DeleteRoleInRoleManagement(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == '200') {
          SuccessAlert(msg);
          this.deleteText = "";
          $('#modeldelete').modal('hide');
          $('#myModalwizard').modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
          this.clear();
          this.Refreshfunction();

        }
        else {
          errorAlert(msg);
        }
      });
      // alert("error in inserting data");
    }
    $('.modal-backdrop.show').css('display', 'none');
  }


  closemodal() {
    this.deleteText = "";
    this.clear();
    $('#modeldelete').modal('hide');
  
    $('.modal-backdrop.show').css('display', 'none');
  }

  closeNo() {
    this.deleteText = "";
    $('#modeldelete').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }
  readid1: string;
  writeaccess: string;

  createPDF() {
    let pdfTableData;
    let dataArray = [];

    for (let i = 0; i < this.roleDetails1.length; i++) {

      if (this.roleDetails1[i]["param4"] == 'true') {
        this.readid1 = 'Yes';
      }
      else {
        this.readid1 = 'No';
      }
      if (this.roleDetails1[i]["param5"] == 'true') {
        this.writeaccess = 'Yes';
      }
      else {
        this.writeaccess = 'No';
      }

      pdfTableData = {
        "#": this.roleDetails1[i]["rowNumber"],
        "Role Owner ": this.roleDetails1[i]["param9"],
        "Role Name": this.roleDetails1[i]["param2"],
        "Description": this.roleDetails1[i]["param3"],
        "Read Permission": this.readid1,
        "Write Permission": this.writeaccess
        // "Create Date": this.roleDetails1[i]["param6"],
        // "Update Date": this.roleDetails1[i]["param7"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Role Details");

  }

  excelData: any = [];
  rightaccess: string; crossaccess: string;
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      if (data[i].param4 == 'true') {
        this.rightaccess = 'Yes';
      } else { this.rightaccess = 'No'; }
      if (data[i].param5 == 'true') {
        this.crossaccess = 'Yes';
      } else { this.crossaccess = 'No' }
      try {
        var obj = {

          "#": i + 1,
          "Role Owner": data[i].param9,
          "Role Name": data[i].param2,
          "Description": data[i].param3,
          "Read Permission": this.rightaccess,
          "Write Permission": this.crossaccess

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.RoleDetail1();
    // this.PrepareExcelData(this.roleDetails1);  
    this.excelservice.ExportExcel(this.excelData, 'Role Details', 'roledetails');
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }
  SelectRows() {

    var search = $('#searchData').val();
    var selectrow = $('#selectrow2').val();
    // alert(selectrow);
    this.loading = true;
    // alert("selectrow "+ selectrow);
    this.p = 1;
    this.pagecount = selectrow;
    this.itemsPerPage = this.pagecount;

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.menuAssignmentService.RoleDetailsInRoleManagement(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      let resdatalist = data.entity.list;
      let vendorlist = resdatalist;
      this.roleDetails = vendorlist;
      this.count = data.entity.count;
      this.viewcount = data.entity.viewCount;
      // alert(JSON.stringify(this.roleDetails))
      // this.PrepareExcelData(this.roleDetails );
      // console.log(this.count);
      //  this.PrepareExcelData(this.roleDetails);
      this.loading = false;
    });
    $('.modal-backdrop.show').css('display', 'none');
  }

  onCheckboxChange(e) {
    if (e.target.checked) { this.readPrivilege = "true"; }
    else { this.readPrivilege = "false"; }
  }

  onCheckboxChange1(e) {
    if (e.target.checked) { this.writePrivilege = "true"; }
    else { this.writePrivilege = "false"; }
  }

}