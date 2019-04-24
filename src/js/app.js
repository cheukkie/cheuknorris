import '../scss/main.scss';

const app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
});


async function getPosts() {
const response = await fetch('http://api.icndb.com/jokes/random/10');

    const data = await response.json();
    return data.value;
}
getPosts().then(post => console.log(post));