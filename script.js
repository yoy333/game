var is = false
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
  var P_one_Att = getpos('div#P1')
  $('div.stage').each(function(){
  	if(touching('div#P1', this)){
    var stage_Att = getpos(this)
  	if(P_one_Att.right>stage_Att.left&&P_one_Att.left<stage_Att.right&&P_one_Att.right-horizontalMomentum>stage_Att.left&&P_one_Att.left+P_one_Att.width+horizontalMomentum<stage_Att.right){
    	$('div#P1').css("top", stage_Att.top-P_one_Att.height+'px')
      if(verticleMomentum>0){
      	verticleMomentum=0
      }
      stageTouch=true
  	}else if(P_one_Att.bottom>stage_Att.top&&P_one_Att.top<stage_Att.bottom){
    		if(horizontalMomentum>1){
        		horizontalMomentum=0
        		$('div#P1').css('left', stage_Att.left-P_one_Att.width-1+'px')
        }else if(horizontalMomentum<-1){
        		horizontalMomentum=0
        		$('div#P1').css('left', stage_Att.right+1+'px')
        }
    }
  }else{
		stageTouch=false
	}

  })
  }
 function draw(){
 	gravity();
    moveP_one();
    requestAnimationFrame(draw);
}
  $(document).ready(function(){
  	startUp();
    draw();
});
