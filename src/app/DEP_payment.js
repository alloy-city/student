function setPayment(){
	console.log('on setPayment');
	if (Auth.userData.promotionCode == 1000){ //10%
		/*
		if (Auth.userData.debt == 1){
			$('#productCodePagSeg').val('6972A7F88D8DE85774D44FB31494B6B4');
			$('#paypal_button').val('EVT9SPRC8T6V6');
		} else if (Auth.userData.debt == 2){
			$('#productCodePagSeg').val('85B697A749495F4994AFEF9B545BC55B');
			$('#paypal_button').val('4DC6ZL8RVYRMQ');
		} else if (Auth.userData.debt == 3){
			$('#productCodePagSeg').val('D93A8B808E8E586BB455FFA7F52C5BCF');
			$('#paypal_button').val('8JQ2XE7E45SC6');
		} else if (Auth.userData.debt == 4){
			$('#productCodePagSeg').val('DBBEFD15ABAB21EBB4C98F81A5BE8263');
			$('#paypal_button').val('VSHHNEGAU265G');
		}
		*/
	} else if (Auth.userData.promotionCode == 2000){ // 20%
		if (Auth.userData.debt == 1){
			// $('#productCodePagSeg').val('');
			// $('#paypal_button').val('');
		}
		if (Auth.userData.debt == 2){
			// $('#productCodePagSeg').val('');
			// $('#paypal_button').val('');
		}
		if (Auth.userData.debt == 3){
			// $('#productCodePagSeg').val('');
			// $('#paypal_button').val('');
		}
		if (Auth.userData.debt == 4){
			// $('#productCodePagSeg').val('');
			// $('#paypal_button').val('');
		}
	} else if (Auth.userData.promotionCode == 9000){ //90%
		if (Auth.userData.debt == 1){
			// $('#productCodePagSeg').val('');
			// $('#paypal_button').val('');
		}
		if (Auth.userData.debt == 2){
			// $('#productCodePagSeg').val('';
			// $('#paypal_button').val('');
		}
		if (Auth.userData.debt == 3){
			// $('#productCodePagSeg').val('';
			// $('#paypal_button').val('');
		}
		if (Auth.userData.debt == 4){
			// $('#productCodePagSeg').val('';
			// $('#paypal_button').val('');
		}
	} else if (Auth.userData.promotionCode == 10000){
		//normal price
		if (Auth.userData.debt == 1){
			// FRR18x1 | R$ 209
			$('#productCodePagSeg').val('7B0D086F3636F96BB4A4FFAF6FC39BDE');
			$('#paypal_button').val('V72559DHK8PAG');
		}
		if (Auth.userData.debt == 2){
			// FRR18x2 | 418
			$('#productCodePagSeg').val('CF448A6C7272961AA4121FB7E933869A');
			$('#paypal_button').val('REU3FZ9V74YA8');
		}
		if (Auth.userData.debt == 3){
			// FRR18x3 | 627
			$('#productCodePagSeg').val('6598FDCA2A2ACFBBB464EFB865033C0E');
			$('#paypal_button').val('BVPMV5ADNSCLA');
		}
		if (Auth.userData.debt == 4){
			// FRR18x4 | 836
			$('#productCodePagSeg').val('02937179A6A6640334E74FAFE6E1ED9E');
			$('#paypal_button').val('XMDEB2UPA73JU');
		}
	} else if (Auth.userData.promotionCode == 0){
		console.log('Scholarship 100%');
	} else if (Auth.userData.promotionCode == 1){ // R$ 290,00
		$('#productCodePagSeg').val('9062A954C3C3959BB4D64FAF1D734807');
		$('#paypal_button').val('C4XSVBU4E5UV4');
	} else if (Auth.userData.promotionCode == 10001){ // R$ 532 Français Exclusivité
		$('#productCodePagSeg').val('BF7C15EC0101D83BB414FF86D018361A');
		$('#paypal_button').val('K47NPXDD26WTA');
	} else if (Auth.userData.promotionCode == 10002){ // R$ 290 Français à Deux
		$('#productCodePagSeg').val('A992942DF1F10BBEE4758F93D88A2DA0');
		$('#paypal_button').val('C4XSVBU4E5UV4');
	} else if (Auth.userData.promotionCode == 10003){ // R$ 580 Français à Deux x2
		$('#productCodePagSeg').val('0B7EC415C7C7719224DF3F8E041220EC');
		$('#paypal_button').val('E4R2T6Q62VZLG');
	} else if (Auth.userData.promotionCode == 10004){ // FREXCHB17 ; R$ 480 ; Francês Exclusivité Casal - desconto Hi-Bonjour
		$('#productCodePagSeg').val('BA0A1EB42E2E71444480BF865342B874');
		$('#paypal_button').val('SSSSP5XAJKLTG');
	}
}

function showPayButton(){
	$('#pay_button').collapse("show");
}
