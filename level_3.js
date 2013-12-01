
// global variable to store the score
var score = 0;

function createImage () {
    var $guy;

    // new image is created
    // 20% chance of displaying "good", 80% of displaying "bad"
    if (Math.random() < 0.2) {
        $guy = $('<img class="good" src="ext/homer.png" />');
    } else {
        $guy = $('<img class="bad"  src="ext/burns.png" />');
    }
    
    // random positionning. It uses the fact that in the css file we set the images with "position: absolute"
    $guy.css('left', Math.random()*500+'px');
    $guy.css('top',  Math.random()*300+'px');
    
    
    // the image is added to the scene
    $('body').append($guy);
    
    
    // in jQuery, you can chain instructions. Here we hide the image to be able to make it appear smoothly in a fade
    $guy.hide().fadeIn();
    
    // after 2 seconds, the image disappears
    setTimeout(function () {
        $guy.fadeOut();
    }, 2000);
}



// this function will call itself after a randomized delay, in order to make images appear one after the other
function gameLoop () {
    createImage();
    setTimeout(gameLoop, 200 + Math.random()*500);
}




$(function () {
    
    /* Detection of the click on an image.
       You would probably use a syntax like :
           
           $('img').click(function () { ...
       
       but this one would not work here : it means "Take all img elements CURRENTLY present on the page, and when the user clicks on them, trigger the function"
       Here, when this instruction is executed, no image has been added to the page yet. The images will be added later.
       The trick is to use this syntax : 
       
           $('body').on('click', 'img', function () {
           
       which means : "whenever an img inside body is clicked, trigger the function"
       It applies to all past and future img in the body
           
    */
        
        
    $('body').on('click', 'img', function () {
        $(this).remove(); // the element is completely removed from the html
        
        if ($(this).hasClass('good')) {
            score -= 3;  // penalty if the user hits a "good" image
        } else {
            score += 1;
        }
        
        $('#score').html(score);
    });
    
    // starts the image apparition process
    gameLoop();
    
});




