let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: 'grass/poison'},
        {name: 'Charmander', height: 0.6, types: 'fire'},
        {name: 'Squirtle', height: 0.5, types: 'water'}
    ];

     return {
        add: function(pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function() {
            return pokemonList;
        }
     };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + " " + pokemon.height + " " + pokemon.types + "</br>");
});