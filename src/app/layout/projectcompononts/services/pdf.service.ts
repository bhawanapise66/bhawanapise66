import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdfTable;
  date: any;
  // pdfDesign: any = '<img src="https://track.indtrack.com/indtrack/assets/images/pdflogo.png">';
  pdfDesign: any = '<img src="https://track.indtrack.com/indtrackassets/images/indtrack_R_logo.png">';
  completeDesign: any;
  pdfFooter: string;
  totalcount: string;
  constructor() { }


  // CreatePDFData(data: any) {
  //   var headingData = data[0];
  //   for (var key in headingData) {
  //     console.log(key);
  //   }
  //   for (let i = 0; i < data.length; i++) {
  //     console.log(this.GetTdData(data[i]))
  //   }
  // }

  // GetTdData(data) {
  //   var finaldata = "";
  //   for (var key in data) {
  //     finaldata = finaldata + "    " + data[key];
  //   }
  //   return finaldata;
  // }


  //changable code 
  count1: number;
  CreatePDFData(data: any, title: string) {
    this.count1 = data.length;

    this.pdfTable = "<table><tr>"
    var headingData = data[0];
    for (var key in headingData) {
      this.pdfTable = this.pdfTable + "<th>" + key + "</th>";
    }
    this.pdfTable = this.pdfTable + "</tr>"
    for (let i = 0; i < data.length; i++) {
      this.GetTdData(data[i]);
    }
    this.pdfTable = this.pdfTable + "</table>"
    // console.log(this.pdfTable);


    this.getPDFDesign(title);
    this.createWindow(title);
  }

  getPDFDesign(title) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    this.date = dd + '/' + mm + '/' + yyyy;


    this.pdfDesign = '<img style="display:block;" src="https://track.indtrack.com/indtrack/assets/images/indtrack_R_logo.png">';
    this.pdfDesign = this.pdfDesign + ' <div style="position:absolute;top:20px;right:5px;"> '
    this.pdfDesign = this.pdfDesign + '<small style="float:right">AN ISO 9001:2015 CERTIFIED COMPANY</small>  '
    this.pdfDesign = this.pdfDesign + '<h3 style="margin-bottom:0;text-align:right">INDTRACK TECHNOLOGY PVT LTD.</h3>  '
    this.pdfDesign = this.pdfDesign + '<small>sales@indtrack.com | info@indtrack.com | 88888 83573 | 83083 22022</small>  '
    this.pdfDesign = this.pdfDesign + '</div>'
    // this.pdfFooter = '<span> Date :' + this.date + '</span>';

    this.pdfDesign = this.pdfDesign + '<h4 id="heading">' + title + '</h4>';
    this.totalcount = '<span> Date :' + this.date + '</span>';

    this.totalcount = this.totalcount + '<span style="float:right;"> Total  ' + this.count1 + '</span>';


    this.pdfFooter = '<p><span style="text-align: left">System Generated Report</span> <span style="float: right;">Powered By <span style="color:#004080;"> Ind</span><span style="color:#FF6703;">Track</span></span> </p>'

  }

  GetTdData(data) {
    var finaldata = "";
    this.pdfTable += "<tr>"
    for (var key in data) {
      finaldata = finaldata + "    " + data[key];
      this.pdfTable = this.pdfTable + "<td>" + data[key] + "</td>";
    }
    this.pdfTable += "</tr>"
    return finaldata;
  }

  createWindow(title) {

    var style = "<style>";
    style = style + "#heading{text-align:center;margin-bottom:5px}";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    // win.document.write('<img src="https://track.indtrack.com/indtrack/assets/images/indgps.png">');//by kajal
    win.document.write('<title>' + title + '</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(this.pdfDesign + '');         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write(this.totalcount + '<br>');
    win.document.write(this.pdfTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('<br>' + this.pdfFooter);         // THE TABLE CONTENTS INSIDE THE BODY TAG.

    win.document.write('</body></html>');
    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    // win.print();    // PRINT THE CONTENTS.
    setTimeout(function () {
      win.print();
      win.close()
    }, 400);

  }
}


