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
      .then(data => (this.compplanidx = lunr.Index.load(data)))
  },
  methods: {
    filterideas() {
      if (this.filterstr == "") {
        this.compplanfiltered = null;
        return;
      }
      var searchoutput = this.compplanidx.search(this.filterstr);
      var outputmap = new Map(searchoutput.map(obj => [obj.ref, obj.score]));
      this.compplanfiltered = this.compplandata
        .filter(el => (outputmap.has(el.slug)))
        .sort((a, b) => (outputmap.get(b.slug) - outputmap.get(a.slug)));
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