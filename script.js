var verticleMomentum = 0;
var horizontalMomentum = 0;
var stageTouch = true
function gravity(){
	var P_one_Att =  getpos('div#P1')
	if(P_one_Att.right<250){
		stageTouch=false
	}
	if(stageTouch==false){
		verticleMomentum += 1;
	}
}
function moveP_one(){
	if(touching('div#P1','div#stage')||touching('div#P1', 'div#stage')){
		var P_one_Att =  getpos('div#P1')
		var P_one_right = P_one_Att.right
		if(stageTouch==false&&P_one_right<250==''){
			var P_one_Att = getpos('div#P1')
			console.log(250-P_one_Att.width+'px')
			$('div#P1').css('left', 250-P_one_Att.width+'px')
		}else{
			verticleMomentum = 0;
			var P_one_Att = getpos('div#P1')
			$('div#P1').css('top', 440-P_one_Att.height+'px')
			stageTouch=true
		}
	}else{
		stageTouch=false
	}
	var P_one_Att =  getpos('div#P1')
	if(keys.w&&stageTouch==true){
		verticleMomentum -= 17;
		stageTouch = false;
	}
	if(keys.a){
		horizontalMomentum -= 17;
	}
	if(keys.d){
		horizontalMomentum += 17;
	}
	$('div#P1').css('top', verticleMomentum+P_one_Att.top+'px')
	$('div#P1').css('left', horizontalMomentum+P_one_Att.left+'px')
}
$(document).ready(function(){
	draw();
})
var draw = function(){
	gravity();
	moveP_one();
	requestAnimationFrame(draw);
}