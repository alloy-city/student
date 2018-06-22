//--- WhatsApp Groups
/*
var phone = '';
var waVisible = true;

function whatsAppGroups(){

  $("#wa_phone").mask("+99 (99) 99999999?9");
  $('#wa_phone').val(Auth.userData.phones);

  $.ajax({
  	type	: 'get',
  	url		: "../php/get_whatsapp.php",
  	success	: function(waResults){
  		waResults = JSON.parse(waResults);
  		//console.log(waResults);
  		if (waResults !== 0){
  			//waVisible = false;
  			toggle_wa();
  		}
  		for (var i = 0; i < 8; i++){
  			if (waResults[i] == 1){
  				$('#whatsApp'+i).prop('checked', true);
  			}
  		}
  	}
  });
  return false;

}

function whatsApp(){
  phone = $('#wa_phone').val();
  if (phone == ''){
    $('#phone_missing').slideDown();
    setTimeout(function(){
      $('#phone_missing').fadeOut();
    }, 3000);
  } else {
    whatsApp2();
  };
}

function whatsApp2(){
  var groups = [0,0,0,0,0,0,0,0];
  phone = $('#wa_phone').val();

  toggle_wa();
  $('#whatsapp_tks').fadeIn();
  setTimeout(function(){
    $('#whatsapp_tks').fadeOut();
  }, 2000);

  for (var i = 0; i < 8; i++){
    if ($('#whatsApp'+i).is(':checked')){
      groups[i] = 1
    }
  }
  //console.log(groups);
  $.ajax({
    type	: 'post',
    url		: "../php/whatsapp.php",
    data	: "phone="+phone+"&group0="+groups[0]+"&group1="+groups[1]+"&group2="+groups[2]+"&group3="+groups[3]+"&group4="+groups[4]+"&group5="+groups[5]+"&group6="+groups[6]+"&group7="+groups[7],
    success	: function(results){
      // results = JSON.parse(results);
      // console.log(results);
    }
  });
  return false;
}

function toggle_wa(){
  if (waVisible == true){
    $('#whatsapp_form').slideUp();
    waVisible = false;
  }else if (waVisible == false){
    $('#whatsapp_form').slideDown();
    waVisible = true;
  };
}
*/
