/*
	*modified Feb 2014* Feedback jQuery
	Handles feedback form submission and toggle.

*/

$(function(){
	
	//Feedback form submit
	$('form#feedback_form').submit(function(){
		var name = $('form#feedback_form input[name=name]').val();
                var to = $('form#feedback_form input[name=ffto]').val();
		var title = $('form#feedback_form input[name=fftitle]').val();
		var email = $('form#feedback_form input[name=email]').val();
		var feedback = $('form#feedback_form #feedback_box').val();
		var pbody = $('form#feedback_form input[name=pbody]').val();
		
		//Error handling
		var errors = "";
		if(pbody != "") return false;
		if(name == "") errors += "name ";
		if(email == "") errors += "email ";
		if(feedback == "") errors += "feedback";
		
		if(errors.length > 0)
		{
			$('form#feedback_form p.errors').html("Required: " + errors);
			return false;	
		}
		
		//Submit form
		$.ajax({
			type: 'post',
			url: '/main/feedbackaction.cfm',
			data: { to: to,
				title: title,
                                name: name,
				feedback: feedback,
				email: email},
			success: function(){
				var response = "<p><h2>Your feedback </h2><h2 style='padding-bottom: 50px;'>has been submitted.</h2></p>";
				$('div.l-feedback form').replaceWith(response);
				
				  setTimeout(function(){
  				 	$('div.l-feedback').animate($('.l-feedback').removeClass('is-open'), function () {$('.l-feedback-button').fadeTo("fast", 1)});   
						 },1000);
			}	
		});
		
		return false;
	});

});