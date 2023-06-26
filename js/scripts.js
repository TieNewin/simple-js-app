let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let list = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.innerText = pokemon.name;
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#myModal');

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        list.appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showModal(name, height, image) {
      let modal = document.querySelector('.modal-content');
      modal.classList.add('modal');
      modal.innerHTML = '';

      let modalContainer = document.querySelector('.modal-dialog');
      let imageContainer = document.createElement('div');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.setAttribute('data-dismiss', 'modal');
      closeButtonElement.setAttribute('aria-label', 'Close');

      let nameElement = document.createElement('h1');
      nameElement.innerText = name;

      let imageElement = document.createElement('img');
      imageElement.src = image;
      imageContainer.appendChild(imageElement);

      let heightElement = document.createElement('p');
      heightElement.innerText = 'Height: ' + height;

      modal.appendChild(closeButtonElement);
      modal.appendChild(nameElement);
      modal.appendChild(imageContainer);
      modal.appendChild(heightElement);
      modalContainer.appendChild(modal);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });