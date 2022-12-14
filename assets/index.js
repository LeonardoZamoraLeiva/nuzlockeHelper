let divPokemones = document.getElementById("pokemones");
let htmlPage = document.getElementById("pagination-numbers");
let dataDeploy = document.getElementById("dataDeploy");
var parentContainer = document.getElementById("parentContainer");
var hermanoContainer = document.getElementById("hermanoContainer");
let page = 1;
var pokemones = [];

var damageRelations = [];

let allTypes = async () => {
  // damageRelations = [];
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
  if (damageRelations.length == 0) {
    damageRelations = await allTypes();
    // console.log(damageRelations);
  }
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

function recolectarPokemones() {
  return (myPromise = new Promise((resolve) => {
    let pokemones = [];
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1200`).then((response) =>
      response.json().then((data) => {
        data.results.forEach((pokemon) => {
          let name = pokemon.name.replace("-", " ");
          let urllist = pokemon.url.split("/");
          let id = pokemon.url.split("pokemon/")[1].replace("/", "");

          let urlphoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${urllist[6]}.png`;

          pokemones.push({ nombre: name, foto: urlphoto, id: id });

          if (pokemones.length == 1100) {
            resolve(pokemones);
            return pokemones;
          }
        });
      })
    );
  }));
}

function makeUL(array) {
  var list = document.createElement("ul");
  list.setAttribute("class", "efectos");
  for (var i = 0; i < array.length; i++) {
    var imgTipo = document.createElement("img");
    imgTipo.setAttribute("src", `assets/icons_v2/${array[i]}.png`);
    imgTipo.setAttribute("class", `${array[i]} icon`);
    // Create the list item:
    var item = document.createElement("li");
    // item.setAttribute("class", "justify-content-between");

    // Set its contents:
    item.appendChild(imgTipo);
    // item.appendChild(document.createTextNode(array[i].capitalize()));

    // Add it to the list:
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

let crearTarjetas = (pokemon) => {
  // let nombre = pokemon.nombre;
  // if (pokemon.nombre.includes("-")) {
  //   pokemon.nombre = pokemon.nombre.replace("-", "_");
  // }
  var tarjetaPokemon = document.createElement("div");
  tarjetaPokemon.setAttribute("class", "card text-center ");
  tarjetaPokemon.setAttribute(
    "id",
    `${pokemon.nombre.replace(" ", "_") + pokemon.nombre.replace(" ", "_")}`
  );
  tarjetaPokemon.setAttribute("style", "width:15rem");
  var photoPokemon = document.createElement("img");
  photoPokemon.setAttribute("class", "card-img-top");
  photoPokemon.setAttribute("src", pokemon.foto);

  var elementoPokemonBody = document.createElement("div");
  elementoPokemonBody.setAttribute("class", "card-body");

  var pokemonNombre = document.createElement("p");
  pokemonNombre.setAttribute("class", "card-header card-title tituloPokemon");
  pokemonNombre.setAttribute("id", `${pokemon.nombre.replace(" ", "_")}`);

  // pokemonNombre.textContent = `id`;
  pokemonNombre.textContent = `${pokemon.nombre.capitalize()}`;

  var botonCerrar = document.createElement("i");
  botonCerrar.setAttribute(
    "class",
    "fa-solid fa-circle-xmark hidden iconStyle"
  );
  botonCerrar.setAttribute("id", `${pokemon.nombre.replace(" ", "_")}cerrar`);
  botonCerrar.setAttribute(
    "onClick",
    `cerrarTarjeta(${pokemon.nombre.replace(" ", "_")})`
  );

  var pokemonInfo = document.createElement("a");
  pokemonInfo.setAttribute("class", "btn btn-info");
  pokemonInfo.setAttribute("href", "#dataDeploy");

  // pokemonInfo.setAttribute("data-bs-target", `#collapse${pokemon.nombre}`);
  // pokemonInfo.setAttribute("type", "button");
  // pokemonInfo.setAttribute("data-bs-toggle", "collapse");
  // pokemonInfo.setAttribute("aria-expanded", false);
  // pokemonInfo.setAttribute("aria-controls", `collapse${pokemon.nombre}`);
  pokemonInfo.setAttribute(
    "onClick",
    `infoPokemon(${pokemon.nombre.replace(" ", "_")})`
  );

  pokemonInfo.textContent = "Info";

  var pokemonTypesInfo = document.createElement("div");
  // pokemonTypesInfo.setAttribute("class", "collapse mb-3");
  // pokemonTypesInfo.setAttribute("id", `collapse${pokemon.nombre}`);

  // elementoPokemonBody.appendChild(idPokemon);
  elementoPokemonBody.appendChild(pokemonNombre);
  elementoPokemonBody.appendChild(botonCerrar);
  elementoPokemonBody.appendChild(photoPokemon);
  elementoPokemonBody.appendChild(pokemonInfo);
  parentContainer.appendChild(pokemonTypesInfo);

  tarjetaPokemon.appendChild(elementoPokemonBody);
  tarjetaPokemon.appendChild(pokemonTypesInfo);
  divPokemones.appendChild(tarjetaPokemon);
};

let traerPokes = async () => {
  if (pokemones.length == 0) {
    pokemones = await recolectarPokemones();
    pokemones.forEach((pokemon, index) => {
      if (index < page * 20 && index > page * 20 - 21) {
        crearTarjetas(pokemon);
      }
    });
  } else {
    pokemones.forEach((pokemon, index) => {
      if (index < page * 20 && index > page * 20 - 21) {
        crearTarjetas(pokemon);
      }
    });
  }
};
// traerPokes();

async function filtrarPokes() {
  let mainCard = document.getElementById("pokemones");
  if (mainCard.hasChildNodes) {
    mainCard.replaceChildren();
  }
  input = document.getElementById("myFilter");
  pokemones.forEach((pokemon) => {
    if (pokemon.nombre.includes(input.value.toLowerCase())) {
      parentContainer.replaceChildren("");
      hermanoContainer.replaceChildren("");
      crearTarjetas(pokemon);
    }
  });
}

async function infoPokemon(pokemonName) {
  // console.log(pokemonName);
  var pokemonActual = pokemonName.textContent.replace(" ", "_").toLowerCase();
  // .replace("_", "-").toLowerCase();

  var tarjetaActual = document.getElementById(pokemonActual + pokemonActual);
  // .replace("-", "_") + pokemonActual.replace("-", "_")

  var tiposElement = document.createElement("div");
  tiposElement.setAttribute("class", "mb-2 tipos");

  var sufreMuchoElement = document.createElement("div");
  sufreMuchoElement.setAttribute("id", "resistencias");

  var resisteMuchoElement = document.createElement("div");
  resisteMuchoElement.setAttribute("id", "resistencias");

  var sufreElement = document.createElement("div");
  sufreElement.setAttribute("id", "resistencias");
  var resisteElement = document.createElement("div");
  resisteElement.setAttribute("id", "resistencias");
  var immuneElement = document.createElement("div");
  immuneElement.setAttribute("id", "resistencias");

  var typesInfo = document.createElement("div");
  let tipos = await recolectarTipos(pokemonActual.replace(" ", "-"));

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
  vulnerable = vulnerable.flat(1).sort();
  resistente = resistente.flat(1).sort();
  immune = immune.flat(1).sort();
  var debilidad_maxima = [];
  var resistencia_maxima;

  let findDuplicates = (arr) =>
    arr.filter((item, index) => arr.indexOf(item) != index);

  if (findDuplicates(vulnerable)) {
    var duplicados = findDuplicates(vulnerable);
    debilidad_maxima = [...new Set(findDuplicates(vulnerable))];

    for (let i = 0; i < duplicados.length; i++) {
      vulnerable = vulnerable.filter((item) => item != duplicados[i]);
    }
  }

  if (findDuplicates(resistente)) {
    var duplicados = findDuplicates(resistente);
    // console.log(duplicados);
    resistencia_maxima = [...new Set(findDuplicates(resistente))];
    for (let i = 0; i < duplicados.length; i++) {
      resistente = resistente.filter((item) => item != duplicados[i]);
    }
  }

  // const filteredArray = resistente.filter((value) =>
  //   vulnerable.includes(value)
  // );

  let filterEffects = (arr1, arr2) => {
    const filteredArray = arr1.filter((value) => arr2.includes(value));
    if (arr1 == immune) {
    } else {
      for (var i = 0; i < filteredArray.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
          if (arr1[j] === filteredArray[i]) {
            arr1.splice(j, 1);
          }
        }
      }
    }
    for (var i = 0; i < filteredArray.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        if (arr2[j] === filteredArray[i]) {
          arr2.splice(j, 1);
        }
      }
    }
  };

  filterEffects(resistente, vulnerable);
  filterEffects(immune, vulnerable);

  // console.log(filteredArray);
  // console.log(resistente);
  // console.log(resistencia_maxima);
  // console.log(vulnerable);
  // console.log(debilidad_maxima);

  // var sufreMuchoElement = document.createElement("div");
  // var resisteMuchoElement

  if (debilidad_maxima.length > 0) {
    let sufreMucho = document.createElement("h1");
    sufreMucho.setAttribute("class", "efectosTitle supperEffectivex2");
    let sufreMuchoLogo = document.createElement("img");
    sufreMuchoLogo.setAttribute("src", "assets/icons_v2/superefectivex4.png");
    sufreMuchoLogo.setAttribute("class", "effectiveLogo my-2");
    sufreMuchoElement.appendChild(sufreMuchoLogo);

    sufreMuchoElement.appendChild(sufreMucho);
    sufreMuchoElement.appendChild(makeUL(debilidad_maxima));
  }

  if (vulnerable.length > 0) {
    let sufrePar = document.createElement("h1");
    sufrePar.setAttribute("class", "efectosTitle supperEffective");
    let sufreLogo = document.createElement("img");
    sufreLogo.setAttribute("src", "assets/icons_v2/superefectivex2.png");
    sufreLogo.setAttribute("class", "effectiveLogo my-2");
    sufreElement.appendChild(sufreLogo);

    sufreElement.appendChild(sufrePar);
    sufreElement.appendChild(makeUL(vulnerable));
  }

  if (resistente.length > 0) {
    let resistePar = document.createElement("h1");
    resistePar.setAttribute("class", "efectosTitle notVeryEffective my-2");
    // resistePar.textContent = "Poco efectivo (x2)";
    let resisteLogo = document.createElement("img");
    resisteLogo.setAttribute("src", "assets/icons_v2/notveryefectivemitad.png");
    resisteLogo.setAttribute("class", "effectiveLogo my-2");

    resisteElement.appendChild(resisteLogo);
    resisteElement.appendChild(resistePar);
    resisteElement.appendChild(makeUL(resistente));
  }
  if (resistencia_maxima.length > 0) {
    let resisteMucho = document.createElement("h1");
    resisteMucho.setAttribute("class", "efectosTitle notVeryEffectivex2 my-2");
    let resisteMuchoLogo = document.createElement("img");
    resisteMuchoLogo.setAttribute(
      "src",
      "assets/icons_v2/notveryefectivecuarto.png"
    );
    resisteMuchoLogo.setAttribute("class", "effectiveLogo my-2");
    resisteMuchoElement.appendChild(resisteMuchoLogo);
    resisteMuchoElement.appendChild(resisteMucho);
    resisteMuchoElement.appendChild(makeUL(resistencia_maxima));
  }

  if (immune.length > 0) {
    let immunePar = document.createElement("h1");
    immunePar.setAttribute("class", "efectosTitle");
    let immuneLogo = document.createElement("img");
    immuneLogo.setAttribute("src", "assets/icons_v2/immune.png");
    immuneLogo.setAttribute("class", "effectiveLogo my-2");
    immuneElement.appendChild(immuneLogo);
    immuneElement.appendChild(immunePar);
    immuneElement.appendChild(makeUL(immune));
  }

  if (tipos.length > 1) {
    tiposElement.textContent = `${tipos[0].capitalize()} - ${tipos[1].capitalize()}`;
  } else {
    tiposElement.textContent = `${tipos[0].capitalize()}`;
  }

  typesInfo.setAttribute("class", "my-3 text-center");

  let botonCerrar = document.getElementById(
    `${pokemonActual.replace(" ", "_")}cerrar`
  );
  botonCerrar.classList.remove("hidden");

  if (parentContainer.hasChildNodes()) {
    // cerrarTarjeta(pokemonName);
    parentContainer.replaceChildren("");
    hermanoContainer.replaceChildren("");
    // tarjetaActual.classList.add("col-12");
    tarjetaActual.removeAttribute("style");

    parentContainer.appendChild(tarjetaActual);
    hermanoContainer.appendChild(tiposElement);
    if (debilidad_maxima.length > 0) {
      hermanoContainer.appendChild(sufreMuchoElement);
    }
    if (vulnerable.length > 0) {
      hermanoContainer.appendChild(sufreElement);
    }
    if (resistente.length > 0) {
      hermanoContainer.appendChild(resisteElement);
    }
    if (resistencia_maxima.length > 0) {
      hermanoContainer.appendChild(resisteMuchoElement);
    }
    if (immune.length > 0) {
      hermanoContainer.appendChild(immuneElement);
    }
  } else {
    // tarjetaActual.classList.add("col-12");
    tarjetaActual.removeAttribute("style");
    parentContainer.appendChild(tarjetaActual);
    hermanoContainer.appendChild(tiposElement);
    if (debilidad_maxima.length > 0) {
      hermanoContainer.appendChild(sufreMuchoElement);
    }
    if (vulnerable.length > 0) {
      hermanoContainer.appendChild(sufreElement);
    }
    if (resistente.length > 0) {
      hermanoContainer.appendChild(resisteElement);
    }
    if (resistencia_maxima.length > 0) {
      hermanoContainer.appendChild(resisteMuchoElement);
    }
    if (immune.length > 0) {
      hermanoContainer.appendChild(immuneElement);
    }
  }
}

let recolectarTipos = async (pokemonActual) => {
  let tipos = [];
  await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonActual.replace("_", "-")}`
  ).then((response) =>
    response.json().then((data) => {
      data.types.forEach((tipo) => {
        tipos.push(tipo.type.name);
      });
    })
  );
  return tipos;
};

let cerrarTarjeta = async (pokemonName) => {
  console.log(pokemonName);
  var pokemonActual = pokemonName.textContent.toLowerCase();
  let tarjetaCerrada = document.getElementById(
    `${pokemonActual.replace(" ", "_")}cerrar`
  );
  parentContainer.replaceChildren("");
  hermanoContainer.replaceChildren("");

  tarjetaCerrada.classList.add("hidden");
  let input = document.getElementById("myFilter");
  if (input.value.length <= 0) {
    divPokemones.replaceChildren("");
    traerPokes();
  } else {
    filtrarPokes();
  }
};
