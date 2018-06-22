var jamesSocket, serverIp, userPack, msgs, nNewMsgs
var port = ':5013';

function james(){

	$.ajax({
		type    : 'GET',
		url     : 'php/get_node_server_ip.php',
		success : function(res){
			serverIp = JSON.parse(res);
			//console.log("James Server IP: "+serverIp);
			loadjamesSocket(serverIp);
			setGrenadineLinks(serverIp);
		}
	});

	userPack = [Auth.userData.id, Auth.userData.email, screen.height+'x'+screen.width]
	//var facilitator = [];
	msgs = '';
	nNewMsgs = 0;
}

function box(a){
	if(a.length > 0){
		fac = a[0];
		console.log('Show chat box!');
		var depployed = false;

		$('body').append('<div class="chatBox"><p style="font-weight: 600; margin: 23px 0px 0px 17px; color: rgb(143, 132, 124);">Salut !</p></div>');
		$('body').append('<div class="chatBoxDeplloyed"><p class="chatTitle">Nous sommes en ligne !</p><a class="dismissIt">X</a><div class="msgsContainer">'+msgs+'</div><input id="msg" type="text" name="msg" placeholder="Salut ! Ça va ?"><a class="chatSendButton" onclick="sendMessage();">&gt;</a></div>');
		$('.chatBox').click(function(){
			if(depployed == false){
				$('.chatBoxDeplloyed').fadeIn();
				depployed = true;
				var a = $('.msgsContainer')[0].scrollHeight;
				$('.msgsContainer').scrollTop(a);
			}else{
				$('.chatBoxDeplloyed').fadeOut();
				depployed = false;
			}
		});
		$('.dismissIt').click(function(){
			depployed = false;
			$('.chatBoxDeplloyed').fadeOut();
		});
		$('#msg').keypress(function(e) {
			if(e.which == 13) {
				sendMessage();
			}
		});
		$('#msg').focus(function() {
			nNewMsgs = 0;
			$('title').text('Eloqua fr');
		});
	}else{
		console.log('No facilitator. Hide chat box.');
		$('.chatBoxDeplloyed, .chatBox').remove();
	}
}

//functions
var msgSent
var fac = 2;
function sendMessage(){
	console.log(fac);
	var msg = [fac, $('#msg').val()];
	if(msg[1] !== ''){
		jamesSocket.emit('msgToFac', msg);
		msgSent = msg[1];
		$('#msg').val('').focus();
	}
}

function loadjamesSocket(x){
	jamesSocket = io("http://"+x+port);

	/* functions */
	function logged(){
		jamesSocket.emit('user logged', userPack);
	}

	/* jamesSocket events */

	jamesSocket.on('login', function (data) {
		console.log(data);
	});

	jamesSocket.on('msg', function (data) {
		console.log(data);

		//put it on screen
		msgs = msgs+'<p class="facMsg">'+data[1]+'</p>';
		$('.msgsContainer').html(msgs);
		var a = $('.msgsContainer');
		var height = a[0].scrollHeight;
		a.scrollTop(height);

		//title
		nNewMsgs++;
		$('title').text('('+nNewMsgs+') Eloqua fr');

		//send back confirmation
		var msg = [Number(Auth.userData.id), data[1], fac];
		jamesSocket.emit('msg received', msg);
	});

	jamesSocket.on('facilitator logged', function(data){
		fac = data[0];
		//console.log('Facilitator '+data[0]+' is online!');
		//console.log(data[1]);

		for (var i=(data[1].length)-1; i>=0; i--){
			if (data[1][i].author == Auth.userData.id){
				msgs = msgs+'<p class="userMsg">'+data[1][i].msg+'</p>';
			}else{
				msgs = msgs+'<p class="facMsg">'+data[1][i].msg+'</p>';
			}
		}
		$('.msgsContainer').append(msgs);
	});

	jamesSocket.on('gotit', function(data){
		if (data[0] == Auth.userData.id && data[1] == msgSent){
			console.log('Facilitators received the message! -> '+data[1]);

			//put it on screen
			msgs = msgs+'<p class="userMsg">'+data[1]+'</p>';
			$('.msgsContainer').html(msgs);
			var a = $('.msgsContainer');
			var height = a[0].scrollHeight;
			a.scrollTop(height);
		}else{
			console.log(data);
			console.log('ERROR: different id or msg!');
		}
	});

	jamesSocket.on('connected facs', function (data){
		console.log(data);
		box(data);
	});

	logged();
}
