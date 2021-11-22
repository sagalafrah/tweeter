$(document).ready(() => {

    /* Escape Function */
      const escape = str => {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
      };
    
    /* Render New Tweets Function */
    
      const renderTweets = (tweets) => {
          $('#tweets-container').empty();
          for (const tweet of tweets) {
              const newTweet = createTweetElement(tweet);
              $('#tweets-container').prepend(newTweet);
          }
      };
      
    /* Submit Function */
    
      $('.input').on('submit', (event) => {
        event.preventDefault();
        $('.error').hide();
        const tweetText = $('#tweet').val();
        console.log("$('#tweet').val()", $('#tweet').val());
        console.log('tweetText', tweetText);
         
        if (!tweetText) {
            $('.error').html('Tweet is empty!').slideDown('slow');


        } else if (tweetText.length > 140) {
            $('.error').html('Tweet is too long!');
        

        } else {
              
          $.ajax('/tweets', {
            data: `text=${tweetText}`,
            method: 'POST'
          })
            .then(() => {
              loadTweets();
              $('#tweet').val('');
              $('.counter').text('140');
            });
        }
    
      });
        
    /* Load Tweets Function */
    
      const loadTweets = () => {
          $.ajax('/tweets', {
              method: 'GET',
              dataType: 'JSON'
          })
              .then(tweets => renderTweets(tweets));
      };
        
      loadTweets();
    
    /* Create New Tweet Element Function */
    
      const createTweetElement = (tweet) => {
          const exampleTweet = `<article class="tweet">
              <header>
                <img src= ${escape(tweet.user.avatars)}/>
                <p>${escape(tweet.user.handle)}</p>
                  <h4>${escape(tweet.user.name)}</h4>
              </header>
              <p class="content">${escape(tweet.content.text)}</p>
              <footer class="timeago">
                <div>${timeago.format(tweet.created_at)}</div>
                <span>
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </span>
              </footer>
            </article>`;
    
          return exampleTweet;
      };
    
    });