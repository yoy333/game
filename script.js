// keyboard
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
//global functions
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
// local functions
var verticleMomentum = 0;
var horizontalMomentum = 0;
var stageTouch = true;
var startChoise;
function startUp(){
		$('#screen').append(startChoise)
}
function gravity(){
	if(stageTouch==false){
		verticleMomentum += 1;
	}
}
function cap(){
	if(horizontalMomentum>7){
  	horizontalMomentum=7
  }else if(horizontalMomentum<-7){
  	horizontalMomentum = -7
  }
  if(verticleMomentum>13){
  	verticleMomentum=13
  }else if(verticleMomentum<-13){
  		verticleMomententum=-13
  }
}
function moveP_one(){
	var P_one_Att = getpos('div#P1')
  if(keys.w&&stageTouch){
		verticleMomentum -= 17;
	}
  if(keys.a){
  	horizontalMomentum -= 3
  }else if(keys.d){
  	horizontalMomentum += 3
  }else{
  	horizontalMomentum = 0
  }
  cap();
  //physics
	$('div#P1').css('top', P_one_Att.top+verticleMomentum+'px')
  $('div#P1').css('left', P_one_Att.left+horizontalMomentum+'px')
  var P_one_Att = getpos('div#P1')
  $('div.stage').each(function(){
  	if(touching('div#P1', this)){
    var stage_Att = getpos(this)
  	if(P_one_Att.right>stage_Att.left&&P_one_Att.left<stage_Att.right&&P_one_Att.right-horizontalMomentum>stage_Att.left&&P_one_Att.left+P_one_Att.width+horizontalMomentum<stage_Att.right){
      if(verticleMomentum>0){
      	$('div#P1').css('top', stage_Att.top-P_one_Att.height+'px')
      	verticleMomentum=0
        stageTouch = true
      }
      if(verticleMomentum<0){
      		$('div#P1').css('top', stage_Att.botom+'px')
      		verticleMomentum=0
      }
  	}else if(P_one_Att.bottom>stage_Att.top&&P_one_Att.top<stage_Att.bottom){
    		if(horizontalMomentum>1){
        		horizondrawtalMomentum=0
        		$('div#P1').css('left', stage_Att.left-P_one_Att.width-1+'px')
        }else if(horizontalMomentum<-1){
        		horizontalMomentum=0
        		$('div#P1').css('left', stage_Att.right+1+'px')
        }
    }
  }else {
  		stageTouch=false
  }

  })
  }
  function sidescroll(){
  	var P_one_Att = getpos('div#P1')
  	if(P_one_Att.left<350){
    		var obj_Att = getpos('div#P1')
        if(horizontalMomentum<0){
          $('div#P1').css('left', 350+'px')
          $('div.stage').each(function(){
          		var stage_Att = getpos(this)
              $(this).css('left', stage_Att.left - horizontalMomentum+'px')
          })
        }
    }
    if(P_one_Att.right>650){
    		var obj_Att = getpos('div#P1')
        if(horizontalMomentum>0){
          $('div#P1').css('left', 650-P_one_Att.width+'px')
          $('div.stage').each(function(){
          		var stage_Att = getpos(this)
              $(this).css('left', stage_Att.left - horizontalMomentum+'px')
          })
        }
    }
  }
 function draw(){
 		gravity();
    sidescroll();
    moveP_one();
    requestAnimationFrame(draw);
}
$('#startB').click(function(){
				$('#startS').remove()
        $('#screen').append('<div id="stageS"><button id="stageB">demo</button></div>')
        $('#stageB').click(function(){
        		startChoise = '<div id="P1" class="grav"></div><div class="stage" style="position: absolute;display: inline-block;left: -250px;top: 440px;height: 100px;width: 1500px;background-color: white;">'
            $('div#stageS').remove()
        		startUp();
            draw();
        })
});
