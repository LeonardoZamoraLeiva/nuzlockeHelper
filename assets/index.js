// const { types } = require("pg");

let divPokemones = document.getElementById("pokemones");
var pokemones = [];

function recolectarPokemones() {
  return (myPromise = new Promise((resolve) => {
    let pokemones = [];
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1200").then((response) =>
      response.json().then((data) => {
        data.results.forEach((pokemon) => {
          let name = pokemon.name;
          let urllist = pokemon.url.split("/");
          let urlphoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${urllist[6]}.png`;

          pokemones.push({ nombre: name, foto: urlphoto });

          if (pokemones.length == 150) {
            resolve(pokemones);
            return pokemones;
          }
        });
      })
    );
  }));
}
let traerPokes = async () => {
  pokemones = await recolectarPokemones();
  pokemones.forEach((pokemon) => {
    var tarjetaPokemon = document.createElement("div");
    tarjetaPokemon.setAttribute("class", "card text-center");
    tarjetaPokemon.setAttribute("id", `${pokemon.nombre}`);
    var photoPokemon = document.createElement("img");
    photoPokemon.setAttribute("class", "card-img-top");
    photoPokemon.setAttribute("src", pokemon.foto);

    var elementoPokemonBody = document.createElement("div");
    elementoPokemonBody.setAttribute("class", "card-body");

    var pokemonNombre = document.createElement("h3");
    pokemonNombre.setAttribute("class", "card-header");
    pokemonNombre.textContent = pokemon.nombre;

    var pokemonInfo = document.createElement("button");
    pokemonInfo.setAttribute("class", "btn btn-info");
    pokemonInfo.setAttribute("data-bs-target", `#collapse${pokemon.nombre}`);
    pokemonInfo.setAttribute("type", "button");
    pokemonInfo.setAttribute("data-bs-toggle", "collapse");
    pokemonInfo.setAttribute("aria-expanded", false);
    pokemonInfo.setAttribute("aria-controls", `collapse${pokemon.nombre}`);

    pokemonInfo.textContent = "Info";

    var pokemonTypesInfo = document.createElement("div");
    pokemonTypesInfo.setAttribute("class", "collapse");
    pokemonTypesInfo.setAttribute("id", `collapse${pokemon.nombre}`);

    var typesInfo = document.createElement("div");
    typesInfo.setAttribute("class", "card card-body");
    typesInfo.textContent = "Esto por ahora";

    pokemonTypesInfo.appendChild(typesInfo);

    tarjetaPokemon.appendChild(pokemonNombre);
    elementoPokemonBody.appendChild(pokemonInfo);
    elementoPokemonBody.appendChild(pokemonTypesInfo);

    tarjetaPokemon.appendChild(photoPokemon);
    tarjetaPokemon.appendChild(elementoPokemonBody);
    tarjetaPokemon.appendChild(pokemonTypesInfo);
    divPokemones.appendChild(tarjetaPokemon);
  });
};
traerPokes();

function filtrarPokes() {
  var input, filter, cards, cardContainer, h5, title, i;
  input = document.getElementById("myFilter");
  filter = input.value.toUpperCase();
  cardContainer = document.getElementById("pokemones");
  cards = cardContainer.getElementsByClassName("card");
  for (i = 0; i < cards.length; i++) {
    title = cards[i].querySelector(".card-body .card-title");
    if (title.innerText.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

function infoPokemon(pokemonName) {
  var pokemonActual = document.getElementById("myFilter");
}
