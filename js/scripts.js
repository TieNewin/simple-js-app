let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: 'grass/poison'},
        {name: 'Charmander', height: 0.6, types: 'fire'},
        {name: 'Squirtle', height: 0.5, types: 'water'}
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let list = document.querySelector('.list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        list.appendChild(listItem);
    }

    function showDetails(pokemon) {
        console.log(pokemon.name + ' ' + pokemon.height + ' ' + pokemon.types)
    }

     return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
     };
})();

pokemonRepository.getAll().forEach( function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});