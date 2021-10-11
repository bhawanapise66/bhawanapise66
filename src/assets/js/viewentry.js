(function ($) {
    $(document).ready(function() {
        alert("in js call")
      $('#vendorName').focus();
      $(".buttonFinish").prop('disabled', true);
      $("#step-14").show();
      $("#step-15").hide();
      $("#step-16").hide();
      $("#step-17").hide();
      function setClasses(index, steps) {
        if (index < 0 || index > steps) return;
        if(index == 0) {
          $(".buttonPrevious").prop('disabled', true);
        } else {
          $(".buttonPrevious").prop('disabled', false);
        }
        if(index == steps) {
          $(".buttonPreviousNext").text('done');
        } else {
          $(".buttonPreviousNext").text('next');
        }
        $(".step-wizard ul li").each(function() {
          $(this).removeClass();
        });
        $(".step-wizard ul li:lt(" + index + ")").each(function() {
          $(this).addClass("done");
        });
        $(".step-wizard ul li:eq(" + index + ")").addClass("active")
        var p = index * (100 / steps);
        $("#prog").width(p + '%');
      }
      $(".step-wizard ul button").click(function() {
        var step = $(this).find("div.step")[0].innerText; 
        var steps = $(".step-wizard ul li").length; 
        validateAllSteps(step- 1 , steps);
      });
      $("#prev").click(function(){
        var step = $(".step-wizard ul li.active div.step")[0].innerText;
        var steps = $(".step-wizard ul li").length; 
        setClasses(step - 2, steps - 1);
        displayreviousSection(step - 1);   
      });
      $("#next").click(function(){
        if ($(this).text() == 'done') {
          alert("submit the form?!?")
        } else {
          var step ;
          try {
            step = $(".step-wizard ul li.active div.step")[0].innerText; 
          } catch (error) {
            step = $(".step-wizard ul li div.step")[0].innerText; 
          }
          
          var steps = $(".step-wizard ul li").length;   
          validateAllSteps(step , steps- 1);   
          //setClasses(step, steps - 1);
        }
      });
      
      // initial state setup
     setClasses(0, $(".step-wizard ul li").length);
     
      function displayreviousSection(index){
        
      $(".buttonNext").prop('disabled', false);
        switch(index) {
          case 0:                    
                  $("#step-14").show();
                  $("#step-15").hide();
                  $("#step-16").hide();
                  $("#step-17").hide();
            break;
          case 1:     
                  $("#step-14").show();
                  $("#step-15").hide();
                  $("#step-16").hide();
                  $("#step-17").hide();
            break;
          case 2:                         
                $("#step-14").hide();
                $("#step-15").show();
                $("#step-16").hide();
                $("#step-17").hide();
            break;
          case 3:                         
                $("#step-14").hide();
                $("#step-15").hide();
                $("#step-16").show();
                $("#step-17").hide();
            break;
          default:                
              $("#step-14").show();
              $("#step-15").hide();
              $("#step-16").hide();
              $("#step-17").hide();
        }
      }

      function validateAllSteps(index, steps){
        var isStepValid = true;
        
                  
        if(validateStep1(index, steps) == false){
          isStepValid = false;       
        }else
        if(validateStep2(index, steps) == false){
          isStepValid = false;       
        }else
        if(validateStep3(index, steps) == false){
          isStepValid = false;        
        }else
         if(validateStep4(index, steps) == false){
          isStepValid = false;        
        }
        return isStepValid;
     }

     function validateStep1(index, steps){
      $('#vendorName').focus();
      
      $('#msg_vendorName').html('').hide();
      $('#msg_shortcode').html('').hide();
      $('#msg_CINNo').html('').hide();
      $('#msg_GSTNo').html('').hide();
       var isValid = true; 
       var vendorname = $('#vendorName').val();
       var shortcode = $('#shortCode').val();
       var cin = $('#CINNo').val();
       var gstno = $('#GSTNo').val();
       var officialno = $('#officialNo').val();
       var officialemail = $('#officialEmail').val();
       // Validate Vendor Name
       if(!vendorname && vendorname.length <= 0){
         isValid = false;
         $('#msg_vendorName').html('Please Enter Vendor Name').show();
         $('#vendorName').focus();
       }else 
       if(!shortcode && shortcode.length <= 0){
        // validate short code
         isValid = false;
         $('#msg_shortcode').html('Please Enter Short Code').show(); 
         $('#shortCode').focus();        
       }else if(cin.length <= 0){
        // validate cin no
         isValid = false;
         $('#msg_CINNo').html('Please Enter CIN No').show();     
         $('#CINNo').focus();    
       }else if(!gstno && gstno.length <= 0 ){
        // validate GST No
        isValid = false;
        $('#msg_GSTNo').html('Please Enter GST No').show(); 
        $('#GSTNo').focus();        
      }else if(!officialno && officialno.length <= 0 ){
        // validate Official No
        isValid = false;
        $('#msg_OfficialNo').html('Please Enter Official No').show(); 
        $('#officialNo').focus();        
      }else if(!officialemail && officialemail.length <= 0 ){
        // validate Official Email
        isValid = false;
        $('#msg_Officialemail').html('Please Enter Official Email').show(); 
        $('#officialEmail').focus();        
      }
      
      if(isValid && index==1 ){  
        
        $('#msg_vendorName').html('').hide();
        $('#msg_shortcode').html('').hide();
        $('#msg_CINNo').html('').hide();
        $('#msg_GSTNo').html('').hide();
        $("#step-14").hide()
        $("#step-15").show();
        $("#step-16").hide();
        $("#step-17").hide();
         
       setClasses(index, steps);
       $('#pername').focus();
       isValid = false;   
      }
       return isValid;
    }


    function validateStep2(index, steps){
      $('#pername').focus();
      $('#msg_contactNo').html('').hide();
      $('#msg_alternateNo').html('').hide();
      $('#msg_State').html('').hide();
      $('#msg_city').html('').hide();
       var isValid = true; 
       var personname = $('#pername').val();
       var contactNo = $('#contactNo').val();
       var alternateNo = $('#alternateNo').val();
       var regaddress = $('#regaddressnew').val();
       var state = $('#state').val();
       var city = $('#city').val();
       var pinCodeNo = $('#pincodeno').val();
       // Validate Contact Name
       if(!personname && personname.length <= 0){
        isValid = false;
        $('#msg_pername').html('Please Enter Contact Number').show();
        $('#pername').focus();
      }else
       if(!contactNo && contactNo.length <= 0){
         isValid = false;
         $('#msg_contactNo').html('Please Enter Contact Number').show();
         $('#contactNo').focus();
       }else
       if(!alternateNo && alternateNo.length <= 0){
        // validate Alternate Number
         isValid = false;
         $('#msg_alternateNo').html('Please Enter Alternate Number').show(); 
         $('#alternateNo').focus();        
       }
       else
       if(!regaddress && regaddress.length <= 0){
        // validate Alternate Number
         isValid = false;
         $('#msg_regadd').html('Please Enter Reg Address').show(); 
         $('#regaddressnew').focus();        
       }
       else if(state.length <= 0 && state == 'choose'){ 
        // validate state
         isValid = false;
         $('#msg_State').html('Please Enter State').show();     
         $('#state').focus();   

       }else if(!city && city.length <= 0 && city == 'choose' ){
        // validate city
        isValid = false;
        $('#msg_city').html('Please Enter City').show(); 
        $('#city').focus();        
      }else
      if(!pinCodeNo && pinCodeNo.length <= 0){
       // validate Alternate Number
        isValid = false;
        $('#msg_pincode').html('Please Enter Valid Pincode No.').show(); 
        $('#alternateNo').focus();        
      }

      if(isValid && index==2){  
       
        $('#msg_contactNo').html('').hide();
         $('#msg_alternateNo').html('').hide();
         $('#msg_state').html('').hide();
      $('#msg_city').html('').hide();
      $("#step-15").hide();
      $("#step-14").hide()
      $("#step-16").show();
      $("#step-17").hide();
      $('#accountNo').focus();
       
      $(".buttonFinish").prop('disabled', false);
      $(".buttonNext").prop('disabled', true);
        setClasses(index, steps);
       isValid = false;   
      }

       return isValid;
    }


    function validateStep3(index, steps){
           
      $('#accountNo').focus();
       var isValid = true;    
       var accountNo = $('#accountNo').val();
       $('#msg_accountNo').html('').hide();
       // Validate Account No
       if(!accountNo && accountNo.length <= 0){
         isValid = false;
         $('#msg_accountNo').html('Please Enter Account Number').show();
         $('#accountNo').focus();
       }
      if(isValid && index==3){  
       
        $('#msg_contactNo').html('').hide();
        $("#step-14").hide();
       $("#step-15").hide();
       $("#step-16").hide();
       $("#step-17").show();
        
        setClasses(index, steps); 
        $(".buttonNext").prop('disabled', true);
        $(".buttonFinish").prop('disabled', false);
       isValid = false;   
      }
       return isValid;
    }
    function validateStep4(index, steps){  
      alert("success");
      return true;
    }
    });
  })(jQuery);