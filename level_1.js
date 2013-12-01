
// The following line encapsulate all the code into a function which will be launched only when jquery and the html elements are loaded and ready
$(function () {
    
    function hideBadGuy () {
        $('.bad').fadeOut(1500); //1500 means 1500 milliseconds, which is 1.5 seconds
    }
    
    /* should you want to execute this function right away at the start, you would do this : 
            hideBadGuy();
    */        
    
    // but here we want to wait for the user to click on the good guy to make the bad guy disappear, so we do : 
    $('.good').click(hideBadGuy);
    
    
});
