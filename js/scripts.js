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
      let modalContainer = document.querySelector('#modal-container');
      let imageContainer = document.querySelector('#image-container');

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let nameElement = document.createElement('h1');
      nameElement.innerText = name;

      let imageElement = document.createElement('img');
      imageElement.src = image;

      let heightElement = document.createElement('p');
      heightElement.innerText = 'Height: ' + height;

      modal.appendChild(closeButtonElement);
      modal.appendChild(nameElement);
      modal.appendChild(imageElement);
      modal.appendChild(heightElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');

      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    }

    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');

      window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
      });

      modalContainer.innerHTML = '';
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