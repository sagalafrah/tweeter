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
        const tweetText = $('#tweet').val();
        console.log("$('#tweet').val()", $('#tweet').val());
        console.log('tweetText', tweetText);
         
        if (!tweetText) {
          alert('Tweet is empty!');
        
        } else if (tweetText.length > 140) {
          alert('Tweet is too long!');
        
        } else {
              
          $.ajax('/tweets', {
            data: `text=${tweetText}`,
            method: 'POST'
          })
            .then(() => {
              loadTweets();
              $('#tweet-input').val('');
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
                  <h4>${escape(tweet.user.name)}</h4>
                  <p>${escape(tweet.user.handle)}</p>
              </header>
              <p>${escape(tweet.content.text)}</p>
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