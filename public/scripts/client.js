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
    const tweetText = $(this).children('textarea').val();
    console.log(tweetText);
     
    if (!tweetText) {
      alert('Tweet is empty!');
    
    } else if (tweetText.length > 140) {
      alert('Tweet is too long!');
    
    } else {
          
      $.ajax('/tweets', {
        data: $(this).serialize(),
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
          <footer>
            <h5>${timeago.format(tweet.created_at)}</h5>
            <h5>flag retweet favorite</h5>
          </footer>
        </article>`;

      return exampleTweet;
  };

});