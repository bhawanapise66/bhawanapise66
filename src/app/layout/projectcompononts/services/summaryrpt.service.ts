import { Injectable } from '@angular/core';
import * as fs from 'file-saver';

import { Workbook } from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class SummaryrptService {

  constructor() { }




  ExportExcel(data,title,downloadname){
    var dataForExcel=[];
   
    var total=data.length;
    data.forEach((row: any) => {
      dataForExcel.push(Object.values(row))
    })
    let reportData = {
      title: title,
      data: dataForExcel,
      headers: Object.keys(data[0])
    }

    this.DisplayDetails(reportData,downloadname,total);
  }

  DisplayDetails(excelData,downloadname,total) {

    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(total);


    //Add Row and formatting
    worksheet.mergeCells('C2', 'F3');
    let titleRow = worksheet.getCell('C2');
    titleRow.value = title;
    titleRow.font = {
      name: 'Calibri',
      size: 14,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Date
    worksheet.mergeCells('A4:C4');
    let d = new Date();
    let datecell= worksheet.getCell('A4');
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear()+" / "+d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds();
    datecell.value ="Date  "+ date;
    datecell.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    datecell.alignment = { vertical: 'middle', horizontal: 'left' }


    worksheet.mergeCells('G4:H4');
    let totalcell= worksheet.getCell('G4');
    totalcell.value ="Total  "+ total;
    totalcell.font = {
      name: 'Calibri',
      size: 10,
      bold: true
    }
    totalcell.alignment = { vertical: 'middle', horizontal: 'left' }
    
    
    //Add Image
    // let myLogoImage = workbook.addImage({
    //   base64: logo.imgBase64,
    //   extension: 'png',
    // });
    // worksheet.mergeCells('A1:B4');
    // worksheet.addImage(myLogoImage, 'A1:B4');

    //Blank Row 
    worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 11
      }
    })

    // Adding Data with Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
    // let sales = row.getCell(6);
      // let color = 'FF99FF99';
      // if (+sales.value < 200000) {
      //   color = 'FF9999'
      // }

      // sales.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: color }
      // }
    });

    worksheet.getColumn(2).width = 20;
    worksheet.addRow([]);

    //Footer Row
    // let footerRow = worksheet.addRow(['Employee Sales Report Generated from example.com at ' + date]);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFB050' }
    // };

    //Merge Cells
   // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, downloadname + '.xlsx');
    })

  }
}
