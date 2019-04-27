// local functions
var P_one_specs
var verticleMomentum = 0;
var horizontalMomentum = 0;
var stageTouch = true;
var grav1 = false
var stageV
var is1alive = true
function startUp(){
      $('.stageB').remove()
		$('#screen').append('<div id="P1"><div id="HPone"></div></div>'+stageV)
    $('#screen').append('<div id="oneR"></div>')
}
function gravity(){
	if(grav1==true||stageTouch==false){
		verticleMomentum += 1;
	}
}
function cap(){
	if(horizontalMomentum>P_one_specs.g_speed_Max&&keys.d){
  	horizontalMomentum=P_one_specs.g_speed_Max
  }else if(horizontalMomentum<-P_one_specs.g_speed_Max){
  	horizontalMomentum = -P_one_specs.g_speed_Max
  }
  if(verticleMomentum>P_one_specs.jump_Power&&keys.a){
  	verticleMomentum=P_one_specs.jump_Power
  }else if(verticleMomentum<-P_one_specs.jump_Power){
  		verticleMomententum=-P_one_specs.jump_Power
  }
}
function moveP_one(){
	var P_one_Att = getpos('div#P1')
  if(keys.w&&stageTouch){
		verticleMomentum -= P_one_specs.jump_power;
	}
  if(keys.a){
  	horizontalMomentum -= P_one_specs.g_speed_acc
  }else if(keys.d){
  	horizontalMomentum += P_one_specs.g_speed_acc
  }else{
  	horizontalMomentum = 0
  }
  cap();
  //physics
  //document.getElementById('screen').innerHTML = horizontalMomentum
	$('div#P1').css('top', P_one_Att.top+verticleMomentum+'px')
  $('div#P1').css('left', P_one_Att.left+horizontalMomentum+'px')
  var P_one_Att = getpos('div#P1')
  stageTouch=false
  grav1=false
  $('div.stage').each(function(){
  	if(touching('div#P1', this)){
    var stage_Att = getpos(this)
  	if(P_one_Att.right>stage_Att.left&&P_one_Att.left<stage_Att.right&&P_one_Att.right-horizontalMomentum>stage_Att.left&&P_one_Att.left-horizontalMomentum<stage_Att.right){
    	if(verticleMomentum>0){
        $('div#P1').css("top", stage_Att.top-P_one_Att.height+'px')
        stageTouch=true
      	verticleMomentum=0
        grav1=false
      }else if(verticleMomentum<0){
      	$('div#P1').css('top', stage_Att.bottom+'px')
        verticleMomentum=0
        stageTouch=false
        grav1=true
      }
  	}else if(P_one_Att.bottom>stage_Att.top&&P_one_Att.top<stage_Att.bottom){
    		if(horizontalMomentum>1){
        		horizontalMomentum=0
        		$('div#P1').css('left', stage_Att.left-P_one_Att.width-1+'px')
        }else if(horizontalMomentum<-1){
        		horizontalMomentum=0
        		$('div#P1').css('left', stage_Att.right+1+'px')
        }
    }
  }
  })
  }
  function sidescroll(){
  		var P_one_Att = getpos('div#P1')
      		if(P_one_Att.left<350&&horizontalMomentum<0){
          		$('div.stage').each(function(){
              		var stage_Att = getpos(this)
              		$(this).css('left', stage_Att.left-horizontalMomentum+'px')
              })
              $('div#P1').css('left', P_one_Att.left-horizontalMomentum+'px')
              var oneR_Att = getpos('div#oneR')
              $('div#oneR').css('left', oneR_Att.left-horizontalMomentum+'px')
              $('div.spike').each(function(){
              		var spike_Att = getpos(this)
              		$(this).css('left', spike_Att.left-horizontalMomentum+'px')
              })
          }
          if(P_one_Att.right>650&&horizontalMomentum>0){
          		$('div.stage').each(function(){
              		var stage_Att = getpos(this)
              		$(this).css('left', stage_Att.left-horizontalMomentum+'px')
              })
              $('div#P1').css('left', P_one_Att.left-horizontalMomentum+'px')
              var oneR_Att = getpos('div#oneR')
              $('div#oneR').css('left', oneR_Att.left-horizontalMomentum+'px')
              $('div.spike').each(function(){
              		var spike_Att = getpos(this)
              		$(this).css('left', spike_Att.left-horizontalMomentum+'px')
              })
          }
  }
  function respawn(){
  		var P_one_Att = getpos('div#P1')
  		if(P_one_Att.top > 620){
      		$('div#P1').remove()
          is1alive = false
      		var respawnTime = setTimeout(function(){
          		$('div#screen').prepend('<div id="P1"></div>')
              is1alive = true
              var distance = parseInt($('div#oneR').css('left'))-350
              $('div.stage').each(function(){
              		var stage_Att = getpos(this)
              		$(this).css('left', stage_Att.left-distance+'px')
              })
              $('div#oneR').css('left', '350px')
              $('div#P1').css('left', '350px')
          }, 3000)
      }
  }
  function playerClick(){
  		$('#demoPB').click(function(){
           P_one_specs  = {
						g_speed_Max: 7,
    				g_speed_acc:3,
    				a_resistance:1,
    				jump_power:17,
            maxHP:100,
					}
  				startUp();
      		draw();
      		$('.playerB').remove()
          $('#screen').css('background-color', 'red')
  		})
      $('#speedyPB').click(function(){
      		P_one_specs  = {
						g_speed_Max: 9,
    				g_speed_acc:2,
    				a_resistance:1,
    				jump_power:17,
					}
  				startUp();
      		draw();
      		$('.playerB').remove()
          $('#screen').css('background-color', 'red')
      })
  }
 function draw(){
 		if(is1alive==true){
    		gravity();
    		moveP_one();
    		sidescroll();
        respawn();
    }
    requestAnimationFrame(draw);
}
$(document).ready(function(){
	$('#startB').click(function(){
  	$('#creditsB').remove()
      $('div#screen').append('<button id="demoSB" class="stageB">demo</button><button id="QuadP" class="stageB">4 plats</button><button id="spikeLandSB" class="stageB">spike land</button>')
    $('div#screen').css('background-color', '#6593F5')
    $('#startB').remove()
    $('#demoSB').click(function(){
    	stageV = stageMaker(440, -250, 100, 1500)
    	stageV += stageMaker(300, 250, 50, 500)
      $('#screen').css('background-color', 'green')
      $('.stageB').remove()
      $('div#screen').append('<button class="playerB" id="demoPB">demo</button><button class="playerB" id="speedyPB">speedy</button>')
      playerClick();
    })
    $('#QuadP').click(function(){
    		stageV =  stageMaker(160, -175, 50, 1350)
    		stageV += stageMaker(300, -250, 50, 600)
        stageV += stageMaker(440, -250, 100, 1500)
        stageV += stageMaker(300, 650, 50, 600)
        $('#screen').css('background-color', 'green')
        $('.stageB').remove()
        $('div#screen').append('<button class="playerB" id="demoPB">demo</button><button class="playerB" id="speedyPB">speedy</button>')
      	playerClick();
    })
    $('#spikeLandSB').click(function(){
  		stageV = stageMaker(440, -250, 100, 1500)
      stageV += spikeMaker(420, 450, 20, 100)
      $('#screen').css('background-color', 'green')
      $('.stageB').remove()
      $('div#screen').append('<button class="playerB" id="demoPB">demo</button><button class="playerB" id="speedyPB">speedy</button>')
     	playerClick();
  })
	})
  $('#creditsB').click(function(){
  		$('div#screen').append('<h1 class="credits">credits</h1><h3 class="credits"></h3>')
      $('#creditsB').remove()
      $('#startB').remove()
  })
});
