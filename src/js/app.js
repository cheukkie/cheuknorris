import 'normalize.css';
import '../scss/main.scss';

const app = new Vue({
    el: '#app',
    data: {
        jokes: [],
        favorites: []
    },
    methods: {
        addFav: function(joke) {
            if( this.favorites.length <= 10 ){
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


async function getPosts() {
    const response = await fetch('http://api.icndb.com/jokes/random/10');

    const data = await response.json();
    return data.value;
}
getPosts().then(allJokes => {
    allJokes.forEach(joke => {
        app.jokes.push({
            id : joke.id,
            joke : joke.joke,
            categories : joke.categories,
            faved : false
        });
    });
});