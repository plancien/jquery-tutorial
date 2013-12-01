
/*  
    This is mostly the same game and behaviour as in level 3,
    only the code here is better, and we took care of some details.

*/


// the useful params are put here, in order to make the tuning of the game easier :


/********************** PARAMS **********************/

var goodImgUrl = 'ext/homer.png';
var badImgUrl  = 'ext/burns.png';

var imgWidth   = 80;
var imgHeight  = 230;
// note : a more robust (but slightly more complicated) version of this code could measure width and height from the actual images,
//        and remove the need of setting these params manually


var penaltyPoints = -30;
var hitPoints     =  10;


var goodProbability             = 0.2;
var appearanceDuration          = 2000;
var averageDelayBetweenImages   = 400;


/***************************************************/



var score = 0;
var $score;   // $score is now a global variable, since it is used in different places


// short functions, aimed at simple tasks, make the code easier to read
function appearAndVanish ($guy) {
    $guy.hide().fadeIn();
    
    setTimeout(function () {
        $guy.fadeOut(500, function () {
            // after the fadeOut, we remove the img from the page completely, otherwise the page would end up cluttered by dozens of unused elements.
            $guy.remove();
        });
    }, appearanceDuration);
}


function randomPosition ($guy) {
    
    // we use all available screen
    var x = Math.random() * ($(window).width()  - imgWidth);
    var y = Math.random() * ($(window).height() - imgHeight);
    
    // alternative syntax for .css function, useful when modifying several attributes
    $guy.css({
        left: x,
        top:  y
    });
}


function selectRandomGuy () {
    if (Math.random() < goodProbability) {
        return $('<img class="good" src="' + goodImgUrl + '" />');
    } else {
        return $('<img class="bad"  src="' + badImgUrl  + '" />');
    }
}




function createImage () {
    var $guy = selectRandomGuy();
    
    $('body').append($guy);
    
    randomPosition($guy);
    
    appearAndVanish($guy);
}



function gameLoop () {
    createImage();
    setTimeout(gameLoop, 2 * Math.random()*averageDelayBetweenImages);
}


function imgClicked () {
    $(this).remove();
    if ($(this).hasClass('good')) {
        score += penaltyPoints;
    } else {
        score += hitPoints;
    }
    $score.html(score);
}




$(function () {
    
    $score = $('#score');
    
    // '.good, .bad' : you can use several different selectors if you want.
    // this version is cleaner than the one with 'img' selector, which was not specific enough : maybe later you would have added other images in you web pages
    $('body').on('click', '.good, .bad', imgClicked);
    
    
    // on some browser, like Chrome or Firefox, when you drag an image with the mouse a ghost version of it moves with you mouse
    // this effect is annoying on this specific game, so here is a hack to avoid it :
    $('body').on('mousedown', '.good, .bad', function (e) {
        e.preventDefault(); // preventDefault tells the browser : "don't do what you would have usually done with this event"
    });
    
    gameLoop();
    
});




