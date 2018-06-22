export function debtPlusOne(){
	hideTerms();
	Auth.userData.debt = (Number(Auth.userData.debt)+1);
	setPayment();
	enlistUser();
	showPayButton();
}

export function selectGroupeToEnlist(gId){
	console.log('selectGroupeID called....');
	console.log(gId);
  hideAlerts();

	if (Auth.userData.groups.indexOf(gId) >= 0 || sessionStorage.justEnlisted == gId){
		alreadyEnlistedInThisModule();
	} else if (Auth.userData.groups.indexOf(0) < 0){
		console.log('userTooBusy');
		$('.grpContainer').after('<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><p id="userTooBusy"></p>'+string.alerts.userTooBusy+'</div>');
	} else {
		console.log('Show agreements term.');
		$('#terms_t').text(string.terms.terms_t + ' - v1.1 - ' + string.commons.group+gId);
		$('#terms1_t').html(string.terms.terms1_t);

    var terms1 = '<ol>'
    for(var i=0; i<string.terms.terms1_p.length; i++){
      terms1 += '<li>'+string.terms.terms1_p[i]+'</li>';
    }
		$('#terms1_p').html(terms1+'</ol>');
		$('#terms2_t').html(string.terms.terms2_t);

    var terms2 = '<ol>'
    for(var ii=0; ii<string.terms.terms2_p.length; ii++){
      terms2 += '<li>'+string.terms.terms2_p[ii]+'</li>';
    }
		$('#terms2_p').html(terms2+'</ol>');

		$('#warning_title').html(string.terms.warningTitle);

		var warningText = '<ol>'
    for(var i=0; i<string.terms.warningText.length; i++){
      warningText += '<li>'+string.terms.warningText[i]+'</li>';
    }
		$('#warning_text').html(warningText+'</ol>');

		$('#hide_button').html(string.buttons.hide);
		$('#ok_button').html(string.buttons.ok);
    $('#termsContainer').collapse("show");
		// $('#termsContainer').slideDown();
	}
}

export function enlistUser(){
	var id = Auth.userData.id;
	var promotionCode = Auth.userData.promotionCode;
	$.ajax({
		type	: 'post',
		url		: "php/enlist.php",
		data	: 'userId='+id+'&groupId='+chosenGroupId,
		success	: function(rett){
			/*
				// -1 -> Group does not exist
				// 0 -> User already enlisted in this group
				// 1 -> User already too busy
				// 2 -> No free slot in this group
				// 3 -> SUCCESS: user enlisted
			*/

			console.log(rett);
			if (Number(rett)==3){
				// document.getElementById('enlisted_notification').style.display = 'block';
				$('.grpContainer').after('<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><p id="enlisted_notification"></p>'+string.alerts.enlisted+'</div>');
				sessionStorage.justEnlisted = chosenGroupId;
			} else if (Number(rett)==1){
				// document.getElementById('userTooBusy').style.display = 'block';
				$('.grpContainer').after('<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><p id="userTooBusy"></p>'+string.alerts.userTooBusy+'</div>');
			} else if (Number(rett)==2){
				// document.getElementById('groupFull').style.display = 'block';
				$('.grpContainer').after('<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><p id="groupFull"></p>'+string.alerts.groupFull+'</div>');
			} else if (Number(rett) == 0){
				$('.grpContainer').after('<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><p id="alreadyEnlisted"></p>' + string.alerts.alreadyEnlisted + '</div>');
			} else {
				$('.grpContainer').after('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><p id="unknownError"></p>' + string.alerts.unknownError + '</div>');
			}
			if(promotionCode != '0'){
				showPayButton();
			}
		}
	});
	return false;
}

export function alreadyEnlistedInThisModule(){
	console.log("alreadyEnlistedInThisModule");
	$('.grpContainer').after('<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+string.alerts.alreadyEnlisted+'</div>');
}

export function hideTerms(){
  $('#termsContainer').collapse("hide");
}

function hideAlerts(){
  $(".alert").alert('close')
}
