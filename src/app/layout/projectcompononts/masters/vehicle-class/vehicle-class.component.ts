import { VehicleclassService } from './../../../../APIService/vehicleclass.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;


export class VehicleClass {
  remarks: string = '';
  vehicleclassid: string = '';
  vehicleclassname: string = ''
  vehicleclassdescription: string = ''

}


@Component({
  selector: 'app-vehicle-class',
  templateUrl: './vehicle-class.component.html',
  styleUrls: ['./vehicle-class.component.css']
})
export class VehicleClassComponent implements OnInit {
  class = new VehicleClass()
  classdetails: any;
  totalcount: any;
  viewcount: any;
  pageNumber: any = 1;
  itemsPerPage: any = 10;
  filter: any = '';
  key: any;; reverse: any;

  // sgfcj
  insert = false; update = false; details = false;
  resdata: any;
  responseMessage: any;
  constructor(private classService: VehicleclassService) { }

  ngOnInit() {
    this.getClassDetails();
    // SuccessAlert('successfully saved')

  }

  getClassDetails() {
    let keydata = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
    }
    AddLoader()
    this.classService.ClassDetails(keydata).subscribe((data) => {
      RemoveLoader()
      this.classdetails = data.entity.responsedatalist;
      this.totalcount = data.entity.count;
      this.viewcount = data.entity.viewCount;
    });
  }

  pageChanged(event) {
    this.pageNumber = event;
    this.getClassDetails();
  }

  searchdata() {
    this.pageNumber = 1;
    this.getClassDetails()
  }
  Refreshfunction() {
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.getClassDetails();
  }

  changeItemsPerPage() {
    this.pageNumber = 1;
    this.getClassDetails();
  }

  insertClass() {
    if (this.class.vehicleclassname == '') {
      $('#invalid').html('Please Enter Vehicle Class').show();
      document.getElementById('className').focus()
      setTimeout(function () { document.getElementById("invalid").style.display = "none"; }, 3000);
    }
    else if (this.class.vehicleclassdescription == '') {
      $('#invalid').html('Please Enter Class Description').show();
      document.getElementById('classDesc').focus();
      setTimeout(function () { document.getElementById("invalid").style.display = "none"; }, 3000);
    }
    else if (this.update == true && this.class.remarks == '') {
      $('#invalid').html('Please Enter Remark').show();
      document.getElementById('remark').focus();
      setTimeout(function () { document.getElementById("invalid").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.class.remarks,
        param2: this.class.vehicleclassid,
        param3: this.class.vehicleclassname,
        param4: this.class.vehicleclassdescription
      }
      if (this.insert == true) {

        AddLoader()
        this.classService.InsertVehicleClassAPI(dataL).subscribe((response) => {
          RemoveLoader()
          if (response.statuscode == 200) {
            $("#myModalwizard").modal('hide')
            $('.modal-backdrop.show').css('display', 'none');
            $('.modal-backdrop.show').css('display', 'none');
            $('.modal-backdrop.show').css('display', 'none');
            $('.modal-backdrop.show').css('display', 'none');

            this.getClassDetails()
            SuccessAlert(response.entity);
            this.refreshform();
          }
          else {
            errorAlert(response.entity)
          }
        })
      }
      if (this.update == true) {
        AddLoader()
        this.classService.UpdateVehicleClassEditAPI(dataL).subscribe((response) => {
          RemoveLoader()
          if (response.statuscode == 200) {
            $("#myModalwizard").modal('hide')
            $('.modal-backdrop.show').css('display', 'none');
            $('.modal-backdrop.show').css('display', 'none');
            $('.modal-backdrop.show').css('display', 'none');
            $('.modal-backdrop.show').css('display', 'none');

            this.getClassDetails()
            SuccessAlert(response.entity)
            this.refreshform()
          }
          else {
            errorAlert(response.entity)
          }
        })
      }
    }

  }


  setdata(item) {
    this.class.vehicleclassid = item.param1;
    this.class.vehicleclassname = item.param2;
    this.class.vehicleclassdescription = item.param5;

  }


  deleteClass() {
    if (this.class.remarks == '') {
      $('#delete').html('Please Enter Remark').show();
      document.getElementById('deleteremark').focus();
      setTimeout(function () { document.getElementById("delete").style.display = "none"; }, 3000);
    }
    else {
      $("#myModal").modal('hide')
      $('.modal-backdrop.show').css('display', 'none');

      let dataL = {
        param1: this.class.remarks,
        param2: this.class.vehicleclassid
      }
      AddLoader()
      this.classService.DeleteVehicleClassAPI(dataL).subscribe((response) => {
        RemoveLoader()
        if (response.statuscode == 200) {
          this.getClassDetails();
          SuccessAlert(response.entity);
          $("#myModalwizard").modal('hide')
          $('.modal-backdrop.show').css('display', 'none');
          this.refreshform()
        }
        else {
          errorAlert(response.entity);
        }
      })
    }
  }
  refreshform() {
    this.insert = false; this.update = false; this.details = false;
    this.class = new VehicleClass()
  }
}
