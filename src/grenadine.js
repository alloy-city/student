export function setGrenadineLinks(){
	var OSName = "Unknown";
	if (window.navigator.userAgent.indexOf("Windows") != -1) OSName = "Windows";
	if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac";
	if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
	var Gv = "v0.5 Beta - ";
	var v = "0.5";
	if(OSName == "Linux"){
		$('#grenadine_default_download').attr('href', '/downloads/Grenadine_Linux_v'+v+'.zip');
		$('#grenadine_default_download').text(Gv+"Linux");
		$('#grenadine_option2').attr('href', '/downloads/Grenadine_Linux_v'+v+'.zip.torrent');
		$('#grenadine_option2').html(Gv+'Linux - torrent');
		$('#grenadine_option3').attr('href', '/downloads/Grenadine_win_x86_64_v'+v+'.zip');
		$('#grenadine_option3').html(Gv+'Windows');
	  $('#grenadine_option4').attr('href', '/downloads/Grenadine_win_x86_64_v'+v+'.zip.torrent');
		$('#grenadine_option4').html(Gv+'Windows - torrent');
	  $('#grenadine_option5').attr('href', '/downloads/Grenadine_Mac_x86_v'+v+'.zip');
		$('#grenadine_option5').html(Gv+'Mac');
	  $('#grenadine_option6').attr('href', '/downloads/Grenadine_Mac_x86_v'+v+'.zip.torrent');
		$('#grenadine_option6').html(Gv+'Mac - torrent');
	}else if(OSName == "Mac"){
		$('#grenadine_default_download').attr('href', '/downloads/Grenadine_Mac_x86_v'+v+'.zip');
		$('#grenadine_default_download').text(Gv+'Mac');
		$('#grenadine_option2').attr('href', '/downloads/Grenadine_Mac_x86_v'+v+'.zip.torrent');
		$('#grenadine_option2').html(Gv+'Mac - torrent');
		$('#grenadine_option3').attr('href', '/downloads/Grenadine_win_x86_64_v'+v+'.zip');
		$('#grenadine_option3').html(Gv+'Windows');
	  $('#grenadine_option4').attr('href', '/downloads/Grenadine_win_x86_64_v'+v+'.zip.torrent');
		$('#grenadine_option4').html(Gv+'Windows - torrent');
	  $('#grenadine_option5').attr('href', '/downloads/Grenadine_Linux_v'+v+'.zip');
		$('#grenadine_option5').html(Gv+'Linux');
	  $('#grenadine_option6').attr('href', '/downloads/Grenadine_Linux_v'+v+'.zip.torrent');
		$('#grenadine_option6').html(Gv+'Linux - torrent');
	}else{
		$('#grenadine_default_download').attr('href', '/downloads/Grenadine_win_x86_64_v'+v+'.zip');
		$('#grenadine_default_download').text(Gv+'Windows');
	  $('#grenadine_option2').attr('href', '/downloads/Grenadine_win_x86_64_v'+v+'.zip.torrent');
		$('#grenadine_option2').html(Gv+'Windows - torrent');
	  $('#grenadine_option3').attr('href', '/downloads/Grenadine_Mac_x86_v'+v+'.zip');
		$('#grenadine_option3').html(Gv+'Mac');
	  $('#grenadine_option4').attr('href', '/downloads/Grenadine_Mac_x86_v'+v+'.zip.torrent');
		$('#grenadine_option4').html(Gv+'Mac - torrent');
	  $('#grenadine_option5').attr('href', '/downloads/Grenadine_Linux_v'+v+'.zip');
		$('#grenadine_option5').html(Gv+'Linux');
	  $('#grenadine_option6').attr('href', '/downloads/Grenadine_Linux_v'+v+'.zip.torrent');
		$('#grenadine_option6').html(Gv+'Linux - torrent');
	}
}
