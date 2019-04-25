import 'normalize.css';
import '../scss/main.scss';

/*

TO DO:

- GET FETCH JOKES BUTTON

- SAVE FAVORITE LIST TO LOCALSTORAGE
- CLEAR LOCALSTORAGE BUTTON
- CONFIRMATION ON REMOVE JOKE

- ONLY UNIQUE JOKES IN FAVORITE
    > CHECK IF JOKE EXISTS IN FAV LIST
    > GET 10 UNIQUE JOKES BY CHECKING WITH FAV LIST

- BUTTON TIMER 5s FETCHING JOKES UNTIL FAV LIST REACH MAX


CSS STYLING + ANIMATION:
- LOADING ANIMATION

*/

const chuckNorris = new Vue({
    el: '#chuckNorris',
    data: {
        jokes: [],
        favorites: []
    },
    methods: {
        getRandomJokes: async function(qty) {
            const response = await fetch('http://api.icndb.com/jokes/random/'+qty);
            const data = await response.json();            
            return data.value;
        },
        showRandomJokes: function(qty){
            this.getRandomJokes(qty)
            .then(data => {
                this.jokes = [];
                data.forEach(joke => {
                    if( this.jokes.length <= 9 ){
                        this.jokes.push({
                            id : joke.id,
                            joke : joke.joke,
                            categories : joke.categories,
                            faved : false
                        });
                    }
                });
            });
        },
        addFav: function(joke) {
            if( this.favorites.length <= 9 ){
                joke.faved = true;
                this.favorites.push(joke);
            }else{
                alert('Max 10 jokes');
            }
        },
        removeFav: function(joke){
            //activate fav btn if joke exists in jokelist
            if( this.jokes.includes(joke) ){
                const jokePos = this.jokes.indexOf(joke);
                this.jokes[jokePos].faved = false;
            }
            //remove fav
            const favPos = this.favorites.indexOf(joke);
            this.favorites.splice(favPos, 1);
        }
    }
});



