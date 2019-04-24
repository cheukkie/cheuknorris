import '../scss/main.scss';

const app = new Vue({
    el: '#app',
    data: {
      jokes: [
        
      ],
      favorites: [
        {
            "id": 506,
            "joke": "Chuck Norris programs do not accept input.",
            "categories": ["nerdy"]
        }, {
            "id": 293,
            "joke": "70% of a human's weight is water. 70% of Chuck Norris' weight is his dick.",
            "categories": ["explicit"]
        }, {
            "id": 311,
            "joke": "Paper beats rock, rock beats scissors, and scissors beats paper, but Chuck Norris beats all 3 at the same time.",
            "categories": []
        }, {
            "id": 533,
            "joke": "The Chuck Norris Eclipse plugin made alien contact.",
            "categories": ["nerdy"]
        }, {
            "id": 414,
            "joke": "The air around Chuck Norris is always a balmy 78 degrees.",
            "categories": []
        }, {
            "id": 171,
            "joke": "Chuck Norris can set ants on fire with a magnifying glass. At night.",
            "categories": []
        }, {
            "id": 58,
            "joke": "Crop circles are Chuck Norris' way of telling the world that sometimes corn needs to lie down.",
            "categories": []
        }, {
            "id": 470,
            "joke": "Chuck Norris doesn't bug hunt as that signifies a probability of failure, he goes bug killing.",
            "categories": ["nerdy"]
        }, {
            "id": 33,
            "joke": "Chuck Norris once shot down a German fighter plane with his finger. By yelling &quot;Bang!&quot;",
            "categories": []
        }, {
            "id": 589,
            "joke": "Dark spots on the Moon are the result of Chuck Norris' shooting practice.",
            "categories": []
        }
      ]
    }
});


async function getPosts() {
const response = await fetch('http://api.icndb.com/jokes/random/10');

    const data = await response.json();
    return data.value;
}
getPosts().then(allJokes => {
    allJokes.forEach(joke =>{
        app.jokes.push(joke);
    });
});