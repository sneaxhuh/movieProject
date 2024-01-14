let option = ""
let statement = ""
const movie_data = JSON.parse(localStorage.getItem('selectedMovieData'))
console.log(movie_data.trailerlink)



document.querySelector('.opt1').addEventListener('click', () => {
    const Id = generateUniqueId();
    option = "images/thumbsup.png"
    statement = "Liked It"
    let inputElement = document.querySelector('.rev').value

    var today = new Date();


    var options = { year: 'numeric', month: 'short', day: 'numeric' };


    var formattedDate = today.toLocaleDateString('en-US', options);

    const html = `<div class="review-design data-review-id="${Id}">
    <div class="profile"><img src="images/animal.jpg" alt="" class="reviewpfp"></div>
<div class="reviewbox">
    <div class="reviewtop">
        <div class="username">Nia Rene</div>
        <div class="date">
            <div class="choice"><img src=${option} alt="" class="thumbsup">${statement}</div>
            <div class="actualdate">${formattedDate}</div>
        </div>

    </div>
    <div class="actualrev">${inputElement}</div>
    <div class="botrev">
        <div class="likerev"><button onclick="likerev()" class="like"><img src="images/notlove.png" class="love" alt=""> <span id="likeCount">5</span></button></div>
        <div class="delete"><img src="images/trash-can-solid.png" alt="" class="trash"></div>
        
</div></div>
    `
    inputElement = ''
    document.querySelector('.notok').innerHTML += html;
});

document.querySelector('.opt2').addEventListener('click', () => {
    option = "images/dislike.png"
    statement = "Disliked It"
    let inputElement = document.querySelector('.rev').value

    var today = new Date();


    var options = { year: 'numeric', month: 'short', day: 'numeric' };


    var formattedDate = today.toLocaleDateString('en-US', options);

    const html = `<div class="review-design">
    <div class="profile"><img src="images/animal.jpg" alt="" class="reviewpfp"></div>
<div class="reviewbox">
    <div class="reviewtop">
        <div class="username">${movie_data.name}</div>
        <div class="date">
            <div class="choice"><img src=${option} alt="" class="thumbsup">${statement}</div>
            <div class="actualdate">${formattedDate}</div>
        </div>

    </div>
    <div class="actualrev">${inputElement}</div>
    <div class="botrev">
    <div class="likerev"><button id= "Id" onclick="likerev()" class="like"><img src="images/notlove.png" class="love" alt=""> <span id="likeCount">5</span></button></div>
        <div class="delete"><img src="images/trash-can-solid.png" alt="" class="trash"></div>
    </div>
</div></div>
    `
    inputElement = ''
    document.querySelector('.notok').innerHTML += html;
});


document.querySelector('.notok').addEventListener('click', (event) => {
    
    if (event.target.classList.contains('trash')) {
        
        const reviewElement = event.target.closest('.review-design');

        if (reviewElement) {
            
            reviewElement.remove();
        }
    }
});


function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function likerev(Id) {
    var loveImage = document.getElementById(Id)
            
            var likeCountElement = document.getElementById('likeCount');

       
            var isLiked = loveImage.classList.contains('liked');

            if (isLiked) {
                loveImage.src = 'images/notlove.png';
                likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1;
            } else {
                loveImage.src = 'images/redheart.png'; 
                likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
            }

      
            loveImage.classList.toggle('liked');
        }

        function generateMoviePageHTML(movie_data) {
          return `
            <div class="content">
              <div class="bg-image"><img src="${movie_data.bg}" class="bg" alt=""></div>
            
              <div class="movie-description">
                <div class="poster">
                  <img src="${movie_data.poster}" class="lol" alt="">
                </div>
                <div class="details">
                  <div class="title">
                    <p>${movie_data.name}</p>
                  </div>
                  <div class="smalldetail">
                    <div class="not-genre">
                      <div class="small">${movie_data.runTime}</div>
                      <div class="small">${movie_data.rating}</div>
                    </div>
                    <div class="genre">${movie_data.genre}</div>
                  </div>
                  <div class="ratings">
                    <div class="imbdrat">
                      <img src="images/imdb.png" class="imdb" alt="">
                      <p class="thoda">${movie_data.imdbRating}/10</p>
                    </div>
                    <div class="reel">
                          <img src="images/reelgood.png" class="reelgood" alt="">
                          <p class="thoda">${movie_data.reelgoodscore}/100</p>
                      </div>
                 
                  </div>
      
                  <div class="play">
                    <button class="playmov">&#9654;Play</button>
                    <a href="${movie_data.trailerlink}"><button  class="trailer">Watch Trailer</button></a>
                  </div>
                  <div class="plot">${movie_data.plot}</div>
                </div>
              </div>
              
            </div>
          `;
        }
        
 
        const container = document.querySelector('.container'); 
        container.innerHTML = generateMoviePageHTML(movie_data);

       