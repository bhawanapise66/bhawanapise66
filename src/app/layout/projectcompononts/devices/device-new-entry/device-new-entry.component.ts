import { CryptService } from './../../services/crypt.service';
import { Paramcls } from './../../../../../paramcls';
import { KModulelistbindingService } from './../../services/kmodulelistbinding.service';
import { DevicemasterService } from './../../services/devicemaster.service';

import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import * as moment from 'moment';

//import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-device-new-entry',
  templateUrl: './device-new-entry.component.html',
  styleUrls: ['./device-new-entry.component.css']
})
export class DeviceNewEntryComponent implements OnInit {

  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;

  receiptnoTextentry: string; CourierNameTextentry: string; InvoiceNoTextentry: string; datemodelTextentry: string;
  devserialnoTextentry: string; selectvendorentry: string; selectdevicemodelentry: string; IMEINoTextentry: string;
  selectdevicetypeentry: string; ICCIDNoTextentry: string; mobile1Textentry: string; selectnetwork1entry: string;
  invoicedateentry: string; selectmodeofdeliveryentry: string;
  mobile2Textentry: string; selectnetwork2entry: string;

  checkBox: any; text: any; deleteText: string;

  public loading = false; p: number; pagecount: number;
  nop: number; totrec: number; outorec: number; filter: any; selectRows: string;

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;

  stringifiedDataven: any; parsedJsonven: any; stringifiedresponseven: any; parsedJsonresponseven: any;
  stringifiedDataListven: any; parsedJsonListven: any;

  stringifiedDatamod: any; parsedJsonmod: any; stringifiedresponsemod: any; parsedJsonresponsemod: any;
  stringifiedDataListmod: any; parsedJsonListmod: any;

  stringifiedDatanet: any; parsedJsonnet: any; stringifiedresponsenet: any; parsedJsonresponsenet: any;
  stringifiedDataListnet: any; parsedJsonListnet: any;

  stringifiedDatadevtyp: any; parsedJsondevtyp: any; stringifiedresponsedevtyp: any; parsedJsonresponsedevtyp: any;
  stringifiedDataListdevtyp: any; parsedJsonListdevtyp: any;

  vendorlist$: any; devicemodellist$: any; networklist$: any; devtyplist$: any; deleverymethod$: any;
  marked = false; theCheckbox = true;

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService,
    private postService: DevicemasterService, private listService: KModulelistbindingService,
    private cryptService: CryptService, private router: Router) { }

  basicdeviceexport() {
    let basicitemList = [{ MOBILENO1: "8529637410", NETWORK1: "Idea" },
    { MOBILENO1: "8529637410", NETWORK1: "Idea" },
    { MOBILENO1: "8529637410", NETWORK1: "Idea" },
    { MOBILENO1: "8529637410", NETWORK1: "Idea" },
    { MOBILENO1: "8529637410", NETWORK1: "Idea" }
    ]
  }



  ais140deviceexport() {
    let aisitemList = [{ ICCIDNO: "78956234157812345678", MOBILENO1: "8529637410", MOBILENO2: "7894561230", NETWORK1: "Idea", NETWORK2: "Airtel" },
    { ICCIDNO: "78956234157812345678", MOBILENO1: "8529637410", MOBILENO2: "7894561230", NETWORK1: "Idea", NETWORK2: "Airtel" },
    { ICCIDNO: "78956234157812345678", MOBILENO1: "8529637410", MOBILENO2: "7894561230", NETWORK1: "Idea", NETWORK2: "Airtel" },
    { ICCIDNO: "78956234157812345678", MOBILENO1: "8529637410", MOBILENO2: "7894561230", NETWORK1: "Idea", NETWORK2: "Airtel" },
    { ICCIDNO: "78956234157812345678", MOBILENO1: "8529637410", MOBILENO2: "7894561230", NETWORK1: "Idea", NETWORK2: "Airtel" }
    ]
  }

  ngOnInit() {

    this.InvoiceOnChane()

    document.getElementById("exampleModalLabel").style.display = "block";
    // document.getElementById("bulkEntry").style.display="none";
    document.getElementById("singleEntry").style.display = "block";
    $('#aisimg').hide(); $('#aisexcel').hide(); $('#basicimg').hide(); $('#basicexcel').hide();
    //document.getElementById("backdetailsbtn").style.display="none";
    //$("#bulkbtn").show();
    //$("#backdetailsbtn").hide();
    (function ($) {
      $(document).ready(function () {

        /* calander single  picker ends */
        $('.datepicker').daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 1901
        }, function (start, end, label) { });

        $('.datepicker').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        $('.datepicker').on('hide.daterangepicker', function (ev, picker) {
          var thisdpc = $('.daterangepicker');
          thisdpc.removeClass('active');

        });
        /* calander single picker ends */

        /* calander picker */
        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + 'to' + end.format('YYYY-MM-DD'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left'
        }, cb);

        cb(start, end);
        $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        var path = '../assets/images/background-part.png';
        $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../assets/images/background-part.png" alt="" style="display:none"></div>')
      });
    })(jQuery);


    (function ($) {
      $(document).ready(function () {
        //$('#receiptNoentry').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        $("#step-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();
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
            alert("submit the form?!?")
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


          if (validateStep1(index, steps) == false) {
            isStepValid = false;
          }
          else if (validateStep2(index, steps) == false) {
            isStepValid = false;
          }
          else if (validateStep3(index, steps) == false) {
            isStepValid = false;
          }
          else if (validateStep4(index, steps) == false) {
            isStepValid = false;
          }
          return isStepValid;
        }

        function validateStep1(index, steps) {

          $('#modeofdeliveryentry').focus();
          // $('#msg_modeofdeliveryentry').html('').hide();
          $('#msg_Invoicedateentry').html('').hide();
          $('#msg_vendorentry').html('').hide();
          $('#msg_devicemodelentry').html('').hide();
          var isValid = true;
          var modeofdeleveryentry = $('#modeofdeliveryentry').val();
          var vendoridentry = $('#vendoridentry').val();
          var devicemodelentry = $('#devicemodelidentry').val();
          // Validate Vendor Name
          if (modeofdeleveryentry == null) {
            isValid = false;
            $('#msg_modeofdeliveryentry').html('Please Enter Receipt No.').show();
            // $('#modeofdeleveryentry').focus();
          } else if (vendoridentry.length <= 0) {
            // validate cin no
            isValid = false;
            $('#msg_vendorentry').html('Please Select vendor').show();
            // $('#invoicenoidentry').focus();
          } else if (devicemodelentry == null) {
            // validate GST No
            isValid = false;
            $('#msg_devicemodelentry').html('Please Select Device Model').show();
            // $('#invoicedateidentry').focus();
          }

          if (isValid && index == 1) {

            //$('#msg_receiptnoentry').html('').hide();
            $('#modeofdeliveryentry').html('').hide();
            $('#msg_InvoiceNoentry').html('').hide();
            $('#msg_Invoicedateentry').html('').hide();
            $("#step-14").hide()
            $("#step-15").show();
            $("#step-16").hide();
            $("#step-17").hide();

            setClasses(index, steps);
            $('#devicetypeidentry').focus();
            isValid = false;
          }
          return isValid;
        }

        function validateStep2(index, steps) {
          $('#devicetypeidentry').focus();
          $('#msg_devicetypeentry').html('').hide();
          $('#msg_vendorentry').html('').hide();
          $('#msg_devicemodelentry').html('').hide();
          $('#msg_deviceserialNoentry').html('').hide();
          $('#msg_imeiNoentry').html('').hide();
          var isValid = true;
          var devicetypeidentry = $('#devicetypeidentry').val();
          var vendoridentry = $('#vendoridentry').val();
          var devicemodelidentry = $('#devicemodelidentry').val();
          var imeinoidentry = $('#imeinoidentry').val();
          var deviceseialnoidentry = $('#deviceseialnoidentry').val();
          // Validate Contact Name
          if (!devicetypeidentry && devicetypeidentry.length <= 0) {
            isValid = false;
            $('#msg_devicetypeentry').html('Please Select Device Type.').show();
            $('#devicetypeidentry').focus();
          } else
            if (!vendoridentry && vendoridentry.length <= 0) {
              // validate Alternate Number
              isValid = false;
              $('#msg_vendorentry').html('Please Select Vendor.').show();
              $('#vendoridentry').focus();
            } else if (devicemodelidentry.length <= 0) {
              // validate state
              isValid = false;
              $('#msg_devicemodelentry').html('Please Select Device Model.').show();
              $('#devicemodelidentry').focus();
            }
            // Validate Account No
            else if (!imeinoidentry && imeinoidentry.length <= 0) {
              isValid = false;
              $('#msg_imeiNoentry').html('Please Enter IMEI Number').show();
              $('#imeinoidentry').focus();
            }
            else if (!deviceseialnoidentry && deviceseialnoidentry.length <= 0) {
              isValid = false;
              $('#msg_deviceserialNoentry').html('Please Enter Device Serial Number.').show();
              $('#deviceseialnoidentry').focus();
            }

          if (isValid && index == 2) {

            $('#msg_devicetypeentry').html('').hide();
            $('#msg_vendorentry').html('').hide();
            $('#msg_devicemodelentry').html('').hide();
            $('#msg_imeiNoentry').html('').hide();
            $('#msg_deviceserialNoentry').html('').hide();

            $("#step-15").hide();
            $("#step-14").hide()
            $("#step-16").hide();
            $("#step-17").show();
            $('#iccidnoidentry').focus();

            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);
            setClasses(index, steps);
            $('#iccidnoidentry').focus();
            isValid = false;
          }

          return isValid;
        }

        function validateStep3(index, steps) {


          $('#msg_iccidNoentry').html('').hide();
          $('#msg_mobile1entry').html('').hide();
          $('#msg_network1entry').html('').hide();

          $('#iccidnoidentry').focus();
          var isValid = true;

          var iccidnoidentry = $('#iccidnoidentry').val();
          var mobile1identry = $('#mobile1identry').val();
          var Network1identry = $('#Network1identry').val();
          var mobile2id = $('#mobile2id').val();
          var network2id = $('#network2id').val();


          if (!iccidnoidentry && iccidnoidentry.length <= 0) {
            isValid = false;
            $('#msg_iccidNoentry').html('Please Enter ICCID Number.').show();
            $('#iccidnoidentry').focus();
          }
          else if (!mobile1identry && mobile1identry.length <= 0) {
            isValid = false;
            $('#msg_mobile1entry').html('Please Enter Mobile Number1.').show();
            $('#mobile1identry').focus();
          }
          else if (!Network1identry && Network1identry.length <= 0) {
            isValid = false;
            $('#msg_network1entry').html('Please Select Network1.').show();
            $('#Network1identry').focus();
          }
          if (isValid && index == 3) {

            $('#msg_iccidNoentry').html('').hide();
            $('#msg_mobile1entry').html('').hide();
            $('#msg_network1entry').html('').hide();
            $("#step-14").hide();
            $("#step-15").hide();
            $("#step-16").hide();
            $("#step-17").show();

            setClasses(index, steps);
            $(".buttonNext").prop('disabled', true);
            isValid = false;
          }
          return isValid;
        }
        function validateStep4(index, steps) {
          alert("success")
          return true;
        }

        /* ---------------------------------------------------------------------------------------------------------------------- */

        function validateStep1entry(index, steps) {
          $('#modeofdeliveryentry').focus();
          // $('#msg_modeofdeliveryentry').html('').hide();
          $('#msg_Invoicedateentry').html('').hide();
          $('#msg_vendorentry').html('').hide();
          $('#msg_devicemodelentry').html('').hide();
          var isValid = true;
          var modeofdeleveryentry = $('#modeofdeliveryentry').val();
          var invoicedateidentry = $('#invoicedateidentry').val();
          var vendoridentry = $('#vendoridentry').val();
          var devicemodelentry = $('#devicemodelidentry').val();
          // Validate Vendor Name
          if (!modeofdeleveryentry && modeofdeleveryentry.length <= 0) {
            isValid = false;
            alert("line number 684" + " " + isValid)
            $('#msg_modeofdeliveryentry').html('Please Enter Receipt No.').show();
            $('#modeofdeleveryentry').focus();
          } else
            if (!invoicedateidentry && invoicedateidentry.length <= 0) {
              // validate short code
              isValid = false;
              $('#msg_couriernameentry').html('Please Enter Courier Name').show();
              $('#couriernameidentry').focus();
            } else if (vendoridentry.length <= 0) {
              // validate cin no
              isValid = false;
              $('#msg_InvoiceNoentry').html('Please Enter Invoice No').show();
              $('#vendoridentry').focus();
            } else if (!invoicedateidentry && invoicedateidentry.length <= 0) {
              // validate GST No
              isValid = false;
              $('#msg_Invoicedateentry').html('Please Select Invoice Date.').show();
              $('#invoicedateidentry').focus();
            }

          if (isValid && index == 1) {

            //$('#msg_receiptnoentry').html('').hide();
            $('#msg_couriernameentry').html('').hide();
            $('#msg_InvoiceNoentry').html('').hide();
            $('#msg_Invoicedateentry').html('').hide();
            $("#stepentry-14").hide()
            $("#stepentry-15").show();
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();

            setClasses(index, steps);
            $('#devicetypeidentry').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateStep2entry(index, steps) {
          $('#devicetypeidentry').focus();
          $('#devicetypeidentry').focus();
          $('#msg_devicetypeentry').html('').hide();
          $('#msg_vendorentry').html('').hide();
          $('#msg_devicemodelentry').html('').hide();
          $('#msg_deviceserialNo').html('').hide();
          var isValid = true;
          var devicetypeidentry = $('#devicetypeidentry').val();
          var vendoridentry = $('#vendoridentry').val();
          var devicemodelidentry = $('#devicemodelidentry').val();
          var imeinoidentry = $('#imeinoidentry').val();
          var deviceseialnoidentry = $('#deviceseialnoidentry').val();
          // Validate Contact Name
          if (!devicetypeidentry && devicetypeidentry.length <= 0) {
            isValid = false;
            $('#msg_devicetypeentry').html('Please Select Device Type.').show();
            $('#devicetypeidentry').focus();
          } else
            if (!vendoridentry && vendoridentry.length <= 0) {
              // validate Alternate Number
              isValid = false;
              $('#msg_vendorentry').html('Please Select Vendor.').show();
              $('#vendoridentry').focus();
            } else if (devicemodelidentry.length <= 0) {
              // validate state
              isValid = false;
              $('#msg_devicemodelentry').html('Please Select Device Model.').show();
              $('#devicemodelidentry').focus();
            }
            // Validate Account No
            else if (!imeinoidentry && imeinoidentry.length <= 0) {
              isValid = false;
              $('#msg_imeiNoentry').html('Please Enter IMEI Number').show();
              $('#imeinoidentry').focus();
            }
            else if (!deviceseialnoidentry && deviceseialnoidentry.length <= 0) {
              isValid = false;
              $('#msg_deviceserialNoentry').html('Please Enter Device Serial Number.').show();
              $('#deviceseialnoidentry').focus();
            }

          if (isValid && index == 2) {

            $('#msg_devicetypeentry').html('').hide();
            $('#msg_vendorentry').html('').hide();
            $('#msg_devicemodelentry').html('').hide();
            $("#step-15").hide();
            $("#step-14").hide()
            $("#step-16").hide();
            $("#step-17").show();
            $('#imeinoidentry').focus();

            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);
            setClasses(index, steps);
            isValid = false;
          }

          return isValid;
        }






        $('#vendorNameentry').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#stepentryentry-14").show();
        $("#stepentryentry-15").hide();
        $("#stepentryentry-16").hide();
        $("#stepentryentry-17").hide();
        function setClassesentry(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $("#preventry").prop('disabled', true);
          } else {
            $("#preventry").prop('disabled', false);
          }
          if (index == steps) {
            $("#nextentry").text('done');
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
            alert("submit the form?!?")
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

        function validateentryStep1(index, steps) {

          $('#modeofdeliveryentry').focus();
          // $('#msg_modeofdeliveryentry').html('').hide();
          $('#msg_modeofdeliveryentry').html('').hide();
          $('#msg_vendorentry').html('').hide();
          $('#msg_devicemodelentry').html('').hide();


          $('#msg_Invoicedateentry').html('').hide();
          $('#msg_vendorentry').html('').hide();
          $('#msg_devicemodelentry').html('').hide();
          var isValid = true;
          var modeofdeleveryentry = $('#modeofdeliveryentry').val();
          var invoicedateidentry = $('#invoicedateidentry').val();
          var vendoridentry = $('#vendoridentry').val();
          var devicemodelentry = $('#devicemodelidentry').val();
          // Validate Vendor Name
          if (modeofdeleveryentry == null) {
            isValid = false;
            $('#msg_modeofdeliveryentry').html('please select mode of delevery.').show();
            $('#modeofdeleveryentry').focus();
          } else if (vendoridentry == null) {

            isValid = false;
            $('#msg_vendorentry').html('Please Enter Vendor').show();
            $('#vendoridentry').focus();
          } else if (devicemodelentry == null) {
            // validate GST No
            isValid = false;
            $('#msg_devicemodelentry').html('Please Select Device Model.').show();
            $('#devicemodelidentry').focus();
          }

          if (isValid && index == 1) {

            //$('#msg_receiptnoentry').html('').hide();
            $('#msg_couriernameentry').html('').hide();
            $('#msg_InvoiceNoentry').html('').hide();
            $('#msg_Invoicedateentry').html('').hide();
            $("#stepentry-14").hide()
            $("#stepentry-15").show();
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();

            setClassesentry(index, steps);
            $('#devicetypeidentry').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateentryStep2(index, steps) {
          $('#devicetypeidentry').focus();
          $('#msg_devicetype').html('').hide();
          $('#msg_IMEInumber').html('').hide();
          $('#msg_deviceserialnumber').html('').hide();
          var isValid = true;
          // var devicetypeidentry = $('#devicetypeidentry').val();
          // var vendoridentry = $('#vendoridentry').val();
          // var devicemodelidentry = $('#devicemodelidentry').val();
          // var imeinoidentry = $('#imeinoidentry').val();
          // var deviceseialnoidentry = $('#deviceseialnoidentry').val();
          var devicetypeidentry = $('#devicetypeidentry').val();
          var imeinumberenrty = $('#imeinoidentryasd').val();
          var serialnumberentry = $('#deviceseialnoidentry').val();

          // Validate Contact Name

          if (devicetypeidentry == null) {
            // validate Alternate Number
            isValid = false;
            $('#msg_devicetype').html('Please Select Device Type.').show();
            $('#devicetypeidentry').focus();
          }
          else if (imeinumberenrty == '') {
            // validate state
            isValid = false;

            $('#msg_IMEInumber').html('Please enter IMEI number.').show();
            $('#imeinoidentryasd').focus();
          }
          // Validate Account No
          else if (serialnumberentry == null || serialnumberentry == '') {
            isValid = false;
            $('#msg_deviceserialnumber').html('Please Enter Serial Number').show();
            $('#deviceseialnoidentry').focus();
          }

          if (isValid && index == 2) {
            $('#msg_devicetype').html('').hide();
            $('#msg_IMEInumber').html('').hide();
            $('#msg_deviceserialnumber').html('').hide();
            $("#stepentry-15").hide();
            $("#stepentry-14").hide()
            $("#stepentry-16").show();
            $("#stepentry-17").hide();

            $(".buttonFinish").prop('disabled', false);
            $("#nextentry").prop('disabled', true);
            setClassesentry(index, steps);
            $('#iccidnoidentry').focus();
            isValid = false;
          }

          return isValid;
        }

        function validateentryStep3(index, steps) {

          $('#iccidnoidentry').focus();
          $('#msg_iccidNoentry').html('').hide();
          $('#msg_mobile1entry').html('').hide();
          $('#msg_network1entry').html('').hide();
          var isValid = true;

          var iccidnoidentry = $('#iccidnoidentry').val();
          var mobile1identry = $('#mobile1identry').val();
          var Network1identry = $('#Network1identry').val();
          var mobile2id = $('#mobile2id').val();
          var network2id = $('#network2id').val();


          if (!iccidnoidentry && iccidnoidentry.length <= 0) {
            isValid = false;
            $('#msg_iccidNoentry').html('Please Enter ICCID Number.').show();
            $('#iccidnoidentry').focus();
          }
          else if (!mobile1identry && mobile1identry.length <= 0) {
            isValid = false;
            $('#msg_mobile1entry').html('Please Enter Mobile Number1.').show();
            $('#mobile1identry').focus();
          }
          else if (!Network1identry && Network1identry.length <= 0) {
            isValid = false;
            $('#msg_network1entry').html('Please Select Network1.').show();
            $('#Network1identry').focus();
          }
          if (isValid && index == 3) {


            $('#msg_iccidNoentry').html('').hide();
            $('#msg_mobile1entry').html('').hide();
            $('#msg_network1entry').html('').hide();
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
          alert("success")
          return true;
        }

      });

      $(window).on('load', function () {
        $("#my-dropzone").dropzone({
          url: "../file-upload",
          addRemoveLinks: "dictRemoveFile"
        });

        $('.datepicker').daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          drops: 'down',
          minYear: 1901
        }, function (start, end, label) { });

        $('.datepicker').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        $('.datepicker').on('hide.daterangepicker', function (ev, picker) {
          var thisdpc = $('.daterangepicker');
          thisdpc.removeClass('active');

        });
        var path = '../assets/img/background-part.png';
        if ($('.daterangepicker .background').length == 0) {
          $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../assets/img/background-part.png" alt="" style="display:none"></div>');
        }
      });


    })(jQuery);

  }

  EncryptPageName() {
    this.cryptService.encrypt("Device New Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput

  }

  onDeviceTypeChange() {
    try {

      if (this.selectdevicetypeentry == "yARaqXo6A8pmLAGyWbqJWA==") {
        $('#basmob1').show(); $('#basnet1').show();
        $('#aisicc').show(); $('#aismob2').show(); $('#aisnet2').show();
        $('#aisimg').show(); $('#aisexcel').show(); $('#basicimg').hide(); $('#basicexcel').hide();
        $(".showscheckbox").prop('disabled', true);

        $('#msg_devicetypeentry').html('').hide();
        $('#msg_vendorentry').html('').hide();
        $('#msg_devicemodelentry').html('').hide();
        $('#msg_deviceserialNo').html('').hide();
        var isValid = true;
        var devicetypeidentry = $('#devicetypeidentry').val();
        var vendoridentry = $('#vendoridentry').val();
        var devicemodelidentry = $('#devicemodelidentry').val();
        var imeinoidentry = $('#imeinoidentry').val();
        var deviceseialnoidentry = $('#deviceseialnoidentry').val();
        // Validate Contact Name
        if (!devicetypeidentry && devicetypeidentry.length <= 0) {
          isValid = false;
          $('#msg_devicetypeentry').html('Please Select Device Type.').show();
          $('#devicetypeidentry').focus();
        } else
          if (!vendoridentry && vendoridentry.length <= 0) {
            // validate Alternate Number
            isValid = false;
            $('#msg_vendorentry').html('Please Select Vendor.').show();
            $('#vendoridentry').focus();
          } else if (devicemodelidentry.length <= 0) {
            // validate state
            isValid = false;
            $('#msg_devicemodelentry').html('Please Select Device Model.').show();
            $('#devicemodelidentry').focus();
          }
          // Validate Account No
          else if (!imeinoidentry && imeinoidentry.length <= 0) {
            isValid = false;
            $('#msg_imeiNoentry').html('Please Enter IMEI Number').show();
            $('#imeinoidentry').focus();
          }
          else if (!deviceseialnoidentry && deviceseialnoidentry.length <= 0) {
            isValid = false;
            $('#msg_deviceserialNoentry').html('Please Enter Device Serial Number.').show();
            $('#deviceseialnoidentry').focus();
          }

        alert('hi')
        $("#stepentry-14").hide();
        $("#stepentry-15").hide();
        $("#stepentry-16").show();
        $("#stepentry-17").hide();


      }
      else {
        $('#basmob1').show(); $('#basnet1').show();
        $('#aisicc').hide(); $('#aismob2').hide(); $('#aisnet2').hide();
        $('#aisimg').hide(); $('#aisexcel').hide(); $('#basicimg').show(); $('#basicexcel').show();
        $(".showscheckbox").prop('disabled', false);

      }

    }
    catch (error) {
      err => {

      }
    }
  }

  adddevice() {
    try {

      if (this.selectdevicetypeentry == "yARaqXo6A8pmLAGyWbqJWA==") {
        let dataL = {
          param1: 'remarks',
          param2: '0',
          param3: this.selectvendorentry,
          param4: this.selectdevicemodelentry,
          param5: this.IMEINoTextentry,
          param6: this.devserialnoTextentry,
          param7: this.ICCIDNoTextentry,
          param8: this.mobile1Textentry,
          param9: this.mobile2Textentry,
          param10: this.selectnetwork1entry,
          param11: this.selectnetwork2entry,
          param12: '',
          param13: '',
          param14: this.selectdevicetypeentry,
          param15: '',
          param16: '',
          param23: "true",
          pageID: "1",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }

        this.postService.DeviceInsertAPI(dataL).subscribe(
          (data) => {
            //alert('hi');
            let resdata = data;
            if (resdata['statuscode'] == 200) {
              $('#msg_mainmessageentry').html('Successfully Saved!!!.').show();
              $("#stepentry-14").show();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
            }
            else if (resdata['statuscode'] == 201) {
              $('#msg_mainmessageentry').html('Invalid Entry!!!.').show();
              $("#stepentry-14").hide();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").show();
            }


          }, err => {

          });
      }
      else {
        alert(this.theCheckbox);
        let dataL = {
          param1: "",
          param2: "0",
          param3: this.selectvendorentry,
          param4: this.selectdevicemodelentry,
          param5: this.IMEINoTextentry,
          param6: this.devserialnoTextentry,
          param7: "",
          param8: this.mobile1Textentry,
          param9: "",
          param10: this.selectnetwork1entry,
          param11: "",
          param12: '',
          param13: '',
          param14: this.selectdevicetypeentry,
          param15: '',
          param16: '',
          param23: this.theCheckbox,
          pageID: "1",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        this.postService.DeviceInsertAPI(dataL).subscribe(
          (data) => {
            //alert('hi');
            let resdata = data;
            if (resdata['statuscode'] == 200) {
              $('#msg_mainmessageentry').html('Successfully Saved!!!.').show();
              $("#stepentry-14").show();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
            }
            else if (resdata['statuscode'] == 201) {
              $('#msg_mainmessageentry').html('Invalid Entry!!!.').show();
              $("#stepentry-14").hide();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").show();
            }


          }, err => {

          });
      }


    }
    catch (error) {
      err => {

      }
    }
  }


  toggleVisibility(e) {
    this.marked = e.target.checked;


    if (this.marked == true) {
      $('#devicetypeidentry').focus();
      $('#msg_devicetypeentry').html('').hide();
      $('#msg_vendorentry').html('').hide();
      $('#msg_devicemodelentry').html('').hide();
      $('#msg_deviceserialNoentry').html('').hide();
      $('#msg_imeiNoentry').html('').hide();
      var isValid = true;
      var devicetypeidentry = $('#devicetypeidentry').val();
      var vendoridentry = $('#vendoridentry').val();
      var devicemodelidentry = $('#devicemodelidentry').val();
      var imeinoidentry = $('#imeinoidentry').val();
      var deviceseialnoidentry = $('#deviceseialnoidentry').val();
      // Validate Contact Name
      if (!devicetypeidentry && devicetypeidentry.length <= 0) {
        isValid = false;
        $('#msg_devicetypeentry').html('Please Select Device Type.').show();
        $('#devicetypeidentry').focus();
      } else
        if (!vendoridentry && vendoridentry.length <= 0) {
          // validate Alternate Number
          isValid = false;
          $('#msg_vendorentry').html('Please Select Vendor.').show();
          $('#vendoridentry').focus();
        } else if (devicemodelidentry.length <= 0) {
          // validate state
          isValid = false;
          $('#msg_devicemodelentry').html('Please Select Device Model.').show();
          $('#devicemodelidentry').focus();
        }
        // Validate Account No
        else if (!imeinoidentry && imeinoidentry.length <= 0) {
          isValid = false;
          $('#msg_imeiNoentry').html('Please Enter IMEI Number').show();
          $('#imeinoidentry').focus();
        }
        else if (!deviceseialnoidentry && deviceseialnoidentry.length <= 0) {
          isValid = false;
          $('#msg_deviceserialNoentry').html('Please Enter Device Serial Number.').show();
          $('#deviceseialnoidentry').focus();
        }
        else {

          if (this.selectdevicetypeentry == "yARaqXo6A8pmLAGyWbqJWA==") {
            $('#basmob1').show(); $('#basnet1').show();
            $('#aisicc').show(); $('#aismob2').show(); $('#aisnet2').show();

            $("#stepentry-14").hide();
            $("#stepentry-15").hide();
            $("#stepentry-16").show();
            $("#stepentry-17").hide();
          }
          else {
            $('#basmob1').show(); $('#basnet1').show();
            $('#aisicc').hide(); $('#aismob2').hide(); $('#aisnet2').hide();
          }

          $("#stepentry-14").hide();
          $("#stepentry-15").hide();
          $("#stepentry-16").hide();
          $("#stepentry-17").show();

        }

    }
    else {


      if (this.selectdevicetypeentry == "yARaqXo6A8pmLAGyWbqJWA==") {
        $('#basmob1').show(); $('#basnet1').show();
        $('#aisicc').show(); $('#aismob2').show(); $('#aisnet2').show();

        $("#stepentry-14").hide();
        $("#stepentry-15").hide();
        $("#stepentry-16").show();
        $("#stepentry-17").hide();
      }
      else {
        $('#basmob1').show(); $('#basnet1').show();
        $('#aisicc').hide(); $('#aismob2').hide(); $('#aisnet2').hide();
        $("#nextentry").prop('disabled', true); $(".buttonFinish").prop('disabled', false);
        $("#stepentry-14").hide();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").show();
      }
    }
  }


  deleverymethodlist() {
    let dataL = {
      param1: "",
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.DeleveryMethodList(dataL).subscribe((response) => {
      console.log(dataL)
      if (response.statuscode == 200) {
        this.deleverymethod$ = response.entity.list;
      }
    })

  }

  NetworkList() {

    let keydatanet = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Device Model List BIND LIST    
    this.listService.NetworkListAPI(keydatanet).subscribe(
      (datanet) => {

        let resdatanet = datanet;
        if (resdatanet['status'] == true) {
          let resdatadrpnet = resdatanet['entity'];
          // Convert to JSON  
          this.stringifiedDatanet = JSON.stringify(resdatadrpnet);
          // Parse from JSON  
          this.parsedJsonnet = JSON.parse(this.stringifiedDatanet);

          let resdatafinet = resdatanet['list'];
          // Convert to JSON  
          this.stringifiedDataListnet = JSON.stringify(this.parsedJsonnet.list);
          // Parse from JSON  
          this.parsedJsonListnet = JSON.parse(this.stringifiedDataListnet);

          this.networklist$ = this.parsedJsonListnet;

        }
      });
  }

  DeviceModelList() {

    let keydatamod = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Device Model List BIND LIST    
    this.listService.DeviceModelListAPI(keydatamod).subscribe(
      (datadevmod) => {

        let resdatadevmod = datadevmod;
        if (resdatadevmod['status'] == true) {
          let resdatadrp2 = resdatadevmod['entity'];
          // Convert to JSON  
          this.stringifiedDatamod = JSON.stringify(resdatadrp2);
          // Parse from JSON  
          this.parsedJsonmod = JSON.parse(this.stringifiedDatamod);

          let resdatafindevmod = resdatadevmod['list'];
          // Convert to JSON  
          this.stringifiedDataListmod = JSON.stringify(this.parsedJsonmod.list);
          // Parse from JSON  
          this.parsedJsonListmod = JSON.parse(this.stringifiedDataListmod);

          this.devicemodellist$ = this.parsedJsonListmod;

        }
      });
  }

  VendorList() {

    let keydataven = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Vendor List BIND LIST    
    this.listService.VendorListAPI(keydataven).subscribe(
      (dataven) => {

        let resdataven = dataven;
        if (resdataven['status'] == true) {
          let resdatadrp = resdataven['entity'];
          // Convert to JSON  
          this.stringifiedDataven = JSON.stringify(resdatadrp);
          // Parse from JSON  
          this.parsedJsonven = JSON.parse(this.stringifiedDataven);

          let resdatafinven = resdataven['list'];
          // Convert to JSON  
          this.stringifiedDataListven = JSON.stringify(this.parsedJsonven.list);
          // Parse from JSON  
          this.parsedJsonListven = JSON.parse(this.stringifiedDataListven);

          this.vendorlist$ = this.parsedJsonListven;

        }
      });
  }

  DeviceTypeList() {

    let keydatamod = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Device Model List BIND LIST    
    this.listService.DeviceTypeListAPI(keydatamod).subscribe(
      (datadevmod) => {

        let resdatadevdevtyp = datadevmod;
        if (resdatadevdevtyp['status'] == true) {
          let resdatadevtyp = resdatadevdevtyp['entity'];
          // Convert to JSON  
          this.stringifiedDatadevtyp = JSON.stringify(resdatadevtyp);
          // Parse from JSON  
          this.parsedJsondevtyp = JSON.parse(this.stringifiedDatadevtyp);

          let resdatafindevtyp = resdatadevdevtyp['list'];
          // Convert to JSON  
          this.stringifiedDataListdevtyp = JSON.stringify(this.parsedJsondevtyp.list);
          // Parse from JSON  
          this.parsedJsonListdevtyp = JSON.parse(this.stringifiedDataListdevtyp);

          this.devtyplist$ = this.parsedJsonListdevtyp;

        }
      });
  }


  InvoiceOnChane() {
    //Dropdown binds
    this.deleverymethodlist(); this.NetworkList(); this.VendorList(); this.DeviceModelList(); this.DeviceTypeList();
  }

}
