const { createApp } = Vue

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

createApp({
  data() {
    return {
      compplandata: null
    };
  },
  created() {
    fetch('compplan-searchable-comments.json')
      .then(response => response.json())
      .then(data => (this.compplandata = data))
  }
}).mount('#exploreapp')