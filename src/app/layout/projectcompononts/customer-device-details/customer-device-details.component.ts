import { ListService } from 'src/list.service';
import { DevicemasterService } from './../services/devicemaster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-device-details',
  templateUrl: './customer-device-details.component.html',
  styleUrls: ['./customer-device-details.component.css']
})
export class CustomerDeviceDetailsComponent implements OnInit {
  qpat = "^[0-9]{2}"

  devicedata: any[]; pageNumber: any = 1; itemsPerPage: any = 10; filter: string = ''; viewcount: number;
  totalcount: any; key: any; reverse: boolean = true; classlist: any; makelist: any; vehicleMakeId: string;
  vehicleModelId: string
  modellist: any;
  iconlist: any;

  requestTypeList = [{ param2: "Urgent", }, { param2: "Normal", }];

  makeObj; modelObj; classObj;
  devicetypeObj;requestObj;
  path: string;
  devicetypelist: any;
  constructor(private ds: DevicemasterService, private ls: ListService) { }
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  ngOnInit() {
    this.deviceDetails();
    this.DeviceTypeList()
    this.vehicleClassList();
    this.vehicleMakeList();
    this.vehicleIconList();
  }


  deviceDetails() {
    let dataL = {
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "7",
      "pageName": "Ap0WSpgO0iFsm07owseCKQ==:02e6a12363b9a55eac90074098c2f3b4:hNvuppGdHULRIlvzTTGCBZTQ==",
      "pageURL": "l4dBXWB3TGmCBZg8NSSD8MJQ==:8249320d89fcf213a4d60c39bcbec72ff35edbb5576e451b237a6c645eff1c40:tOvgNLm7aF6gpwSA5OlUkQ=="
    }
    this.ds.RequestedDeviceDetails(dataL).subscribe((response) => {
      this.devicedata = response.entity.responsedatalist;
      this.viewcount = response.entity.viewCount;
      this.totalcount = response.entity.count;
    })
  }

  DeviceTypeList() {
    try {
      let keydata = {
        pageID: "7",
        pageName: "this.encryptedpageNameValue",
        pageURL: "this.encryptedpageUrlValue"
      }

      //try{AddLoader()}catch(e){alert(e)}
      this.ls.DeviceTypeListAPI(keydata).subscribe(
        (data) => {
          this.devicetypelist = data.entity.list;

        });
    } catch (e) { }
  }

  PageChange(event) {
    this.pageNumber = event;
    this.deviceDetails()
  }

  // lists 
  vehicleClassList() {
    let dataL = {
      "pageID": "Vo6+uPj27GJCD9b3rUDSww==",
      "pageName": "s6ng2L2cjVt7PAMcA0vU73Cw==:f9369ad849518cb9c81b3427a500049509e35b937f58d9b635668c22e733308b:ajBuShNK2XgYqGk06KWgsQ==",
      "pageURL": "PAMI1nk5QsFCBZjlnDLpgBQINg==:deb4e8dbd66b3d7cc578e730b56095ab:Br1XiCGWCBZ85ETQzybztDqg=="
    }
    this.ls.VehicleClassListAPI(dataL).subscribe((response) => {
      this.classlist = response.entity.list;
    })
  }
  vehicleMakeList() {
    let dataL = {
      "pageID": "Vo6+uPj27GJCD9b3rUDSww==",
      "pageName": "s6ng2L2cjVt7PAMcA0vU73Cw==:f9369ad849518cb9c81b3427a500049509e35b937f58d9b635668c22e733308b:ajBuShNK2XgYqGk06KWgsQ==",
      "pageURL": "PAMI1nk5QsFCBZjlnDLpgBQINg==:deb4e8dbd66b3d7cc578e730b56095ab:Br1XiCGWCBZ85ETQzybztDqg=="
    }
    this.ls.SelectMakeListAPI(dataL).subscribe((response) => {
      this.makelist = response.entity.list
    })
  }


  vehicleModelList() {
    let dataL = {
      "param1": this.vehicleMakeId
    }
    this.ls.SelectModelListAPI(dataL).subscribe((response) => {
      this.modellist = response.entity.list
    })
  }

  vehicleIconList() {
    let dataL = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: "sghk",
      pageURL: "sgfdfg"
    }
    this.ls.VehicleIconList(dataL).subscribe((response) => {
      this.iconlist = response.entity.responsedatalist;
      this.path = "https://track.indtrack.com/upload/vehicleicon"

    })
  }
}
