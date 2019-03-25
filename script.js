var verticleMomentum = 0;
var horizontalMomentum = 0;
var stageTouch = true;
var c = 0;
function startUp(){
		$('#screen').append('<div class="stage"></div>')
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
  if(touching('div#P1','div#barrier')||touching('div#P1', 'div.stage')){
  	if(P_one_Att.right>250&&P_one_Att.left<750&&P_one_Att.right-horizontalMomentum>250&&P_one_Att.left+horizontalMomentum<750){
    	$('div#P1').css("top", 440-P_one_Att.height+'px')
      if(verticleMomentum>0){
      	verticleMomentum=0
      }
      stageTouch=true
  	}else if(P_one_Att.bottom>440&&P_one_Att.top<540){
    		if(horizontalMomentum>1){
        		$('div#P1').css('left', 250-P_one_Att.width-1+'px')
        }else if(horizontalMomentum<-1){
        		$('div#P1').css('left', 750+1+'px')
        }
    }
  }else{
		stageTouch=false
	}
}
 function draw(){
    gravity();
    moveP_one();
    requestAnimationFrame(draw);
  }
  $(document).ready(function() {
  	startUp();
    draw();
});
