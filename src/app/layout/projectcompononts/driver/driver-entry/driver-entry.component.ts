import { DriverService } from './../../services/driver.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

declare var SuccessAlert: any;
declare var errorAlert: any;

@Component({
  selector: 'app-driver-entry',
  templateUrl: './driver-entry.component.html',
  styleUrls: ['./driver-entry.component.css']
})
export class DriverEntryComponent implements OnInit {
  @Output()
  showDetails = new EventEmitter();

  driverName: string; licenace: any; primaryNumber: string; altNumber: string;

  pageUrl = this.router.url; encryptedpageNameValue: any; encryptedpageUrlValue: any;
  customerlist: any; customerObj: any; customerId: any = '';
  vehicleList: any; vehicleObj: any; vehicleId: any = '';
  statesList: any; stateObj: any; stateId: any = '';
  cityList: any; cityObj: any; cityId: any = '';
  email: any = ''; address: any = ''; pincode: string = '';

  roleId: any;
  isCustomer: boolean = false;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  resMessage: any;
  driverStatus: string = "Temporary";
  constructor(private cs: CryptService, private ls: ListService, private router: Router, private driverService: DriverService) {
    this.encryptedpageNameValue = this.cs.encrypt("Driver Entry");
    this.encryptedpageUrlValue = this.cs.encrypt(this.pageUrl);

    this.roleId = sessionStorage.getItem('rid');
    if (this.roleId == "10" || this.roleId == "11" || this.roleId == "16" || this.roleId == "21") {
      this.isCustomer = true;
    }
  }



  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#customerentry').focus();
        })
      });
    })(jQuery);

    (function ($) {
      $(document).ready(function () {
        $('#customerentry').focus();
        $("#saveentry").prop('disabled', true);
        $("#nextentry").prop('disabled', false);

        // $("#step-14").show();
        // $("#step-15").hide();
        // $("#step-16").hide();
        // $("#step-17").hide();
        // $("#step-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();


        $('#customerentry').focus();
        $("#saveentry").prop('disabled', true);
        $("#nextentry").prop('disabled', false);

        $("#stepentry-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();
        function setClassesentry(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $("#preventry").prop('disabled', true);
          } else {
            $("#preventry").prop('disabled', false);
          }
          if (index == steps) {
            $("#nextentry").text();
          } else {
            $("#nextentry").text();
          }
          $(".step-wizardentry ul li").each(function () {
            $(this).removeClass();
          });
          $(".step-wizardentry ul li:lt(" + index + ")").each(function () {
            $(this).addClass("done");
          });
          $(".step-wizardentry ul li:eq(" + index + ")").addClass("active")
          var p = index * (100 / steps);
          $("#progentry").width(p + '%');
        }
        $(".step-wizardentry ul button").click(function () {
          var step = $(this).find("div.step")[0].innerText;
          var steps = $(".step-wizardentry ul li").length;
          validateAllStepsentry(step - 1, steps);
        });
        $("#preventry").click(function () {
          var step = $(".step-wizardentry ul li.active div.step")[0].innerText;
          var steps = $(".step-wizardentry ul li").length;
          setClassesentry(step - 2, steps - 1);
          displayreviousSectionentry(step - 1);
        });
        $("#nextentry").click(function () {
          if ($(this).text() == 'done') {
          } else {
            var step;
            try {
              step = $(".step-wizardentry ul li.active div.step")[0].innerText;
            } catch (error) {
              step = $(".step-wizardentry ul li div.step")[0].innerText;
            }

            var steps = $(".step-wizardentry ul li").length;
            validateAllStepsentry(step, steps - 1);
            //setClassesentry(step, steps - 1);
          }
        });

        // initial state setup
        setClassesentry(0, $(".step-wizardentry ul li").length);

        function displayreviousSectionentry(index) {

          $("#nextentry").prop('disabled', false);
          switch (index) {
            case 0:
              $("#stepentry-14").show();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
              break;
            case 1:
              $("#stepentry-14").show();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
              break;
            case 2:
              $("#stepentry-14").hide();
              $("#stepentry-15").show();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
              break;
            case 3:
              $("#stepentry-14").hide();
              $("#stepentry-15").hide();
              $("#stepentry-16").show();
              $("#stepentry-17").hide();
              break;
            default:
              $("#stepentry-14").show();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
          }
        }

        function validateAllStepsentry(index, steps) {
          var isStepValid = true;

          if (validateentryStep1(index, steps) == false) {
            isStepValid = false;
          } else if (validateentryStep2(index, steps) == false) {
            isStepValid = false;
          } else if (validateentryStep3(index, steps) == false) {
            isStepValid = false;
          } else if (validateentryStep4(index, steps) == false) {
            isStepValid = false;
          }
          return isStepValid;
        }

        var rid = sessionStorage.getItem('rid');
        var isUserCustomer;
        if (rid == "10" || rid == "11" || rid == "16" || rid == "21") {
          isUserCustomer = false
        }
        else {
          isUserCustomer = true;
        }

        function validateentryStep1(index, steps) {
          $('#customerentry').focus();
          $('#msg_errorentry').html('').hide();


          var isValid = true;
          var customer = $('#customerid1').val();
          var drivername = $('#dname').val();
          var licancenum = $('#licnum').val();
          var vehicleNo = $('#vehiclenum').val();
          var mobilenum = $('#mobnum').val();
          var altmobnum = $('#altnum').val();

          // Validate Vendor Name


          // if (rid == "10" || rid == "11" || rid == "16" || rid == "21") {
          if ((customer==null || customer =='') && (rid == "10" || rid == "11" || rid == "16" || rid == "21") ) {
            //   // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Select Customer').show();
            $('#customerentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          // }

          else if (!drivername || drivername.length < 3) {
            isValid = false;
            //alert(""+Distname);
            $('#msg_errorentry').html('Please Enter Driver Name').show();
            $('#dname').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          }
          else if (!licancenum || licancenum.length < 15) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Enter Licance Number').show();
            $('#licnum').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!vehicleNo && vehicleNo.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Select Vehicle').show();
            $('#vehicleEntry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          } else if (!mobilenum || mobilenum.length <= 9) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Mobile Number').show();
            $('#mobnum').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (altmobnum.length > 0 && altmobnum.length < 10) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Altername Mobile Number').show();
            $('#altnum').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }



          if (isValid && index == 1) {

            $('#msg_errorentry').html('').hide();
            $("#stepentry-14").hide()
            $("#stepentry-15").show();
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();

            setClassesentry(index, steps);
            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);
            $('#emailEntry').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateentryStep2(index, steps) {
          $('#emailEntry').focus();

          $('#msg_error_contactentry').html('').hide();
          var isValid = true;


          if (isValid && index == 2) {

            $('#msg_contactNo').html('').hide();
            $('#msg_alternateNo').html('').hide();
            $('#msg_state').html('').hide();
            $('#msg_city').html('').hide();
            $("#stepentry-15").show();
            $("#stepentry-14").hide()
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();
            $('#accountNo').focus();

            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);
            setClassesentry(index, steps);
            isValid = false;
          }

          return isValid;
        }


        function validateentryStep3(index, steps) {

          $('#emailEntry').focus();
          var isValid = true;
          var accountNo = $('#accountNoentry').val();
          $('#msg_accountNoentry').html('').hide();
          // Validate Account No
          if (!accountNo && accountNo.length <= 0) {
            isValid = false;
            $('#msg_accountNoentry').html('Please Enter Account Number').show();
            $('#accountNoentry').focus();
          }
          if (isValid && index == 3) {

            $('#msg_accountNoentry').html('').hide();
            $("#stepentry-14").hide();
            $("#stepentry-15").hide();
            $("#stepentry-16").hide();
            $("#stepentry-17").show();

            setClassesentry(index, steps);
            $("#nextentry").prop('disabled', true);
            isValid = false;
          }
          return isValid;
        }
        function validateentryStep4(index, steps) {
          // alert("success")
          return true;
        }

      });




    })(jQuery);

    this.customerList();
    this.VehicleList()
    this.Statelist();

  }

  getCustomerId() {
    this.customerId = this.customerObj.param1;
    this.VehicleList()
  }
  customerList() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.ls.CustomerListAPI(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.customerlist = response.entity.list;
      }
    })
  }
  VehicleList() {
    let dataL = {
      param1: this.customerId,
      param2: "",
      pageID: "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.ls.VehicleList(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.vehicleList = response.entity.list;
      }
    })
  }

  getVehicleId() {
    this.vehicleId = this.vehicleObj.param1;
  }

  Statelist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.ls.SelectStateListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.statesList = data.entity.list;
      });
  }

  getStateId() {
    this.stateId = this.stateObj.param1;
    this.cityId = ''; this.cityObj = null;
    this.Citylist();
  }

  Citylist() {
    this.stateId = this.stateObj.param1;


    let keydata = {
      param1: this.stateId, // this.selectstate,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.ls.SelectCityListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.cityList = data.entity.list;
    });
  }

  getCityId() {
    this.cityId = this.cityObj.param1
  }

  insertDriver() {
    if (this.email == null || this.email == '' || this.email.includes("@") == false || this.email.includes('.') == false) {
      $('#msg_error_contactentry').html('Please Enter Email Address').show();
      $('#emailEntry').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    }
    else if (this.stateId == null || this.stateId == '') {
      $('#msg_error_contactentry').html('Please Select State').show();
      $('#stateentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    }
    else if (this.cityId == null || this.cityId == '') {
      $('#msg_error_contactentry').html('Please Select City').show();
      $('#cityentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    }
    else if (this.address == null || this.address == '') {
      $('#msg_error_contactentry').html('Please Enter Address').show();
      $('#addressEntry').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    }
    else if (this.pincode == null || this.pincode == '') {
      $('#msg_error_contactentry').html('Please Enter Pincode').show();
      $('#pincodeentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    }
    else {

      let dataL = {
        remark: "ok",
        drivername: this.driverName,
        drivermobileno: this.primaryNumber,
        driveremailid: this.email,
        driveralternateno: this.altNumber,
        driveraddress: this.address,
        driverarea: "",
        driverlandmark: "",
        drivercity: this.cityId,
        driverstate: this.stateId,
        driverpincode: this.pincode,
        customerid: this.customerId,
        driverlicno: this.licenace,
        vehicleid: this.vehicleId,
        driverstatus: this.driverStatus
      }
      AddLoader()
      this.driverService.insertDriver(dataL).subscribe((response) => {
        RemoveLoader()
        this.resMessage = response.entity;
        if (response.statuscode == 200) {
          SuccessAlert(response.entity)
          this.showDetails.emit()
          this.closemodal()
        }
        else {
          errorAlert(response.entity)
          // $("#ErrorModalEntry").modal('show');
        }
      })
    }
  }

  clearfunction() {

    this.driverName = ''; this.primaryNumber = ''; this.email = ''; this.altNumber = ''; this.address = ''; this.cityId = '';
    this.stateId = ''; this.pincode = ''; this.customerId = ''; this.licenace = ''; this.vehicleId = '';
    this.customerObj = null; this.vehicleObj = null; this.stateObj = null; this.cityObj = null;
    this.ngOnInit()
  }
  closemodal() {
    this.ngOnInit();
    $('#modeldelete').modal('hide');
    // $('#driverModal').modal('hide');

    document.getElementById('driverModal').style.display = "none"
    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }


}
