import { Paramcls } from 'src/paramcls';
import { PdfService } from './../../../services/pdf.service';
import { Router } from '@angular/router';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from 'src/list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportToExcelService } from './../../../services/export-to-excel.service';
import { Subject } from 'rxjs';
import { DevicetypeService } from './../../../../../APIService/devicetype.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-devicetypedetail',
  templateUrl: './devicetypedetail.component.html',
  styleUrls: ['./devicetypedetail.component.css']
})
export class DevicetypedetailComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  timer: any;
  pageUrl = this.router.url;
  private _success = new Subject<string>(); successMessageUpdate: string;
  public loading = false; p: number; pagecount: number = 10; count: number; viewcount: number;
  key: string = 'name'; reverse: boolean = true;
  CustRemarktext: string; filter: string = ''; deleteText9: string; datafromrespo: string;


  cust_email: string; cust_mobno: string; cust_state: any; cust_city: any; cust_alt_mobno: string;
  reg_makename: string; pin_code: string;  // change by KJ
  customer_id: string;
  itemsPerPage: number = 10;
  // ListOfDistributor$:Object;ListOfDealer$:Object;ListOfState$:Object;ListOfCity$:Object;CustomerDetails$:Object; ListOfCustomerType$:Object;  ListOfCustomerCategory$:Object;


  //NgModel Change by KJ
  DeviceTypeDetails: Object;
  DeviceTypeDetails1: any;
  descriptiondevicetype: string;
  devicetype_name: string;
  devicetype_id: string;




  // config = {
  //   displayKey: "param2", // if objects array passed which key to be displayed defaults to description
  //   search: true,
  //   limitTo: this.count,
  //   height: '200px',
  // };
  constructor(public excelservice: ExportToExcelService, private modalService: NgbModal,
    private flashMessage: FlashMessagesService, private listService: ListService,
    private cryptService: CryptService, private router: Router,
    private devicetypeService: DevicetypeService, public pdfservice: PdfService) { }
    write_privilege:string;

  ngOnInit() {

    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    this.count = 0;
    this.viewcount = 0;
    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', false);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        function setClasses(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $(".buttonPrevious").prop('disabled', true);
          } else {
            $(".buttonPrevious").prop('disabled', false);
          }
          if (index == steps) {
            $(".buttonPreviousNext").text('done');
          } else {
            $(".buttonPreviousNext").text('next');
          }
          $(".step-wizard ul li").each(function () {
            $(this).removeClass();
          });
          $(".step-wizard ul li:lt(" + index + ")").each(function () {
            $(this).addClass("done");
          });
          $(".step-wizard ul li:eq(" + index + ")").addClass("active")
          var p = index * (100 / steps);
          $("#prog").width(p + '%');
        }
        $(".step-wizard ul button").click(function () {
          var step = $(this).find("div.step")[0].innerText;
          var steps = $(".step-wizard ul li").length;
          validateAllSteps(step - 1, steps);
        });
        $("#prev").click(function () {
          var step = $(".step-wizard ul li.active div.step")[0].innerText;
          var steps = $(".step-wizard ul li").length;
          setClasses(step - 2, steps - 1);
          displayreviousSection(step - 1);
        });
        $("#next").click(function () {
          if ($(this).text() == 'done') {
            // alert("submit the form?!?")
          } else {
            var step;
            try {
              step = $(".step-wizard ul li.active div.step")[0].innerText;
            } catch (error) {
              step = $(".step-wizard ul li div.step")[0].innerText;
            }

            var steps = $(".step-wizard ul li").length;
            validateAllSteps(step, steps - 1);
            //setClasses(step, steps - 1);
          }
        });

        // initial state setup
        setClasses(0, $(".step-wizard ul li").length);

        function displayreviousSection(index) {

          $(".buttonNext").prop('disabled', false);
          switch (index) {
            case 0:
              $("#step-14").show();
              $("#step-15").hide();
              $("#step-16").hide();
              $("#step-17").hide();
              break;
            case 1:
              $("#step-14").show();
              $("#step-15").hide();
              $("#step-16").hide();
              $("#step-17").hide();
              break;
            case 2:
              $("#step-14").hide();
              $("#step-15").show();
              $("#step-16").hide();
              $("#step-17").hide();
              break;
            case 3:
              $("#step-14").hide();
              $("#step-15").hide();
              $("#step-16").show();
              $("#step-17").hide();
              break;
            default:
              $("#step-14").show();
              $("#step-15").hide();
              $("#step-16").hide();
              $("#step-17").hide();
          }
        }

        function validateAllSteps(index, steps) {
          var isStepValid = true;



          if (validateStep2(index, steps) == false) {
            isStepValid = false;
          } else

            return isStepValid;
        }



        // currently working KJ
        function validateStep2(index, steps) {


          $('#msg_vehiclemake').html('').hide();
          var isValid = true;

          var regmake = $('#regmakename').val();        // value from html makename by KJ
          var regdescription = $('#devicedescriptionname').val();                     // value from html descriptionname by KJ

          // Validate Contact Name
          if (!regmake && regmake.length <= 0) {
            isValid = false;
            $('#msg_vehiclemake').html('Please Enter Vehicle Make Name').show();
            $('#regmakename').focus();
          } else
            if (!regdescription && regdescription.length <= 0) {
              isValid = false;
              $('#msg_vehiclemake').html('Please Enter Description').show();
              $('#devicedescriptionname').focus();
            }



          if (isValid && index == 2) {

            $('#msg_makeid').html('').hide();
            $('#msg_remarkid').html('').hide();
            $("#step-15").hide();
            $("#step-14").hide()
            $("#step-16").show();
            $("#step-17").hide();
            $('#accountNo').focus();

            $(".buttonFinish").prop('disabled', false);
            // $(".buttonNext").prop('disabled', true);
            setClasses(index, steps);
            isValid = false;
          }

          return isValid;
        }



      });
    })(jQuery);
    this.write_privilege =sessionStorage.getItem('writePrivilege');

    if(this.write_privilege == "false")
    {
   
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#adnew").css("display", "none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#adnew').attr('disabled','disabled');
    }

    this.EncryptPageName();
    this.EncryptPageUrl();

    this.DevicetypeDetail();
    this.clear();

    /* ------------------------------- Wizards end Ts------------------------------------------------- */

  }






  //Done By KJ
  EncryptPageName() {
    this.cryptService.encrypt("Device Type Management")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }

  // Done By KJ
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }


  // Done by KJ
  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
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
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
    }
  }

  // Done by KJ
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

 if(this.write_privilege == "false")
 {
   $('#editbtn').hide();
 }

  }

  remarkTextdevicetype: string;

  //update by KJ
  setdata(com: Paramcls) {
    this.devicetype_id = com.param1;
    this.devicetype_name = com.param2;
    this.descriptiondevicetype = com.param5;
    this.backdetailsbtn();
  }
  clear() {
    this.devicetype_name = "";
    this.descriptiondevicetype = "";
    this.remarkTextdevicetype = "";
  }


  devicetypeeditsve() {
    var makeName = $('#regdevicename').val();
    var descriptionName = $('#devicedescriptionname').val();
    var Remarkname = $('#Remarkdeviceupdate').val();
    this.devicetype_name = makeName.substring(0, 1).toUpperCase() + makeName.substring(1);
    this.descriptiondevicetype = descriptionName.substring(0, 1).toUpperCase() + descriptionName.substring(1);
    this.remarkTextdevicetype = Remarkname.substring(0, 1).toUpperCase() + Remarkname.substring(1);

    var isValid = true;
    if (!makeName && makeName.length <= 0) {
      isValid = false;
      $('#msg_errorupdate').html('Please Enter Device type').show();
      $('#regdevicename').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);

    } else
      if (!descriptionName && descriptionName.length <= 0) {
        isValid = false;
        $('#msg_errorupdate').html('Please Enter Description').show();
        $('#devicedescriptionname').focus();
        setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);

      } else
        if (!Remarkname && Remarkname.length <= 0) {
          isValid = false;
          $('#msg_errorupdatetype').html('Please Enter Remark').show();
          $('#Remarkdeviceupdate').focus();
          setTimeout(function () { document.getElementById("msg_errorupdatetype").style.display = "none"; }, 3000);

        }
        else {
          let dataL = {
            remarks: this.remarkTextdevicetype,
            deviceTypeId: this.devicetype_id,
            deviceType: this.devicetype_name,
            "deviceDescription": this.descriptiondevicetype,
            pageID: "7",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
          }

          try { AddLoader() } catch (e) { alert(e) }
          this.devicetypeService.UpdateDevicetypeEditAPI(dataL).subscribe((data) => {
            try { RemoveLoader() } catch (e) { alert(e) }
            this.datafromrespo = data.entity;
            var msg = this.datafromrespo;
            if (data.statuscode == 200) {
              this.devicetype_name = "";
              this.descriptiondevicetype = "";
              SuccessAlert(msg);
              this.ngOnInit();

              $('#myModalwizard').modal('hide');
              $('.modal-backdrop.show').css('display', 'none');
            }
            else {
              errorAlert(msg);
            }

          });
        }
  }

















  DevicetypeDetail() {

    this.loading = true;
    this.pagecount = 10;
    this.itemsPerPage = this.pagecount;
    this.p = 1;
    let keydata = {
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
    this.devicetypeService.DevicetypeDetailsAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;
        // console.log("wekcome_ "+resdata);
        let vendorlist = resdatalist;
        this.DeviceTypeDetails = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        //  console.log(this.count);
        this.loading = false;
      });
    this.DeviceTypeDetail1();
  }

  /*---------------- cunstomer details function end  --------------------*/
  /*---------------Customer search start --------------------------*/

  searchdata() {
    var search = $('#searchData').val();
    this.loading = true;
    this.p = 1;
    this.itemsPerPage = this.pagecount;
    //this.pagecount = 10;
    //  console.log("p" + this.p);
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
    // Distributor Detail Grid BIND LIST    
    this.devicetypeService.DevicetypeDetailsAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.DeviceTypeDetails = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.loading = false;
      });
  }







  Refreshfunction() {
    this.loading = true;
    this.filter = "";
    this.p = 1;
    this.ngOnInit();
  }

  /*------------------Search End ---------------------*/


  createPDF() {

    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.DeviceTypeDetails1.length; i++) {
      pdfTableData = {
        "#": this.DeviceTypeDetails1[i]["rowNumber"],
        "Device type": this.DeviceTypeDetails1[i]["param2"],
        "Description": this.DeviceTypeDetails1[i]["param4"],
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Device Type Details");

  }


  sort(key) {

    // alert(key);

    this.key = key;
    this.reverse = !this.reverse;

  }

  // Done by KJ

  DeviceDeletefunction() {
    var isValid = true;
    var deleteremark = $('#makedelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      $('#msg_error_delete').html('Please Enter Remark.').show();
      $('#makedelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.devicetype_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }

      try { AddLoader() } catch (e) { alert(e) }
      this.devicetypeService.DeleteDevicetypeAPI(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(dataL);
        //  alert(data);

        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == 200) {
          SuccessAlert(msg);
          this.ngOnInit();
          $('#modeldelete').modal('hide');
          $('#myModalwizard').modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
        }
        else {
          errorAlert(msg);
        }
      });
      // alert("error in inserting data");
    }
  }


  closemodal() {
    this.deleteText9 = "";
  
    $('#modeldelete').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }


  SelectRows() {

    var search = $('#searchData').val();
    var selectrow = $('#selectrow2').val();

    // alert(selectrow)
    this.loading = true;
    // alert("selectrow "+ selectrow);
    this.p = 1; this.pagecount = selectrow;
    this.itemsPerPage = this.pagecount;
    //  console.log("p" + this.p);

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
    this.devicetypeService.DevicetypeDetailsAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        let resdatalist = data.entity.responsedatalist;
        let vendorlist = resdatalist;
        this.DeviceTypeDetails = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }


  DeviceTypepageChanged(event) {

    this.p = event;
    var p1 = $("#selectrow2").val();
    var search = $('#searchData').val();
    // alert(p1);
    this.pagecount = p1;
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

    // Distributor Detail Grid BIND LIST    
    this.devicetypeService.DevicetypeDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.DeviceTypeDetails = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }



  exportToExcel() {
    this.DeviceTypeDetail1();
    this.excelservice.ExportExcel(this.excelData, 'Device Type Details', 'devicetypedetails');
  }

  excelData: any = [];
  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Device type": data[i].param2,
          "Description": data[i].param3,
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }


  DeviceTypeDetail1() {

    this.loading = true;
    let keydata = {
      // param1: this.divisiondetail["param1"],
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
    // Distributor Detail Grid BIND LIST    
    this.devicetypeService.DevicetypeDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.DeviceTypeDetails1 = vendorlist;
        this.PrepareExcelData(this.DeviceTypeDetails1);

        this.loading = false;

      });
  }
}

