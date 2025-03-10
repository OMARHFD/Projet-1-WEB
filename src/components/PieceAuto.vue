<template>
    <div class="piece">
      <img :src="`/${piece.Image}`" alt="Image de la pièce" />
      <p>{{ piece.nom }}</p>
      <p>{{ piece.prix }} €</p>
      <button @click="addToCart">Ajouter au panier</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      piece: Object
    },
    methods: {
      addToCart() {
        this.$emit("add-to-cart", this.piece);
      }
    }
  }
  </script>
  
  <style scoped>
  .piece {
    border: 1px solid #ddd;
    margin: 10px;
    padding: 10px;
    text-align: center;
  }
  
  .piece img {
    max-width: 100%;
    height: auto;
  }
  
  button {
    background-color: #7451eb;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #6a40e7;
  }
  </style>
  