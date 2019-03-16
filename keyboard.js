var keys = new Object();
function switchKeys(tf, c){
	switch(c){
		case 40:keys['down']=tf;break;
 		case 39:keys['right']=tf;break;
		case 38:keys['up']=tf;break;
		case 37:keys['left']=tf;break;
		case 87:keys['w']=tf;break;
 		case 65:keys['a']=tf;break;
		case 83:keys['s']=tf;break;
		case 68:keys['d']=tf;break;
		case 32:keys['space']=tf;break;
		case 80:keys['p']=tf;break;
	}
}
$(document).on('keydown',function(evt){
	switchKeys(true, evt.keyCode);
});
$(document).on('keyup', function(evt){
	switchKeys(false, evt.keyCode);
});