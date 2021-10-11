import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-manager-details',
  templateUrl: './device-manager-details.component.html',
  styleUrls: ['./device-manager-details.component.css']
})
export class DeviceManagerDetailsComponent implements OnInit {
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5900,
    height: '200px',
  };

  commandDetails;filter;key;reverse;pagecount;p;count
  constructor() { }

  ngOnInit() {
  }
  sort(key){}
  VendorMasterpageChanged(event){}
}
