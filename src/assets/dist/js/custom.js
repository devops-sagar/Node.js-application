
$(document).ready(function() {
	// $('.user_activate_button').click(function() {
	// 	alert($(this).attr('tiStatus'));
	// 	$.ajax({
 //           url: '<?php echo Yii::$app->params['baseurl']. 'users/changeuserstatus' ?>',
 //           type: 'post',
 //           data : { tiStatus : $(this).attr('tiStatus'), iUserId : $(this).attr('iUserId') },
 //           dataType:'JSON',
 //           success: function (data) {
 //                if(data.response_code == 1) {
 //                    $('#verification_popup').trigger('click');
 //                    $('#loading').modal('hide');
 //                }
 //                else {
 //                    $('.help-block').remove(); 
 //                    e = JSON.parse(JSON.stringify(data.errors));
 //                    jQuery.each(e, function(key, value) { 
 //                        if(key == 'dDob') {
 //                            $("#calendar_input").after("<div class=\"help-block\">"+value+"</div>");
 //                            $("#calendar_input").closest(".form-group").addClass("has-error");
 //                            $('#loading').modal('hide');
 //                        } 
 //                        else {
 //                            $("#users-"+key.toLowerCase()).after("<div class=\"help-block\">"+value+"</div>");
 //                            $("#users-"+key.toLowerCase()).closest(".form-group").addClass("has-error");
 //                            $('#loading').modal('hide');
 //                        }   
 //                   });
 //                }

 //           }

 //      });

	    // if($(this).val() == 1) {
	    // 	$('.form-group_vPosition').show();
	    // }
	    // else {
	    // 	$('.form-group_vPosition').hide();	
	    // }
	// }) 
});