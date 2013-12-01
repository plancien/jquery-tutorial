$(function () {
    
    // since we will use it several time, we store the game div into a variable. Far from being mandatory, but it can speed up things.
    var $game = $('#game');
    // note : the $ in "$game" is juste an arbitrary choice.
    // You could have chosen to call it "game", but here we use this to give a hint that what is stored is a jQuery object.
    
    
    // there are two screens in the html, the #intro screen and the #game screen. On page load, we hide the #game screen, to show only #intro.
    $game.hide();
    
    
    function fillName () {
        var name = $('#name').val(); // gather the value of the select element.
        $('span.name').html(name);   // replace the content of the .name element with the name chosen
    }
        
    
    function showGame () {
        $('#intro').hide();
        $game.fadeIn(500);
    }
    
    // this will de triggered when the user will change the value of the select element.
    $('#name').on('change', function () {
        fillName();
        showGame();
    });
    
    

    // jQuery is good at targetting multiple elements at once.
    // Here we user the selector '.good' which will apply at all 4 images.
    // The click detection will work on all these 4 images.

    
    $('.good').click(function () {
        
        // here, if we do $('.good').fadeOut(1000), all the good images will fade out.
        // but we only want to fade the image on which the user just clicked. In jQuery we can access this very element with :
        //      $(this)
        
        $(this).fadeOut(1000);
    });
    
    
});
