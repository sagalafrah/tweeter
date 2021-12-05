$(document).ready(function() {
    // --- our code goes here ---
    const $textArea = $('.new-tweet textarea');
    //create new variable called $textArea, and set it equal to the DOM element with the CSS class of "new-tweet textarea".
    $textArea.on('keyup', function() {
        // When a keyup is detected, it gets the length of the text in the textarea

        const $charCounter = $(this).siblings('.counter');
        //creates a new variable called $charCounter, and sets it equal to the DOM element with the CSS class of "counter" that is a sibling of the $textArea element.
        //uses the .siblings() function to get all of the siblings of the element that this code is in
        const remainingCharCount = 140 - $(this).val().length;
        //subtracts the length of the current value of the text area from 140, and sets the character count to that
    
        $charCounter.text(remainingCharCount);
        if (remainingCharCount < 0) {
          $charCounter.addClass('over-char-limit');
    // Adds the class to each element in the set of matched elements.
        } else {
          $charCounter.removeClass('over-char-limit');
        }
      });
    
    });
// Turns the char counter red if it goes over the limit, add an if else statement
//https://stackoverflow.com/questions/5371089/count-characters-in-textarea
//https://dev.to/websolutionstuff/character-count-in-textarea-48p3