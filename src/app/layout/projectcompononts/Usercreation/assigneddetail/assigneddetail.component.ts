import { array } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { GroupcreationService } from 'src/app/APIService/groupcreation.service';
import { NewUserCreationModelService } from 'src/app/APIService/new-user-creation-model.service';
import { ListService } from 'src/list.service';
import * as xlsx from 'xlsx'
import { CryptService } from '../../services/crypt.service';
import { ExportToExcelService } from '../../services/export-to-excel.service';
import { PdfService } from '../../services/pdf.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-assigneddetail',
  templateUrl: './assigneddetail.component.html',
  styleUrls: ['./assigneddetail.component.css']
})
export class AssigneddetailComponent implements OnInit {
  userKey1: any; encryptedpageNameValue: string;
  encryptedpageUrlValue: string; pageUrl = this.router.url; public loading = false; pagecount: number = 10;
  isMasterSel: boolean; buttonHit = false;
  constructor(public pdfservice: PdfService, public excelservice: ExportToExcelService, private listService: ListService, private groupservice: NewUserCreationModelService, private cryptService: CryptService, private router: Router) {
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.isMasterSel = false;
    this.isSelected = false;

  }
  flag1: number = 0; show: any;
  ngOnInit() {
    // this.userKey1= localStorage.getItem('rid');
    this.userKey1 = sessionStorage.getItem('rid')

    if (this.userKey1 == '10' || this.userKey1 == '11' || this.userKey1 == '16' || this.userKey1 == '21') {
      this.show = true;
      // $("#th_customerid").show();
      // $("#td_customerid").show();
      this.flag1 = 1;
    }
    if (this.userKey1 == '14' || this.userKey1 == '18') {
      this.show = false;
      // $("#th_customerid").hide();
      // $("#td_customerid").hide();
      this.flag1 = 0;
    }

    this.GroupVehicleDetail();
  }


  EncryptPageName() {
    this.cryptService.encrypt("Assigned Vehicle To Group Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  grp_id: any; vehicle_id: any; createdate: any; updatedat: any; cust_name: any; cust_id: any;
  vehicledetail: any; vehid: any; vehname: any;
  customermobileno: any; customeremailid: any; vehicleregno: any; vehiclechasisno: any; vehicleregdate: any;
  vehicleclassid: any; vehicleclassname: any; groupname: any; groupdescription: any; no_ofveh: number;
  setdata(com) {
    this.grp_id = com.param1;
    // this.vehicle_id = com.param2;
    this.createdate = com.param2;            //assign date
    this.no_ofveh = com.param3;
    // this.updatedat = com.param4;
    this.cust_name = com.param4;              //custname
    this.cust_id = com.param5;                //custid
    this.customermobileno = com.param7;
    this.vehicledetail = com.param8;
    // console.log(this.vehicledetail);
    // console.log(this.vehicledetail);
    // this.vehicleregno = com.param9;          
    this.vehiclechasisno = com.param10;
    this.vehicleregdate = com.param11;
    this.vehicleclassid = com.param12;
    this.vehicleclassname = com.param13;

    this.groupname = com.param9;                //grpname
    this.groupdescription = com.param10;

    var grp = this.grp_id;
    this.grpList01.push(grp);

    this.CustVehiclelist1();
    this.vehicleListDetails();

    this.backdetailsbtn();

  }
  itemsPerPage: number; p: number; groupVehicleDetails: any[] = []; count: any = ""; viewcount: number; actualdata: any;
  typeidArray = [];
  GroupVehicleDetail() {

    this.loading = true;

    this.p = 1; this.pagecount = 10;
    this.itemsPerPage = this.pagecount;
    let keydata = {
      // param1: "ev6NSu51ZCatwOlSwehfPw==",
      param1: "",
      param2: "",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.groupservice.VehicleAssigntoUserDetailAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.groupVehicleDetails = data.entity.responsedatalist;
        let dataArr: any;

        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        var count1 = this.count;
        this.loading = false;
        if (count1 == "0") {
          this.groupVehicleDetails = [];
        }
      });
    this.VehicleGroupPDFDetail();
  }
  dataArr1: any[] = []; dataArr2: any[] = [];

  key: string = 'name'; reverse: boolean = true;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }

  editpageform() {
    this.CustVehiclelist1();
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn1").style.display = "none";
    // document.getElementById("customerdtls").style.display="none";
    // document.getElementById("bankdtls").style.display="none";
    document.getElementById("vendordtls").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="none";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    // this.Citylist();
    this.arrayChecked();
    this.ListOfVehArray = this.ListOfCusVehObj;
  }
  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn1").style.display = "block";
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
  }

  filter: any = "";
  Refreshfunction() {
    this.loading = true;
    this.filter = "";
    this.p = 1;
    this.GroupVehicleDetail();
  }




  datafromrespo: any;

  deleteTextgrp: any;
  closemodal() {
    this.deleteTextgrp = "";
    this.grpList01.length = 0;
    this.neweditArr.length = 0;
    $("#SuccessModalGrp").modal('hide');
    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }


  exportToExcel() {
    this.VehicleGroupPDFDetail();
    //console.log(this.excelData[0]);
    this.excelservice.ExportExcel(this.excelData, 'Assigned Vehicle To Employee Details', 'assignedvehicleemployeedetails');
  }

  excelpdfDetails1: any[];
  VehicleGroupPDFDetail() {
    this.loading = true;

    this.p = 1;
    this.itemsPerPage = this.pagecount;
    let keydata = {
      param1: "",
      param2: "",
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }


    this.groupservice.VehicleAssigntoUserDetailAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        var exceldata = data.entity.responsedatalist;
        this.excelpdfDetails1 = exceldata;
        this.PrepareExcelData(exceldata);

        this.loading = false;
      });
  }


  createPDF() {

    let pdfTableData;
    let dataArray = []
    if (this.flag1 == 1) {
      for (let i = 0; i < this.excelpdfDetails1.length; i++) {
        pdfTableData = {
          "#": i + 1,
          "Customer Name": this.excelpdfDetails1[i]["param5"],
          "Employee Name": this.excelpdfDetails1[i]["param14"],
          "Vehicle No.": this.excelpdfDetails1[i]["param9"],
          "Assigned Date": this.excelpdfDetails1[i]["param3"],
        }
        dataArray.push(pdfTableData)
      };
    }
    else {
      for (let i = 0; i < this.excelpdfDetails1.length; i++) {
        pdfTableData = {
          "#": i + 1,
          "Employee Name": this.excelpdfDetails1[i]["param14"],
          "No. of Vehicles": this.excelpdfDetails1[i]["param9"],
          "Assigned Date": this.excelpdfDetails1[i]["param3"],
        }
        dataArray.push(pdfTableData)
      };
    }

    this.pdfservice.CreatePDFData(dataArray, "Assigned Vehicle To Employee Details");

  }


  excelData: any = [];
  PrepareExcelData(data) {
    this.excelData = [];
    if (this.flag1 == 1) {
      for (var i = 0; i < data.length; i++) {
        //try {
        var obj = {

          "#": i + 1,
          "Customer Name": data[i].param5,
          "Employee Name": data[i].param14,
          "Vehicle No.": data[i].param9,
          "Assigned Date": data[i].param3,
        }
        // } catch (e) { }
        this.excelData.push(obj);
        //  console.log("String concat:"+obj)

      }
    } else {
      for (var i = 0; i < data.length; i++) {
        // try {
        var obj1 = {

          "#": i + 1,
          "Employee Name": data[i].param14,
          "Vehicle No.": data[i].param9,
          "Assigned Date": data[i].param3,

        }
        // } catch (e) { }
        this.excelData.push(obj1);

      }
    }

  }

  vehiclelistassigned: any[];
  vehicleListDetails() {
    let dataL = {
      param1: this.cust_id,
      param2: this.userKey1,
      param3: "vehicle Details",
      param4: "",
      param5: this.grp_id,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.vehicleListassignedgroup(dataL).subscribe((data) => {
      let asdfg: any[] = [];
      try { RemoveLoader() } catch (e) { alert(e) }
      this.vehiclelistassigned = data.entity;
      this.vehiclelistassigned.forEach(element => { asdfg.push(element.param1); });
      this.vehidarr = asdfg;

    });
  }

  ListOfCusVehObj: any[]; grpList01 = []; vehidarr: any[]; isSelected: boolean;
  CustVehiclelist1() {
    var m = this.grpList01 = [];
    let keydata = {
      param1: this.cust_id,
      groupList: [],
      divisionList: [],
      subDivisionList: [],
      dpartmentList: [],
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.Customer_VehicleList(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.ListOfCusVehObj = data.entity;
    });


  }

  deleteAssign() {
    // for(let i=0;i < this.vehiclelistassigned.length;i++)
    // {
    //      this.vehidarr.push(this.vehiclelistassigned[i]["param1"]);
    // }
    // console.log("conoole tea"+this.vehidarr);
  }

  newArray: any = []; darr: any = [];
  ListOfVehArray: any[]; fflag: number = 0;
  arrayChecked() {
    var checkedIDsdemo = [];
    for (let i = 0; i < this.ListOfCusVehObj.length; i++) {

      var idparam = this.ListOfCusVehObj[i]["param1"];
      for (let j = 0; j < this.vehiclelistassigned.length; j++) {
        if (JSON.stringify(this.ListOfCusVehObj[i]["param1"]) == JSON.stringify(this.vehiclelistassigned[j]["param1"])) {
          this.fflag = 1;
          this.ListOfCusVehObj[i].isSelected = 'true';
        }
      }
      if (this.fflag == 0) {
        this.ListOfCusVehObj[i].isSelected = 'false';

      }
    }





    this.newArray = this.ListOfCusVehObj;

    //console.log(this.ListOfCusVehObj);

  }
  arrObj: Object; datasave = []; neweditArr = []; remarkgrpvehText: any;

  editassignVehGrp() {
    var remark = $('#remarkupdategrpveh').val();

    this.remarkgrpvehText = remark.substring(0, 1).toUpperCase() + remark.substring(1);
    this.neweditArr = [];

    for (let i = 0; i < this.newArray.length; i++) {
      //  console.log($('#abc' + i).is(":checked"));
      if ($('#abc' + i).is(":checked") == true) {
        this.neweditArr.push(this.newArray[i]["param1"]);
      }
    }
    if (!remark && remark.length <= 0) {

      $('#msg_errorremark').html('Please Enter Remark').show();
      $('#remarkupdategrpveh').focus();
      setTimeout(function () { document.getElementById("msg_errorremark").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue,
        param1: this.remarkgrpvehText,
        param2: this.grp_id,
        vehiclelist: this.neweditArr,
        //this.datasave,
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.groupservice.VehicleAssigntoUserAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;

        if (data.statuscode == '200') {
          $("#SuccessModalGrp").modal('show');
          this.Refreshfunction();
          this.closemodal();

        }
        else {
          $("#ErrorModalGrp").modal('show');
        }
      });
    }
  }





  item1: any;




  SelectRows() {

    var search = $('#searchData').val();
    var selectrow = $('#selectgrpveh').val();


    this.itemsPerPage = selectrow;
    this.pagecount = this.itemsPerPage;
    this.loading = true;
    this.p = 1;



    let keydata = {
      param1: "",
      param2: "",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.groupservice.VehicleAssigntoUserDetailAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.groupVehicleDetails = data.entity.responsedatalist;
        let dataArr: any;

        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        var count1 = this.count;

        if (count1 == "0") {
          this.groupVehicleDetails = [];
        }
        this.loading = false;
      });
  }



  searchdata() {
    var search = $('#searchData').val();
    this.loading = true;
    var selectrow = $('#selectgrpveh').val();


    this.itemsPerPage = selectrow;
    this.pagecount = this.itemsPerPage;
    this.p = 1;


    let keydata = {
      param1: "",
      param2: "",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.groupservice.VehicleAssigntoUserDetailAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.groupVehicleDetails = data.entity.responsedatalist;
        let dataArr: any;

        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        var count1 = this.count;

        if (count1 == "0") {
          this.groupVehicleDetails = [];
        }
        this.loading = false;
      });
  }

  GrpVehpageChanged(event) {
    this.p = event;
    var search = $('#searchData').val();
    this.itemsPerPage = this.pagecount;

    var selectrow = $('#selectgrpveh').val();
    this.itemsPerPage = selectrow;
    this.pagecount = this.itemsPerPage;
    let keydata = {
      param1: "",
      param2: "",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.groupservice.VehicleAssigntoUserDetailAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.groupVehicleDetails = data.entity.responsedatalist;
        let dataArr: any;

        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        var count1 = this.count;

        if (count1 == "0") {
          this.groupVehicleDetails = [];
        }
        this.loading = false;

      });
  }



  checkUncheckAllnew() {
    if ($("#checkedisMaster").prop("checked") == true) {
      for (let i = 0; i < this.newArray.length; i++) {
        $("#abc" + i).prop("checked", true);
      }
    }
    if ($("#checkedisMaster").prop("checked") == false) {
      for (let i = 0; i < this.newArray.length; i++) {
        $("#abc" + i).prop("checked", false);
      }
    }

  }


}
