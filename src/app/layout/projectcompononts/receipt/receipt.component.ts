import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var $: any;
import * as $ from 'jquery'

export class Receipt {
  custName: string = '';
  vehicleNo: string = '';
  chassisNo: string = '';
  EngineNo: string = '';
  vehicleMM: string = '';
  VTSMobileNo: any = '';
  InstallDate: string = '';
  renewDate: string = '';
  AadharCard: any = '';
  CustMobileNo: any = '';
}

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  receipt = new Receipt();
  submitted: boolean = false;
  currentdate: any;
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  constructor() { }

  ngOnInit() {

    const d = new Date();
    // this.currentdate = d.getDate() + ' / ' + d.getMonth() + ' / ' + d.getFullYear()
    this.currentdate = d;


    /* calander single  picker ends */
    $('.datepicker').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: new Date(),

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

  }

  validateForm() {

    this.receipt.InstallDate = (document.getElementById('installationDate') as HTMLInputElement).value;
    this.receipt.renewDate = (document.getElementById('renewalDate') as HTMLInputElement).value;

    if (this.receipt.vehicleNo == '' || this.receipt.chassisNo == '' || this.receipt.EngineNo == '' ||
      this.receipt.vehicleMM == '' || this.receipt.VTSMobileNo == '' || this.receipt.AadharCard == '' || this.receipt.CustMobileNo == '') {
      this.submitted = true;
      return false
    }
    else {
      this.submitted = false;
      return true
    }

  }

  printReceipt() {
    if (this.validateForm() == true) {

      this.receipt.InstallDate = (document.getElementById('installationDate') as HTMLInputElement).value;
      this.receipt.renewDate = (document.getElementById('renewalDate') as HTMLInputElement).value;

      document.getElementById('showInstallationDate').innerHTML = this.receipt.InstallDate;
      document.getElementById('showRenewalDate').innerHTML = this.receipt.renewDate;

      // this.validateForm();
      var sTable = document.getElementById('vehicleReceipt').innerHTML;
      var style = "<style>";
      style = style + "*{color: black;font: 14px Arial}";
      style = style + "#leftside,#rightside{display: inline-block;width:48%}";
      style = style + "*{color: black;}";
      style = style + "#heading{position: absolute;font-weight: bold;display: block;top: 30px;left: 190px;}";
      style = style + "#contact{margin-top:0px;margin-bottom:0px;font-weight:bold;text-align:center}";
      style = style + "#address {padding-left:20px;}";
      style = style + "input,#buttons {display:none;}";
      style = style + ".d-none {display:block;}";
      style = style + ".card{background-color: white;}";
      style = style + ".tlabel{width: 26%;height: 25px;font-weight: bold;}";
      style = style + "table{width: 100%;}";
      style = style + " #nameid{display:inline-block}";
      style = style + " hr{border: 1px solid gray;}";
      style = style + "</style>";

      // CREATE A WINDOW OBJECT.
      var win = window.open('', '', 'height=700,width=700');

      win.document.write('<html><head>');
      win.document.write('<title>Vehicle Installation Receipt</title>');   // <title> FOR PDF HEADER.
      win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
      win.document.write('</head>');
      win.document.write('<body>');
      win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
      win.document.write('</body></html>');

      win.document.close(); 	// CLOSE THE CURRENT WINDOW.


      win.print();    // PRINT THE CONTENTS.
      win.close()
    }
  }



}
