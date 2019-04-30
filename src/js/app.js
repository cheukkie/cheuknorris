import 'normalize.css';
import '../scss/main.scss';

/*

TO DO:

- PROMPTING ON REMOVING FAV JOKE


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
        timerInterval : 5,
        timerIndication : 0,
        mobShowFav: false
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
                    //check joke exists fav list, if so 
                    let favedJoke = false;
                    this.favorites.forEach( fav => {
                        if( fav.id === joke.id ){
                            //console.log( joke.id );
                            favedJoke = true;
                        }
                    });

                    if( this.jokes.length <= 9 ){
                        this.jokes.push({
                            id : joke.id,
                            joke : joke.joke,
                            categories : joke.categories,
                            faved : favedJoke
                        });
                    }
                });
            });
        },
        startTimer: function(seconds){
            if(seconds){
                this.timerInterval = seconds;
            }
            //toggle boolean
            this.timerActivated = !this.timerActivated;
            if(!this.timerActivated){
                clearTimeout(this.timer);
            }else{
                //this.addRandomToFav(1);
                this.timerIndication = this.timerInterval + 1;
                this.countDown();
            }            
            
            //strange, its not possible to do this?:
            // this.timer = setInterval( this.addRandomToFav(), 5000); ??            
        },
        stopTimer: function(){
            this.timerActivated = false;
            clearTimeout(this.timer);
        },
        countDown: function(){
            if(this.timerIndication-- == 0){
                //when timer reach 1, then do following
                this.addRandomToFav(1);
                this.timerIndication = this.timerInterval;   
            }
            this.timer = setTimeout( () => {
                this.countDown();
            }, 1000);
        },
        clearFavs: function(){
            this.favorites = [];
            this.jokes.forEach(joke=>{
                joke.faved = false;
            });
            this.saveList(this.favorites,'chucksFavs');
        },
        addRandomToFav: function(){
            if( this.favorites.length <= 9 && this.timerActivated ){
                //console.log('get 1 joke');
                
                //Get 3 random jokes
                this.getRandomJokes(3)
                .then(data => {
                    //create array of id's
                    const allFavIds = this.favorites.map(x => x.id );
                    //check if joke already exists in fav list 
                    //console.log(data[0].id);
                    if( !allFavIds.includes(data[0].id) ){
                        data[0]['faved'] = true;
                        this.favorites.push(data[0]);
                        console.log('Joke 1 ');   
                    }else if( !allFavIds.includes(data[1].id) ){
                        data[1]['faved'] = true;
                        this.favorites.push(data[1]);
                        console.log('Joke 2 ');   
                    }else if( !allFavIds.includes(data[2].id) ){
                        data[2]['faved'] = true;
                        this.favorites.push(data[2]);
                        console.log('Joke 3 ');
                    }else{
                        console.log('No joke added');
                    }
                    
                    this.saveList(this.favorites,'chucksFavs');
                });

            }else{
                console.log('reset timer');
                this.stopTimer();
            }
        },
        addFav: function(joke) {
            if( this.favorites.length <= 9 ){
                joke.faved = !joke.faved;
                // joke.faved = true;
                if( joke.faved ){
                    this.favorites.push(joke);
                    this.saveList(this.favorites,'chucksFavs');
                }else{
                    this.removeFav(joke);
                }

            }else{
                alert('You have reached the maximum of 10 favorite jokes.');
            }
        },
        removeFav: function(joke){
            //activate fav btn if joke exists in jokelist based on id
            this.jokes.forEach( jokeItem => {
                if( joke.id === jokeItem.id ){
                    const jokePos = this.jokes.indexOf(jokeItem);
                    jokeItem.faved = false;
                    this.jokes[jokePos].faved = false;
                }
            });
            if(this.jokes.length === 10){
                this.stopTimer();
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
        clearTimeout(this.timer);
    }
});



