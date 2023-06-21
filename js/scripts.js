let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: 'grass, poison'},
    {name: 'Charmander', height: 0.6, types: 'fire'},
    {name: 'Squirtle', height: 0.5, types: 'water'}
];

for (let x = 0; x < pokemonList.length; x++) {
    let result = pokemonList[x].height > 0.5 ? "Wow, that's big!" : "";
    document.write(pokemonList[x].name + " (height: " + pokemonList[x].height + ") " + result + "<br>");
}

