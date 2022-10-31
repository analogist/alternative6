const { createApp } = Vue

createApp({
  data() {
    return {
      compplandata: null,
      compplanidx: null,
      filterstr: "",
      compplanfiltered: null
    };
  },
  created() {
    fetch('compplan-searchable-comments.json')
      .then(response => response.json())
      .then(data => (this.compplandata = data))
    fetch('compplan-search-index.json')
      .then(response => response.json())
      .then(data => (
        this.compplanidx = lunr.Index.load(data)
        ))
  },
  methods: {
    filterideas() {
      if (this.filterstr == "") {
        this.compplanfiltered = null;
        return;
      }
      var outputstruct = this.compplanidx.search(this.filterstr);
      var outputarr = outputstruct.map(el => el.ref);
      this.compplanfiltered = this.compplandata.filter(el => outputarr.includes(el.slug));
    }
  },
  computed: {
    compplandisplay() {
      return this.compplanfiltered == null ? this.compplandata : this.compplanfiltered
    },
    numfiltered() {
      return this.compplanfiltered == null ? this.compplandata.length : this.compplanfiltered.length;
    }
  }
}).mount('#exploreapp')