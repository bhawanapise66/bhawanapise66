import { PdfService } from './../../services/pdf.service';
import { DriverService } from './../../services/driver.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ListService } from 'src/list.service';
import { ExportToExcelService } from '../../services/export-to-excel.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  showDetails = new EventEmitter()
  driverNameedit: string; licanceedit: any; primaryNumberedit: string; altNumberedit: string;

  pageUrl = this.router.url; encryptedpageNameValue: any; encryptedpageUrlValue: any;
  customerlistedit: any[]; customerObjedit: any; customerIdedit: any = ''; customerNameedit: any;
  vehicleListedit: any[]; vehicleObjedit: any; vehicleIdedit: any = ''; vehicleNoedit: any;
  statesListedit: any[]; stateObjedit: any; stateIdedit: any = ''; stateNameedit: any;
  cityListedit: any[]; cityObjedit: any; cityIdedit: any = ''; cityNameedit: any;
  emailedit: string = ''; addressedit: string = ''; pincodeedit: string = '';


  driverIdedit: any;

  roleId: any;
  isCustomer: boolean = false;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  configvehicle = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
    placeholder: 'Select Vehicle',
  }
  resMessage: any;
  pageNumber: any = 1;
  itemsPerPage: any = 10;
  filter: any = '';
  totalRecords: any = 'NA';
  driverdetails: any = [

  ];
  deleteText: any;
  datafromrespo: any;
  viewcount: any;
  totalcount: any;
  valueAlreadyGot: boolean = false;
  driverdetailspdf: any;
  excelData: any[];
  assignmentStatus: any;
  key; reverse; remarkedit: string = ''

  constructor(private cs: CryptService, private ls: ListService, private router: Router, private driverService: DriverService,
    private pdfservice: PdfService, private excelservice: ExportToExcelService) {
    this.encryptedpageNameValue = this.cs.encrypt("Driver Details");
    this.encryptedpageUrlValue = this.cs.encrypt(this.pageUrl);

    this.roleId = sessionStorage.getItem('rid');
    if (this.roleId == "10" || this.roleId == "11" || this.roleId == "16" || this.roleId == "21") {
      this.isCustomer = true;
    }
  }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#myModalwizard').on('shown.bs.modal', function () {
          $('#customerupdate').focus();
        })
      });
    })(jQuery);

    (function ($) {
      $(document).ready(function () {
        $('#customerupdate').focus();
        $("#save").prop('disabled', true);
        $("#next").prop('disabled', false);

        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        function setClasses(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $("#next").prop('disabled', true);
            $("#next").prop('disabled', false);

          } else {
            $("#prev").prop('disabled', false);
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

          $("#next").prop('disabled', false);
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


          if (validateStep1(index, steps) == false) {
            isStepValid = false;
          } else if (validateStep2(index, steps) == false) {
            isStepValid = false;
          }
          //  else if (validateStep3(index, steps) == false) {
          //   isStepValid = false;
          // } else if (validateStep4(index, steps) == false) {
          //   isStepValid = false;
          // }
          return isStepValid;
        }

        function validateStep1(index, steps) {
          $('#distrbutorname').focus();
          $('#msg_error').html('').hide();

          var isValid = true;
          var customer = $("#customeridupdate").val();
          var driver = $("#dnameupdate").val();
          var licance = $("#licnumupdate").val();
          var vehicle = $("#vehicleupdate").val();
          var mobile = $("#mobileupdate").val();
          var alternatemob = $("#altnumupdate").val();

          var rid = sessionStorage.getItem('rid');
          if (rid == '10' || rid == '11') {
            if (customer.length <= 0) {
              isValid = false;
              $('#msg_error').html('Please Select Customer').show();
              $('#distrbutorname').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
          }
          //Validate Vendor Name

          else if (!driver && driver.length <= 0 || driver.length <= 3) {
            // validate short code
            isValid = false;
            $('#msg_error').html('Please Enter Driver Name').show();
            $('#dnameupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          }
          else if (!licance && licance.length <= 0 || licance.length < 15) {
            // validate Official No
            isValid = false;
            $('#msg_error').html('Please Enter Licance Number').show();
            $('#licnumupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);


          }
          else if (!mobile && mobile.length <= 0 || mobile.length < 10 || mobile.length > 13) {
            // validate Official Email
            isValid = false;
            $('#msg_error').html('Please Enter Mobile Number').show();
            $('#mobileupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          } else if ((alternatemob != null || alternatemob != "" || alternatemob != undefined) && alternatemob.length >= 1 && alternatemob.length <= 9) {

            isValid = false;
            $('#msg_error').html('Please Enter Alternate Number').show();
            $('#altnumupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }


          if (isValid && index == 1) {


            $('#msg_error').html('').hide();
            $("#step-14").hide()
            $("#step-15").show();
            $("#step-16").hide();
            $("#step-17").hide();

            setClasses(index, steps);
            $("#save").prop('disabled', false);
            $("#next").prop('disabled', true);
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
          return true;
          $('#pername').focus();

          // $('#msg_contactNo').html('').hide();
          // $('#msg_alternateNo').html('').hide();
          // $('#msg_State').html('').hide();
          // $('#msg_city').html('').hide();
          $('#msg_error_contact').html('').hide();
          var isValid = true;
          var personname = $('#pername').val();
          var contactNo = $('#contactNo').val();
          var alternateNo = $('#alternateNo').val();
          var regaddress = $('#regaddressnew').val();
          var state = $('#state').val();
          var city = $('#city').val();
          var pinCodeNo = $('#pincodeno').val();
          // Validate Contact Name
          if (!personname && personname.length <= 0) {
            isValid = false;
            $('#msg_error_contact').html('Please Enter Person Name').show();
            $('#pername').focus();
          } else
            if (!contactNo && contactNo.length <= 0) {
              isValid = false;
              $('#msg_error_contact').html('Please Enter Contact Number').show();
              $('#contactNo').focus();
            }

            else if (state == null) {
              // validate state
              isValid = false;
              $('#msg_error_contact').html('Please Enter State').show();
              $('#state').focus();

            } else if (city == null) {
              // validate city
              isValid = false;
              $('#msg_error_contact').html('Please Enter City').show();
              $('#city').focus();
            }
            else
              if (!regaddress && regaddress.length <= 0) {
                // validate Alternate Number
                isValid = false;
                $('#msg_error_contact').html('Please Enter Reg Address').show();
                $('#regaddressnew').focus();
              } else
                if (!pinCodeNo && pinCodeNo.length <= 0) {
                  // validate Alternate Number
                  isValid = false;
                  $('#msg_pincode').html('Please Enter Valid Pincode No.').show();
                  $('#alternateNo').focus();
                }

          if (isValid && index == 2) {

            $('#msg_contactNo').html('').hide();
            $('#msg_alternateNo').html('').hide();
            $('#msg_state').html('').hide();
            $('#msg_city').html('').hide();
            $("#step-15").hide();
            $("#step-14").hide()
            $("#step-16").show();
            $("#step-17").hide();
            $('#accountNo').focus();

            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);
            setClasses(index, steps);
            isValid = false;
          }

          return isValid;
        }


        // function validateStep3(index, steps) {

        //   $('#accountNo').focus();
        //   var isValid = true;
        //   var accountNo = $('#accountNo').val();
        //   $('#msg_accountNo').html('').hide();
        //   // Validate Account No
        //   if (!accountNo && accountNo.length <= 0) {
        //     isValid = false;
        //     $('#msg_accountNo').html('Please Enter Account Number').show();
        //     $('#accountNo').focus();
        //   }
        //   if (isValid && index == 3) {

        //     $('#msg_contactNo').html('').hide();
        //     $("#step-14").hide();
        //     $("#step-15").hide();
        //     $("#step-16").hide();
        //     $("#step-17").show();

        //     setClasses(index, steps);
        //     $(".buttonNext").prop('disabled', true);
        //     $(".buttonFinish").prop('disabled', false);
        //     isValid = false;
        //   }
        //   return isValid;
        // }
        // function validateStep4(index, steps) {
        //   return true;
        // }
      });
    })(jQuery);

    this.driverDetails();
  }

  getCustomerId() {
    this.customerIdedit = this.customerObjedit.param1;
    this.VehicleList()
  }

  customerlist() {
    let dataL = {
      param1: this.customerIdedit,
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.ls.CustomerListAPI(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.customerlistedit = response.entity.list;

        this.customerlistedit.forEach(element => {
          if (this.customerNameedit == element.param2) { this.customerObjedit = element }
        });
      }
    })
  }

  VehicleList() {
    let dataL = {
      param1: this.customerIdedit,
      param2: "",
      pageID: "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.ls.VehicleList(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.vehicleListedit = response.entity.list;
      }
    })
  }

  getVehicleId() {
    this.vehicleIdedit = this.vehicleObjedit.param1;
  }

  Statelist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { }
    this.ls.SelectStateListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { }
        this.statesListedit = data.entity.list;
        this.statesListedit.forEach(element => {
          if (this.stateNameedit == element.param2) { this.stateObjedit = element }
        });
      });
  }

  getStateId() {
    this.cityIdedit = ''; this.cityObjedit = null;
    this.stateIdedit = this.stateObjedit.param1; this.Citylist()
  }

  getCityId() {
    this.cityIdedit = this.cityObjedit.param1;
  }

  Citylist() {
    let keydata = {
      param1: this.stateIdedit, // this.selectstate,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader();
    this.ls.SelectCityListAPI(keydata).subscribe((data) => {
      RemoveLoader();
      this.cityListedit = data.entity.list;

      this.cityListedit.forEach(element => {
        if (this.cityNameedit == element.param2) { this.cityObjedit = element }
      });
    });
  }

  driverDetails() {
    if (this.valueAlreadyGot == false) {
      this.totalRecords = 'NA'
    }
    else {
      this.totalRecords = this.totalcount;
    }
    let dataL = {
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalRecords,
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader();
    this.driverService.driverDetails(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.driverdetails = response.entity.responsedatalist;
        this.viewcount = response.entity.viewCount;
        if (this.valueAlreadyGot == false) {
          this.totalcount = response.entity.count;
          // this.driverDetailsPDF();
        }
      }
      else {
        // this.datafromrespo =response.entity;
        // $("#ErrorModal").modal('show');
      }
    })
  }

  changeItemsPerPage() {
    this.pageNumber = 1;
    this.valueAlreadyGot = true;
    this.driverDetails();
  }

  pageChange(event) {
    this.pageNumber = event;
    this.valueAlreadyGot = true;
    this.driverDetails();
  }

  searchdata() {
    this.pageNumber = 1;
    this.valueAlreadyGot = false;
    this.driverDetails();
  }

  Refreshfunction() {
    this.valueAlreadyGot = false;
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.driverDetails();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  createExcel() {
    let dataL = {
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": 'NA',
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader();
    this.driverService.driverDetails(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        let excel = response.entity.responsedatalist;
        this.PrepareExcelData(excel)
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    var obj: any;
    var customer: boolean = true
    let rid = sessionStorage.getItem('rid');
    if (rid == '10' || rid == "11" || rid == "16" || rid == "21") {
      for (var i = 0; i < data.length; i++) {
        obj = {
          "#": data[i]["rowNumber"],
          "Customer": data[i]["param17"],
          "Driver": data[i]["param2"],
          "Licance No.": data[i]["param15"],
          "Mobile No.": data[i]["param3"],
          "Alternate No.": data[i]["param5"],
          "Email Id.": data[i]["param4"],
          "Address": data[i]["param6"],
          "City": data[i]["param8"],
        }
        this.excelData.push(obj);
      }
    }
    else {
      for (var i = 0; i < data.length; i++) {
        obj = {
          "#": data[i]["rowNumber"],
          "Driver": data[i]["param2"],
          "Licance No.": data[i]["param15"],
          "Mobile No.": data[i]["param3"],
          "Alternate No.": data[i]["param5"],
          "Email Id.": data[i]["param4"],
          "Address": data[i]["param6"],
          "City": data[i]["param8"],
        }
        this.excelData.push(obj);
      }
    }
    this.exportToExcel()
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, "Driver Details", 'driver')
  }

  createPDF() {
    let dataL = {
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": 'NA',
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader();
    this.driverService.driverDetails(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.driverdetailspdf = response.entity.responsedatalist;
        this.preparePDFData()
      }
    })
  }


  preparePDFData() {
    var iscustomer: boolean

    let rid = sessionStorage.getItem('rid');
    if (rid == "10" || rid == "11" || rid == '16' || rid == "21") {
      iscustomer = false
    }
    else { iscustomer = true }
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.driverdetailspdf.length; i++) {
      if (iscustomer == true) {
        pdfTableData = {
          "#": i + 1,
          "DRIVER": this.driverdetailspdf[i]["param2"],
          "LICANCE NO.": this.driverdetailspdf[i]["param15"],
          "MOBILE NO.": this.driverdetailspdf[i]["param3"],
          "EMAIL ID": this.driverdetailspdf[i]["param4"],
          "VEHICLE NO.": this.driverdetailspdf[i]["param20"],
          "STATUS": this.driverdetailspdf[i]["param27"],
        }
      }
      else {
        pdfTableData = {
          "#": i + 1,
          "CUSTOMER": this.driverdetailspdf[i]["param17"],
          "DRIVER": this.driverdetailspdf[i]["param2"],
          "LICANCE NO.": this.driverdetailspdf[i]["param15"],
          "MOBILE NO.": this.driverdetailspdf[i]["param3"],
          "EMAIL ID": this.driverdetailspdf[i]["param4"],
          "VEHICLE NO.": this.driverdetailspdf[i]["param20"],
          "STATUS": this.driverdetailspdf[i]["param27"],
        }
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Driver Details");
  }

  setdata(data) {
    this.ngOnInit()
    this.driverIdedit = data.param1;
    this.driverNameedit = data.param2;
    this.primaryNumberedit = data.param3;
    this.emailedit = data.param4;
    this.altNumberedit = data.param5;
    this.addressedit = data.param6;
    this.cityIdedit = data.param8;
    this.cityNameedit = data.param26;
    this.cityObjedit = data.param26;
    this.stateIdedit = data.param9;
    this.stateNameedit = data.param25;
    this.stateObjedit = data.param25;
    this.pincodeedit = data.param10;
    this.customerIdedit = data.param14;
    this.licanceedit = data.param15;
    this.customerNameedit = data.param17;
    this.customerObjedit = data.param17;
    this.vehicleNoedit = data.param20;
    this.vehicleIdedit = data.param22;
    this.vehicleObjedit = data.param20;
    this.assignmentStatus = data.param27;
    if (this.altNumberedit == "0") { this.altNumberedit = '' }

    this.backdetailsbtn();

  }

  backdetailsbtn() {
    document.getElementById("assignbtn").style.display = "block";

    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
  }

  editpageform() {

    document.getElementById("assignbtn").style.display = "none";

    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    this.customerlist();
    this.VehicleList();
    this.Citylist();
    this.Statelist();

  }

  assignpageform() {
    document.getElementById("assignform").style.display = "block"
    this.VehicleList();
  }

  assignVehicle() {
    let newStatus;
    if (this.assignmentStatus == "Not Assigned") {
      newStatus = "Assigned"
    }
    else {
      newStatus = "Not Assigned"
    }

    if (this.vehicleIdedit == null || this.vehicleIdedit == '') {
      $('#vehicleEmpty').html('Please Select Vehicle').show();
      $('#vehicleassign').focus();
      setTimeout(function () { document.getElementById("vehicleEmpty").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        "remarks": "",
        "vehicleId": this.vehicleIdedit,
        "driverId": this.driverIdedit,
        "customerId": this.customerIdedit,
        "status": newStatus,
        "pageNo": "",
        "itemsPerPage": "",
        "searchBy": "",
        "searchType": "",
        "totalRecords": "NA",
        "pageID": "7",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.driverService.AssignVehicle(dataL).subscribe((response) => {
        RemoveLoader();
        if (response.statuscode == 200) {
          this.closemodal()
          SuccessAlert(response.entity)
        }
        else {
          errorAlert(response.entity)
        }
      })
    }
  }

  updateDriver() {
    if (this.emailedit == null || this.emailedit == '' || this.emailedit.indexOf("@") < 1 || this.emailedit.lastIndexOf('.') < this.emailedit.indexOf('@') + 2 || this.emailedit.lastIndexOf('.') + 2 >= this.emailedit.length) {
      $('#msg_error_contact').html('Please Enter Email Address').show();
      $('#emailupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (this.stateIdedit == null || this.stateIdedit == '') {
      $('#msg_error_contact').html('Please Select State').show();
      $('#stateup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (this.cityIdedit == null || this.cityIdedit == '') {
      $('#msg_error_contact').html('Please Select City').show();
      $('#cityup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (this.addressedit == null || this.addressedit == '' || this.addressedit.length < 5) {
      $('#msg_error_contact').html('Please Enter Address').show();
      $('#addressupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (this.pincodeedit == null || this.pincodeedit == '' || this.pincodeedit.length < 6) {
      $('#msg_error_contact').html('Please Enter Pincode').show();
      $('#pincodeupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (this.remarkedit == null || this.remarkedit == '' || this.remarkedit.length < 5) {
      $('#invalidremark').html('Please Enter Remark').show();
      $('#driverremark').focus();
      setTimeout(function () { document.getElementById("invalidremark").style.display = "none"; }, 3000);
    }

    else {
      let dataL = {
        remark: this.remarkedit,
        driverId: this.driverIdedit,
        drivername: this.driverNameedit,
        drivermobileno: this.primaryNumberedit,
        driveremailid: this.emailedit,
        driveralternateno: this.altNumberedit,
        driveraddress: this.addressedit,
        driverarea: "",
        driverlandmark: "",
        drivercity: this.cityIdedit,
        driverstate: this.stateIdedit,
        driverpincode: this.pincodeedit,
        customerid: this.customerIdedit,
        driverlicno: this.licanceedit,
        vehicleid: this.vehicleIdedit
      }
      AddLoader()
      this.driverService.updateDriver(dataL).subscribe((response) => {
        RemoveLoader();
        if (response.statuscode == 200) {
          this.closemodal()
          SuccessAlert(response.entity)
        }
        else {
          errorAlert(response.entity)
        }
      })
    }
  }


  deleteDriver() {
    if (this.deleteText == null || this.deleteText == '') {
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#deleteremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        "param1": this.deleteText,
        "param2": this.driverIdedit
      }
      $("#modaldelete").modal('hide');

      AddLoader()
      this.driverService.deleteDriver(dataL).subscribe((response) => {
        RemoveLoader();
        if (response.statuscode == 200) {
          this.closemodal()
          SuccessAlert(response.entity)
        }
        else {
          errorAlert(response.entity)
        }
      })
    }
  }

  clearfunction() {

    this.driverNameedit = ''; this.primaryNumberedit = ''; this.emailedit = ''; this.altNumberedit = '';
    this.addressedit = ''; this.cityIdedit = '';
    this.stateIdedit = ''; this.pincodeedit = ''; this.customerIdedit = ''; this.licanceedit = ''; this.vehicleIdedit = '';
    this.customerObjedit = null; this.vehicleObjedit = null; this.stateObjedit = null; this.cityObjedit = null;
    this.deleteText = ''
    document.getElementById("assignform").style.display = "none"
  }

  closemodal() {
    this.ngOnInit();
    $('#modaldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }

}
