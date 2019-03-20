//local functions
var verticleMomentum = 0;
var horizontalMomentum = 0;
var stageTouch = true;
var c = 0;
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
}
function moveP_one(){
	var P_one_Att = getpos('#P1')
	if(touching('div#P1','div#barrier')||touching('div#P1', 'div#stage')){
  	if(P_one_Att.right>250&&P_one_Att.left<750&&P_one_Att.bottom+verticleMomentum>440){
    	$('div#P1').css("top", 440-P_one_Att.height+'px')
      if(verticleMomentum>0){
      	verticleMomentum=0
      }
      stageTouch=true
  	}
	}else{
		stageTouch=false
	}
  if(keys.w&&stageTouch){
		verticleMomentum -= 17;
	}
  $('div#P1').css('top', P_one_Att.top+veritcleMomentum+'px')
  $('div#P1').css('left', P_one_Att.left+horizontalMomentum+'px')
}
  function draw(){
    c++
  	gravity();
    cap();
    moveP_one();
    requestAnimationFrame(draw)
  }
  $(document).ready(function(){
  	draw();
  })
