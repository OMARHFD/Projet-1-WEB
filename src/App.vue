<template>
  <div id="app">
    <header>
      <img src="/images/logo-les-bonnes-pieces.png" alt="LOGO">
      <h1>Les Bonnes Pièces</h1>
    </header>

    <main>
      <!-- Menu de recherche -->
      <section class="filtres">
        <h3>Filtres</h3>
        <input v-model="searchTerm" placeholder="Rechercher une pièce...">
        <!-- Filtrer par catégorie -->
        <select v-model="selectedCategory">
          <option v-for="categorie in categories" :key="categorie" :value="categorie">
            {{ categorie }}
          </option>
        </select>
        <!-- Filtrer par disponibilité -->
        <label>
          Disponible uniquement
          <input type="checkbox" v-model="showAvailable" />
        </label>
      </section>

      <!-- Fiches produits -->
      <section class="fiches">
        <PieceAuto 
          v-for="piece in filteredPieces" 
          :key="piece.id" 
          :piece="piece"
          @add-to-cart="addToCart"
        />
      </section>

      <section class="panier">
        <h3>Mon Panier</h3>
        <ul>
          <li v-for="item in panier" :key="item.id">
            {{ item.nom }} - {{ item.prix }} €
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import PieceAuto from './components/PieceAuto.vue'

export default {
  components: {
    PieceAuto
  },
  data() {
    return {
      pieces: [],
      searchTerm: "",
      selectedCategory: "",
      showAvailable: false,
      panier: [],
    }
  },
  computed: {
  categories() {
    return [...new Set(this.pieces.map(piece => piece.categorie))];
  },
  filteredPieces() {
    return this.pieces.filter(piece => {
      const matchesCategory = this.selectedCategory ? piece.categorie === this.selectedCategory : true;
      const matchesSearch = piece.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesAvailability = this.showAvailable ? piece.Disponible === true : true; // Use "Disponible" here
      return matchesCategory && matchesSearch && matchesAvailability;
    });
  }
},

  methods: {
    addToCart(piece) {
      this.panier.push(piece);
    }
  },
  async mounted() {
    const response = await fetch("/pieces-autos.json");
    this.pieces = await response.json();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body {
  max-width: 1200px;
  margin: auto;
  padding: 16px;
  font-family: 'Montserrat', sans-serif;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
  background-color: #7451eb;
  text-align: center;
  color: white;
}

header img {
  height: 60px;
  margin-left: 1rem;
}

header h1 {
  flex-grow: 1;
}

main {
  display: flex;
  flex-direction: row;
}

.filtres {
  border-radius: 4px;
  box-shadow: 0px 0px 4px gray;
  margin: 8px;
  padding: 8px;
  min-width: 300px;
  min-height: 400px;
}

.filtres h3 {
  text-align: center;
}

.fiches {
  flex: 1;
  margin: 8px;
}

.fiches img {
  max-width: 200px;
}

.fiches p {
  margin-top: 4px;
  margin-bottom: 4px;
}

.panier {
  margin-top: 20px;
}

.panier ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
