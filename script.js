const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const pokemonName=document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack")
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const apiUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

async function fetchPokemon(query) {
    try {
        const response = await fetch(`${apiUrl}/${query.toLowerCase()}`);
        if (!response.ok) {
            alert("Pokémon not found");
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        alert("Error fetching Pokémon data");
        return null;
    }
}
const displayPokemonData = (data) => {
pokemonName.textContent = `${data.name}`;
pokemonId.textContent = ` #${data.id}`;
weight.textContent = `WEIGHT: ${data.weight}`;
height.textContent = `HEIGHT: ${data.height}`;
const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

const typesContainer = document.getElementById('types');
typesContainer.textContent = ' ';
data.types.forEach(typeInfo => {
    const typeElement = document.createElement('span');
    typeElement.textContent = typeInfo.type.name.toUpperCase();

    typeElement.style.backgroundColor = typeColors[typeInfo.type.name] || '#777';
    typeElement.style.color = '#fff'; 
    typeElement.style.padding = '5px';
    typeElement.style.margin = '3px';
    typeElement.style.borderRadius = '5px';

    typesContainer.appendChild(typeElement);
});
    const stats = data.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});
hp.textContent = `${stats.hp}`;
attack.textContent = `${stats.attack}`;
defense.textContent = `${stats.defense}`
specialAttack.textContent = `${stats['special-attack']}`;
specialDefense.textContent = `${stats['special-defense']}`;
speed.textContent = `${stats.speed}`;
const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = ''; 
    const sprite = document.createElement('img');
    sprite.id = 'sprite';
    sprite.src = data.sprites.front_default;
    sprite.alt = `${data.name} sprite`;
    spriteContainer.appendChild(sprite);
}
document.getElementById('search-button').addEventListener('click', async () => {
    
    const query = document.getElementById('search-input').value.trim();
    
    
    if (query) {
        const pokemonData = await fetchPokemon(query);
        if (pokemonData) {
            displayPokemonData(pokemonData);
        }
    } else {
        alert('Please enter a Pokémon name or ID');
    }
});