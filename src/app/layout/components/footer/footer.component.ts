import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    @HostBinding('style.top') marginTop: string;

    todayNumber: number = Date.now();
    todayDate: Date = new Date();
    todayString: string = new Date().toDateString();
    todayISOString: string = new Date().toISOString();
    dateTime: any;


    constructor(private translate: TranslateService, public router: Router) {
        this.router.events.subscribe(val => { });

        this.dateTime = new Date();

    }
    time: any;

    ngOnInit() {

        const marginTops: any = document.querySelector('.footer').clientHeight;
        // this.marginTop = '-' + marginTops + 'px';
        //    this.display_ct()

        this.time = setInterval(() => {            this.display_ct();        }, 1000);

    }

    // display_c() {
    //     var refresh = 1000; // Refresh rate in milli seconds
    //     var mytime = setTimeout('display_ct()', refresh)
    // }



    display_ct() {
        try {
            var x = new Date()
            //var x1=x.getMonth('MM') + 1 + "/" + x.getDate('DD') + "/" + x.getYear('YYYY'); 
            var x1 = +  x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds();
            document.getElementById('ct').innerHTML = x1;
            // this.d   isplay_c();  
        }
        catch (e){}
   
    }
    eventCalled() { }
}
