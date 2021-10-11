import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { KModulelistbindingService } from './../../services/kmodulelistbinding.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostService } from './../../../../../post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-bulkentry',
  templateUrl: './bulkentry.component.html',
  styleUrls: ['./bulkentry.component.css']
})
export class BulkentryComponent implements OnInit {

 

  constructor( private modalService: NgbModal, private flashMessage: FlashMessagesService,
    private postService: PostService, private listService: KModulelistbindingService,
    private cryptService: CryptService, private router: Router) { }

  ngOnInit() {

    

  }

  

 



}
