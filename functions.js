function getRotationDegrees(obj) {
	
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none' && matrix.split('(').length>1) {
      var values = matrix.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle +=360 : angle;
	
}

function getpos(entity){

	var pos = new Object();
	pos['width'] = parseInt( $(entity).css ('width') );
	pos['height'] = parseInt( $(entity).css('height') );
	pos['top'] = parseInt( $(entity).css('top') );
	pos['left'] = parseInt( $(entity).css('left') );
	pos['right'] = pos['left'] + pos['width'];
	pos['bottom'] = pos['top'] + pos['height'];
	pos['rotation'] = getRotationDegrees($(entity));
	return pos;
}

function isbetween(sharkDu1, sharkDu2, boatDu){
	if(sharkDu1<=boatDu&&sharkDu2>=boatDu){
		return true
	
	}else
	{
		return false
	}
}

function rand(min,max){
	var num = Math.floor(Math.random()*(max-min+1)+min)
	return num
}
function randCol(){
	var r = rand(0,255)
	var g = rand(0,255)
	var b = rand(0,255)
	return 'rgb('+r+','+g+','+b+')'
}
function touching(sharkDude, boatDude){
	var shark = getpos(sharkDude)
	var boat = getpos(boatDude)
	
	var ht1 = isbetween(shark.left, shark.right, boat.left);
	var ht2 = isbetween(shark.left, shark.right, boat.right);
	var vt1 = isbetween(shark.top, shark.bottom, boat.top);
	var vt2 = isbetween(shark.top, shark.bottom, boat.bottom);
	
	var ht3 = isbetween(boat.left, boat.right, shark.left);
	var ht4 = isbetween(boat.left, boat.right, shark.right);
	var vt3 = isbetween(boat.top, boat.bottom, shark.top);
	var vt4 = isbetween(boat.top, boat.bottom, shark.bottom);
	
	var ht
	if(ht1||ht2||ht3||ht4){	
		ht = true
		
	}
	var vt
	if(vt1||vt2||vt3||vt4){
		vt = true
		
	}
	
	if(ht&&vt){
		return true;
	}
	else{
		return false;
	}
}