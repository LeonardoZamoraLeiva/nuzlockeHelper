let damageRelations = [
  {
    tipo: "fighting",
    sufferHalf: ["rock", "bug", "dark"],
    sufferDouble: ["flying", "psychic", "fairy"],
    immune: [],
  },
  {
    tipo: "steel",
    sufferHalf: [
      "normal",
      "flying",
      "rock",
      "bug",
      "steel",
      "grass",
      "psychic",
      "ice",
      "dragon",
      "fairy",
    ],
    sufferDouble: ["fighting", "ground", "fire"],
    immune: ["poison"],
  },
  {
    tipo: "rock",
    sufferHalf: ["normal", "flying", "poison", "fire"],
    sufferDouble: ["fighting", "ground", "steel", "water", "grass"],
    immune: [],
  },
  {
    tipo: "bug",
    sufferHalf: ["fighting", "ground", "grass"],
    sufferDouble: ["flying", "rock", "fire"],
    immune: [],
  },
  {
    tipo: "ground",
    sufferHalf: ["poison", "rock"],
    sufferDouble: ["water", "grass", "ice"],
    immune: ["electric"],
  },
  {
    tipo: "flying",
    sufferHalf: ["fighting", "bug", "grass"],
    sufferDouble: ["rock", "electric", "ice"],
    immune: ["ground"],
  },
  {
    tipo: "psychic",
    sufferHalf: ["fighting", "psychic"],
    sufferDouble: ["bug", "ghost", "dark"],
    immune: [],
  },
  {
    tipo: "fairy",
    sufferHalf: ["fighting", "bug", "dark"],
    sufferDouble: ["poison", "steel"],
    immune: ["dragon"],
  },
  {
    tipo: "ghost",
    sufferHalf: ["poison", "bug"],
    sufferDouble: ["ghost", "dark"],
    immune: ["normal", "fighting"],
  },
  {
    tipo: "dragon",
    sufferHalf: ["fire", "water", "grass", "electric"],
    sufferDouble: ["ice", "dragon", "fairy"],
    immune: [],
  },
  {
    tipo: "normal",
    sufferHalf: [],
    sufferDouble: ["fighting"],
    immune: ["ghost"],
  },
  {
    tipo: "poison",
    sufferHalf: ["fighting", "poison", "bug", "grass", "fairy"],
    sufferDouble: ["ground", "psychic"],
    immune: [],
  },
  {
    tipo: "ice",
    sufferHalf: ["ice"],
    sufferDouble: ["fighting", "rock", "steel", "fire"],
    immune: [],
  },
  {
    tipo: "electric",
    sufferHalf: ["flying", "steel", "electric"],
    sufferDouble: ["ground"],
    immune: [],
  },
  {
    tipo: "dark",
    sufferHalf: ["ghost", "dark"],
    sufferDouble: ["fighting", "bug", "fairy"],
    immune: ["psychic"],
  },
  {
    tipo: "grass",
    sufferHalf: ["ground", "water", "grass", "electric"],
    sufferDouble: ["flying", "poison", "bug", "fire", "ice"],
    immune: [],
  },
  {
    tipo: "water",
    sufferHalf: ["steel", "fire", "water", "ice"],
    sufferDouble: ["grass", "electric"],
    immune: [],
  },
  {
    tipo: "fire",
    sufferHalf: ["bug", "steel", "fire", "grass", "ice", "fairy"],
    sufferDouble: ["ground", "rock", "water"],
    immune: [],
  },
];

let returDamageRelations = () => {
  return damageRelations;
};
