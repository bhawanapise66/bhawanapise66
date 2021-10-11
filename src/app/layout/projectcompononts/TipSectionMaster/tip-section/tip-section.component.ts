import { PageandtipsService } from './../../services/pageandtips.service';
import { CryptService } from './../../services/crypt.service';
import { Router, NavigationEnd, Event, NavigationStart, NavigationError } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tip-section',
  templateUrl: './tip-section.component.html',
  styleUrls: ['./tip-section.component.css']
})
export class TipSectionComponent implements OnInit {
  encryptedpageNameValue: any;
  pageUrl = this.router.url;
  encryptedpageUrlValue: any;
  tipdetailsgrid: any;
  totalcount: any;
  viewcount: any;
  constructor(private router: Router, private cryptService: CryptService, private tipsService: PageandtipsService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        let urlstring = window.location.href;

        let content = urlstring.includes("login");
        if (content == true) {
        }
        else {
          this.tipsdetails();
        }
      }
    });
  }

  ngOnInit() {

  }

  // encryption of pagename and page url starts
  // date : 5 -oct -2020
  EncryptPageName() {
    this.cryptService.encrypt("Tips Section")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }
  // encryption of pagename and page url ends



  openTip() {
    var someElement = document.getElementById("tipBtn");
    var anotherElement = document.getElementById("tipWindow");
    someElement.className += " active";//add "newclass" to element (space in front is important)
    anotherElement.className += " show active"
  }
  removeClass() {
    var someElement = document.getElementById("tipBtn");
    var anotherElement = document.getElementById("tipWindow");
    someElement.classList.remove("active");
    anotherElement.classList.remove("active");

  }

  tipsdetails() {
    let detailreqparam = {
      pageNo: 1,
      itemsPerPage: '',
      searchBy: this.router.url,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.tipsService.tipsdetails(detailreqparam).subscribe((response) => {
      this.tipdetailsgrid = response.entity.list;
      this.totalcount = response.entity.count;
      this.viewcount = response.entity.viewCount;
    })
  }


}
