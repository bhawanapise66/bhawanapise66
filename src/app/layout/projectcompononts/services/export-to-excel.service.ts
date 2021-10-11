import { Injectable } from '@angular/core';
import * as fs from 'file-saver';

//import { Workbook } from 'exceljs';
import * as ExcelJS from "exceljs/dist/exceljs"

import * as logo from '../../../../assets/excelimages/excelimage.js';
import { URLConst } from 'src/app/APIService/urlconst.js';


@Injectable({
  providedIn: 'root'
})
export class ExportToExcelService {


  constructor() { }

  ExportExcel(data,title,downloadname){
    var dataForExcel=[]
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
    let workbook = new ExcelJS.Workbook();
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
    let date = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear()+" / "+d.getHours() + ':' + d.getMinutes() ;
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

  //  Footer Row
    let footerRow = worksheet.addRow(['*** This Is System Generated File ***' ]);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' }
    };

  //  Merge Cells
   worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, downloadname + '.xlsx');
    })

  }
}