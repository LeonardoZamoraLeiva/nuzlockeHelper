let divPokemones = document.getElementById("pokemones");
let htmlPage = document.getElementById("pagination-numbers");
let page = 1;
var pokemones = [];

var damageRelations = [];

let allTypes = async () => {
  damageRelations = [];
  for (let i = 1; i < 19; i++) {
    await fetch(`https://pokeapi.co/api/v2/type/${i}`).then((response) => {
      response.json().then((data) => {
        let sufferHalf = [];
        let sufferDouble = [];
        let immune = [];
        data.damage_relations.half_damage_from.forEach((tipo) => {
          sufferHalf.push(tipo.name);
        });
        data.damage_relations.double_damage_from.forEach((tipo) => {
          sufferDouble.push(tipo.name);
        });
        data.damage_relations.no_damage_from.forEach((tipo) => {
          immune.push(tipo.name);
        });
        let thisType = {
          tipo: data.name,
          sufferHalf: sufferHalf,
          sufferDouble: sufferDouble,
          immune: immune,
        };
        damageRelations.push(thisType);
      });
    });
  }
  return damageRelations;
};

let takeAllTypes = async () => {
  damageRelations = await allTypes();
  // console.log(damageRelations);
};
takeAllTypes();

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
  pokemonTypesInfo.setAttribute("class", "collapse mb-3");
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

async function infoPokemon(pokemonName) {
  var pokemonActual = pokemonName.textContent.replace("_", "-").toLowerCase();
  var tiposElement = document.createElement("div");
  tiposElement.setAttribute("class", "mb-2 tipos");

  var sufreMuchoElement = document.createElement("div");
  var resisteMuchoElement = document.createElement("div");

  var sufreElement = document.createElement("div");
  var resisteElement = document.createElement("div");
  var immuneElement = document.createElement("div");

  var typesInfo = document.createElement("div");
  let thisCard = document.getElementById(
    `collapse${pokemonActual.replace("-", "_")}`
  );
  let tipos = await recolectarTipos(pokemonActual);

  console.log(damageRelations);
  let vulnerable = [];
  let resistente = [];
  let immune = [];

  damageRelations.forEach((tipo) => {
    tipos.forEach((esteTipo) => {
      if (esteTipo == tipo.tipo) {
        vulnerable.push(tipo.sufferDouble);
        resistente.push(tipo.sufferHalf);
        immune.push(tipo.immune);
      }
    });
  });
  vulnerable = vulnerable.flat(1);
  resistente = resistente.flat(1);
  immune = immune.flat(1);
  console.log(vulnerable);
  console.log(resistente);
  console.log(immune);

  sufreElement.textContent = `Sufre x2 = ${vulnerable}`;
  resisteElement.textContent = `Sufre 1/2 = ${resistente}`;
  immuneElement.textContent = `Inmune = ${immune}`;
  if (tipos.length > 1) {
    tiposElement.textContent = `${tipos[0].capitalize()} - ${tipos[1].capitalize()}`;
  } else {
    tiposElement.textContent = `${tipos[0].capitalize()}`;
  }

  typesInfo.setAttribute("class", "my-3");
  if (thisCard.hasChildNodes()) {
    thisCard.removeChild();
    thisCard.appendChild(tiposElement);
    if (vulnerable.length > 0) {
      thisCard.appendChild(sufreElement);
    }
    if (resistente.length > 0) {
      thisCard.appendChild(resisteElement);
    }
    if (immune.length > 0) {
      thisCard.appendChild(immuneElement);
    }
  } else {
    thisCard.appendChild(tiposElement);
    if (vulnerable.length > 0) {
      thisCard.appendChild(sufreElement);
    }
    if (resistente.length > 0) {
      thisCard.appendChild(resisteElement);
    }
    if (immune.length > 0) {
      thisCard.appendChild(immuneElement);
    }
  }
}

let recolectarTipos = async (pokemonActual) => {
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
};
