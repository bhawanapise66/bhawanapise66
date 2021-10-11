import { Component, OnInit } from '@angular/core';
declare var $ : any;
declare var jQuery: any;

@Component({
  selector: 'app-wizards',
  templateUrl: './wizards.component.html',
  styleUrls: ['./wizards.component.css']
})
export class WizardsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    (function ($) {
      $(document).ready(function(){
        //alert("in")
        $('#smartwizarddots').smartWizard({
            theme: 'dots',
            transitionEffect: 'none', // Effect on navigation, none/slide/fade
            transitionSpeed: '400'
        });
        $('body').addClass('sidebar-icon');
        $('body').removeClass('sidebar-compact');
    })(jQuery); 
    });

    $(document).ready(function() {
      $('#smartwizard1').smartWizard();
      $('#smartwizarddots').smartWizard({
          theme: 'dots',
          transitionEffect: 'none', // Effect on navigation, none/slide/fade
          transitionSpeed: '400'
      });
      $('#smartwizardcircle').smartWizard({
          theme: 'circles',
          transitionEffect: 'fade', // Effect on navigation, none/slide/fade
          transitionSpeed: '400'
      });
      $('#smartwizardarrow').smartWizard({
          theme: 'arrows',
          transitionEffect: 'slide', // Effect on navigation, none/slide/fade
          transitionSpeed: '400'
      });
  });


  $('#sidebarIconic').on('click', function () {
    if ($(this).is(':checked')) {
        $.cookie("sidebarsize", 'sidebar-icon', {
             expires: 7
        });
        $('body').addClass('sidebar-icon');
        $('body').removeClass('sidebar-compact');
        $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();
    } else {
        $.removeCookie("sidebarsize");
        $('body').removeClass('sidebar-icon');
    }
});
$('#sidebarCompact').on('click', function () {
    if ($(this).is(':checked')) {
        $.cookie("sidebarsize", 'sidebar-compact', {
            expires: 7
        });
        $('body').addClass('sidebar-compact');
        $('body').removeClass('sidebar-icon');
        $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();
    } else {
        $.removeCookie("sidebarsize");
        $('body').removeClass('sidebar-compact');
    }
});

$('#sidebarfull').on('click', function () {
    if ($(this).is(':checked')) {
        $.removeCookie("sidebarsize");
        $('body').removeClass('sidebar-icon');
        $('body').removeClass('sidebar-compact');
    }
});
  }

}
