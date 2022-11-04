// const { types } = require("pg");

let divPokemones = document.getElementById("pokemones");
let htmlPage = document.getElementById("pagination-numbers");
let page = 1;
var pokemones = [];

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

let nextPage = () => {
  if (page >= pokemones.length / 20) {
    page = page;
  } else {
    page = page + 1;
    divPokemones.replaceChildren();
    traerPokes();
  }
  htmlPage.textContent = page;
  // console.log(page);
};
let prevPage = () => {
  if (page <= 1) {
    page = page;
  } else {
    page = page - 1;
    divPokemones.replaceChildren();
    traerPokes();
  }
  // let htmlPage = document.getElementById("pagination-numbers");
  htmlPage.textContent = page;

  // console.log(page);
};

function recolectarPokemones(pagina) {
  return (myPromise = new Promise((resolve) => {
    let pokemones = [];
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1200`).then((response) =>
      response.json().then((data) => {
        data.results.forEach((pokemon) => {
          let name = pokemon.name;
          let urllist = pokemon.url.split("/");
          let urlphoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${urllist[6]}.png`;

          pokemones.push({ nombre: name, foto: urlphoto });

          if (pokemones.length == 1100) {
            resolve(pokemones);
            return pokemones;
          }
        });
      })
    );
  }));
}

let crearTarjetas = (pokemon) => {
  // let nombre = pokemon.nombre;
  if (pokemon.nombre.includes("-")) {
    pokemon.nombre = pokemon.nombre.replace("-", "_");
  }
  var tarjetaPokemon = document.createElement("div");
  tarjetaPokemon.setAttribute("class", "card text-center");
  // tarjetaPokemon.setAttribute("id", `${pokemon.nombre}`);
  var photoPokemon = document.createElement("img");
  photoPokemon.setAttribute("class", "card-img-top");
  photoPokemon.setAttribute("src", pokemon.foto);

  var elementoPokemonBody = document.createElement("div");
  elementoPokemonBody.setAttribute("class", "card-body");

  var pokemonNombre = document.createElement("p");
  pokemonNombre.setAttribute("class", "card-header card-title");
  pokemonNombre.setAttribute("id", `${pokemon.nombre}`);
  pokemonNombre.textContent = pokemon.nombre.capitalize();

  var pokemonInfo = document.createElement("button");
  pokemonInfo.setAttribute("class", "btn btn-info");
  pokemonInfo.setAttribute("data-bs-target", `#collapse${pokemon.nombre}`);
  pokemonInfo.setAttribute("type", "button");
  pokemonInfo.setAttribute("data-bs-toggle", "collapse");
  pokemonInfo.setAttribute("aria-expanded", false);
  pokemonInfo.setAttribute("aria-controls", `collapse${pokemon.nombre}`);
  pokemonInfo.setAttribute("onClick", `infoPokemon(${pokemon.nombre})`);

  pokemonInfo.textContent = "Info";

  var pokemonTypesInfo = document.createElement("div");
  pokemonTypesInfo.setAttribute("class", "collapse");
  pokemonTypesInfo.setAttribute("id", `collapse${pokemon.nombre}`);

  elementoPokemonBody.appendChild(pokemonNombre);
  elementoPokemonBody.appendChild(photoPokemon);
  elementoPokemonBody.appendChild(pokemonInfo);
  elementoPokemonBody.appendChild(pokemonTypesInfo);

  tarjetaPokemon.appendChild(elementoPokemonBody);
  tarjetaPokemon.appendChild(pokemonTypesInfo);
  divPokemones.appendChild(tarjetaPokemon);
};

let traerPokes = async () => {
  pokemones = await recolectarPokemones(page);
  pokemones.forEach((pokemon, index) => {
    if (index < page * 20 && index > page * 20 - 21) {
      crearTarjetas(pokemon);
    }
  });
};
traerPokes();

async function filtrarPokes() {
  let mainCard = document.getElementById("pokemones");
  if (mainCard.hasChildNodes) {
    mainCard.replaceChildren();
  }
  input = document.getElementById("myFilter");

  pokemones.forEach((pokemon) => {
    if (pokemon.nombre.includes(input.value)) {
      crearTarjetas(pokemon);
    }
  });
}

function infoPokemon(pokemonName) {
  var pokemonActual = pokemonName.textContent.replace("_", "-").toLowerCase();
  console.log(pokemonActual);
  let resistencias = [];
  var typesInfo = document.createElement("div");

  let thisCard = document.getElementById(
    `collapse${pokemonActual.replace("-", "_")}`
  );
  async function recolectarResistencia() {
    let tipos = [];
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonActual}`).then(
      (response) =>
        response.json().then((data) => {
          data.types.forEach((tipo) => {
            tipos.push(tipo.type.name);
          });
        })
    );
    return tipos;
  }
  let recolectarTipos = async () => {
    let tipos = await recolectarResistencia();
    tipos.forEach((tipo) => {
      resistencias.push(tipo);
    });
    typesInfo.setAttribute("class", "mb-3");
    typesInfo.textContent = `${resistencias}`;
    thisCard.appendChild(typesInfo);
  };

  if (!thisCard.hasChildNodes()) {
    recolectarTipos();
  }
}
