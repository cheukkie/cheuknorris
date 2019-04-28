import 'normalize.css';
import '../scss/main.scss';

/*

TO DO:

- PROMPTING ON REMOVING FAV JOKE

- ONLY UNIQUE JOKES IN FAVORITE LIST
    > CHECK IF JOKE EXISTS WHILE FETCHING RANDOM JOKE
    > GET 10 UNIQUE JOKES BY CHECKING WITH FAV LIST

- COUNTDOWN OF 5 SEONDS AFTER ACTIVATING RANDOM BTN


CSS STYLING + ANIMATION:
- LOADING ANIMATION

*/

const chuckNorris = new Vue({
    el: '#chuckNorris',
    data: {
        jokes: [],
        favorites: [],
        timer: '',
        timerActivated : false,
        timerIndication : 0,
        timerInterval : 5
    },
    filters:{
        // cleanString : function(string){
        //     return string.replace(/[|&;$%@"<>()+,]/g, "");
        // }
    },
    created(){
        if( localStorage.getItem('chucksFavs') ){
            const favList = JSON.parse(localStorage.getItem('chucksFavs'));
            this.favorites = favList;
        }
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
        startTimer: function(sec){
            this.timerActivated = !this.timerActivated;
            this.addRandomToFav(1);
            this.timer = setInterval( () => {
                this.addRandomToFav(1);
            }, sec * 1000);
            //strange, its not possible to do this?:
            // this.timer = setInterval( this.addRandomToFav(), 5000); ??            
        },
        clearFavs: function(){
            this.favorites = [];
            this.saveList(this.favorites,'chucksFavs');
        },
        addRandomToFav: function(qty){
            if( this.favorites.length <= 9 && this.timerActivated ){
                console.log('get 1 joke');
                this.getRandomJokes(qty)
                .then(data => {
                    data[0]['faved'] = false;
                    this.favorites.push(data[0]);
                    this.saveList(this.favorites,'chucksFavs');
                });
            }else{
                console.log('reset timer');
                this.timerActivated = false;
                clearInterval(this.timer);
            }
        },
        addFav: function(joke) {
            if( this.favorites.length <= 9 ){
                joke.faved = true;
                this.favorites.push(joke);
                
                this.saveList(this.favorites,'chucksFavs');
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

            this.saveList(this.favorites,'chucksFavs');
        },
        saveList: function(listData,listName){
            //listname
            //const saveListName = this.cleanString(listName);
            const saveListName = listName;
            //console.log(saveListName);
            //convert list to json string
            const saveList = JSON.stringify(listData);
            //console.log( saveList );
            localStorage.setItem(saveListName, saveList);
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
});



