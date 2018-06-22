var serverIp;

$.ajax({
	type    : 'GET',
	url     : 'php/get_node_server_ip.php',
	success : function(res){
		serverIp = JSON.parse(res);
		getStringsJson();
		//loadPresentationSocket(serverIp);
    //loadChatSocket(serverIp);
		//setGrenadineLinks(serverIp);
		// classroomGetLatestEclasses();
	}
});
