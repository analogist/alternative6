const { createApp } = Vue

createApp({
  data() {
    return {
      compplandata: [],
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
      // check for no filtering
      if (this.filterstr == "") {
        this.compplanfiltered = null;
        return;
      }

      let searchstr = this.filterstr;

      // check for filtering quoted literals
      const quotedRegex = /\"((?:\w+ ?)+)\"/g
      let quotedLiterals = Array.from(searchstr.matchAll(quotedRegex), obj => obj[1]);
      if (quotedLiterals.length > 0) {
        let quotedReplaceStr = quotedLiterals.reduce(
          (quoted, next) => quoted + next.replace(/\b(\w+)/g, '$1') + ' ', ''
          );
        searchstr = quotedReplaceStr + searchstr.replace(quotedRegex, '');
      }

      var searchoutput = this.compplanidx.search(searchstr);
      var outputmap = new Map(searchoutput.map(obj => [obj.ref, obj.score]));
      this.compplanfiltered = this.compplandata
        .filter(el => (outputmap.has(el.slug)))
        .sort((a, b) => (outputmap.get(b.slug) - outputmap.get(a.slug)));

      // do final quoted literal filtering if any
      if (quotedLiterals.length > 0) {
        this.compplanfiltered = this.compplanfiltered
          .filter(el => {
            for (const quotedLiteral of quotedLiterals) {
              console.log(quotedLiteral)
              let reQuoted = new RegExp('\\b'+quotedLiteral, 'i');
              if( (el.title == null || el.title.search(reQuoted) == -1) && (el.body.search(reQuoted) == -1) ) {
                return false;
              }
            }
            return true;
          });
      }
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