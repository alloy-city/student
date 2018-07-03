// room = sessionStorage.groupID;

var socket, iJoin, connected, tracks, readyTracks, hangoutId, boardElements, classElements, sounds, currentSlide, lastSlide, onGoingClass

function loadPresentationSocket(x, room){
	socket = io("http://"+x+":5011");
	iJoin = [Number(room), Auth.userData.id, false];
	connected = false;
	tracks;
	readyTracks = [];
	hangoutId;
	boardElements = [];
	classElements = [];
	sounds = [];
	currentSlide;
	lastSlide;
	onGoingClass = false;

	/* functions */
	function enterRoom(){
		socket.emit('joinroom', iJoin);
	}

	function startPresentation(pres){
		//console.log(pres);

		hangoutId = pres;

		$.ajax({
			type		: 'GET',
			url			: "php/presentation_load_user.php",
			data		: 'pres='+pres,
			success		: function(answer){

				raw = JSON.parse(answer);

				if(raw == false){
					// console.log('Presentation doesn\'t exist.');
				}else{
					for (var i=2;i<72;i++){
						if(raw[i] == null){
							//console.log(raw);
							break;
						}
						if (raw[i].indexOf('.webm') > -1){
							boardElements.push(raw[i]);
							classElements.push(raw[i]);
						}else if (raw[i].indexOf('.jpg') > -1){
							boardElements.push(raw[i]);
							classElements.push(raw[i]);
						}else if (raw[i].indexOf('.svg') > -1){
							boardElements.push(raw[i]);
							classElements.push(raw[i]);
						}else if (raw[i].indexOf('.ogg') > -1){
							classElements.push(raw[i]);
							sounds.push(raw[i]);
						}else{
							classElements.push(raw[i]);
							boardElements.push(raw[i]);
							vids.push(raw[i]);
							vidsIds['tn'+(i-2)] = raw[i];
						}
					}
				}

				var board = '';
				// var defautlTilte = false;

				for (var i = 0; i<boardElements.length; i++){
					// if(i==0 && boardElements[i] == 'title.svg'){
					// 	defautlTilte = true;
					// }else
					if(boardElements[i].indexOf('.webm') > -1){
						board += '<div id="sl'+i+'" style="display:none" class="ha"><video loop="1" autoplay="1" width="800px"><source type="video/webm" src="img/diapositives/' +boardElements[i]+ '"></video></div>'
					}else if(boardElements[i].indexOf('.jpg') > -1 || boardElements[i].indexOf('.svg') > -1){
						board += '<img id="sl'+i+'" class="ha" style="display:none" src="img/diapositives/'+boardElements[i]+'">'
					}else{
						board += '<div id="'+boardElements[i]+'" class="ytVid" style="display:none"></div>'
					}
				}

				$('#img-container').html(board);

				// if(defautlTilte == true && !onGoingClass){
				// 	$.get('title.html', function(data){
				// 		$('#img-container').prepend(data);
				// 	});
				// }else{
				// 	$('#img-container').prepend('<img id="sl0" class="ha" style="display:none" src="img/diapositives/'+boardElements[0]+'">');
				// }

				// $('#img-container').append('<svg id="facilitatorCursor" style="display:none;position:absolute;left:0;top:0" height="20" width="20"><circle cx="10" cy="10" r="8" style="fill:red;fill-opacity:0.4"/></svg>');

				if (sounds.length > 0){
					loadAudioFiles();
				}
				if (vids.length > 0){
					loadVids();
				}

				if(!onGoingClass){
					lastSlide = 0;
					currentSlide = 0;
				}

				picSlide(currentSlide);
			}
		});
	}

	function picSlide(a){
		lastSlide = currentSlide;
		currentSlide = a;

		if (lastSlide == -1){
			$('#'+vidPlaying).fadeOut(200);
			vidPlaying = '';
			$('#sl'+currentSlide).fadeIn(200);
		}else{
			if(currentSlide !== lastSlide){
				$('#sl'+currentSlide).fadeIn(200);
				$('#sl'+lastSlide).fadeOut(200);
			}else if(onGoingClass == true){
				$('#sl'+currentSlide).fadeIn(200);
			}
		}
	}

	function coordinates(e){
		var x = e.pageX - $('#img-container').offset().left;
		var y = e.pageY - $('#img-container').offset().top;
		var coor = [x, y];
		socket.emit('xy', coor);
	}
	function clearCoor(){
		socket.emit('xy end');
	}

	function loadAudioFiles(){
		for (var i=0;i<sounds.length;i++){
			readyTracks[i] = soundManager.createSound({
				url: '/media/'+sounds[i],
				volume: 100
			});
		};
	}

	function setSound(trackIndex, time, action){
		if (trackIndex < 0){trackIndex = 0};
		if (action == 0){
			soundManager.pauseAll();
			readyTracks[trackIndex].play();
		};
		if (action == 1){
			readyTracks[trackIndex].pause();
		};
		if (action == 2){
			soundManager.pauseAll();
			readyTracks[trackIndex].resume();
		};
		if (action == 3){
			readyTracks[trackIndex].setPosition(time);
		};
	}

	/* socket events */

	socket.on('login', function (data) {
		connected = true;
		//console.log(data);
	});

	socket.on('entered the room', function(data){
		//console.log('Welcome, '+data);
	});

	socket.on('start presentation', function (data){
		startPresentation(data);
	});

	// Change slide
	socket.on('new slide', function (data) {
		picSlide(data);
	});

	socket.on('leave', function (data) {
		//console.log('User '+data.username+' left. :(');
		//$('#user'+data.username).remove();
	});

	socket.on('xy', function (data){
		//console.log('id: '+data[0]+'\nX: '+data[1][0]+'\nY: '+data[1][1]);

		var divx = $('#sl0').width();
		var divy = $('#sl0').height();

		var marg = $('#board').css('margin-left');
		marg = Number(marg.slice(0, -2));

		var x = divx*data[1][0]-10+marg;
		var y = divy*data[1][1]-630;

		$('#facilitatorCursor').css({'z-indez':71,'display':'block', 'left':x, 'top':y});
	});

	socket.on('xy end', function(data){
		$('#facilitatorCursor').css('display', 'none');
	});

	socket.on('play sound', function(data){
		setSound(data[0], data[1], data[2]);
	});

	socket.on('play vid', playVid);

	//clean board
	socket.on('clean', function(){
		currentSlide = 0;
		lastSlide = 0;
		sounds = [];
		vids = [];
		classElements = [];
		boardElements = [];
		soundManager.pauseAll();
		for (var i = 0; i < vidsIds.length; i++){
			players[vidsIds[i]].pauseVideo();
		};
		// $('#img-container').html('<img src="/img/diapositives/title.svg">');
		$('#img-container').html('');

		/* new system */
		$('#classroom-display-eclass').html('');
		var resourcesReceived = [];
	});

	socket.on('sorry', function(data){
		currentSlide = data[1];
		onGoingClass = true;
		startPresentation(data[0]);
	});

	/* New EClass System */
	var resourcesReceived = [];
	socket.on('resource to student', function(data){
		if (resourcesReceived.indexOf(data.resource) == -1){
			resourcesReceived.push(data.resource);
			if(data.type == "image") {
				console.log(data);
				// clearClassRoomEclassDisplay();
				$('#classroom-display-eclass').append('<div class="resource transparent">'+ markUpImage(data.resource) + '</div>');
				$('#classroom-display-eclass').children().last().animate({ opacity: 1 }, 'fast', function(){
					scrollToElement($('img[src$="/img/diapositives/'+data.resource+'"]'));
				});
				// socket.emit('resource RECEIVED by student', Auth.userData.id);
			}
		} else {
			scrollToElement($('img[src$="/img/diapositives/'+data.resource+'"]'));
			// socket.emit('resource HIGHLIGHTED to student', Auth.userData.id);
		}
	});

	enterRoom();
}

function scrollToElement (el) {
	if (el != undefined){
		$('html, body').animate({
			scrollTop: (el.offset().top - 20)
		}, 400);
	}
}
