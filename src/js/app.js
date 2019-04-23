import '../scss/main.scss';

var test = 123;

console.log(test);

async function getPosts() {
    const response = await fetch('http://api.icndb.com/jokes/random/10');

    const data = await response.json();
    return data.value;
}
getPosts().then(post => console.log(post));