<template>
  <div class="Search">
    <span class="Search-icon">
      <i class="fas fa-search"></i>
    </span>
    <input
      :id="
        'id' +
          Math.random()
            .toString(16)
            .slice(2)
      "
      class="Search-text p-s"
      maxlen
      :placeholder="shortenText(placeholder, maxlen)"
      :value="searchText"
      @input="$emit('update:searchText', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    placeholder: String,
    maxlen: Number,
    searchText: String
  },
  emits: ["update:searchText"],
  methods: {
    shortenText(text, maxLen = 15) {
      if (!text) return "";
      if (text.length > maxLen) {
        const parts = text.slice(0, maxLen - 3 + 1).split(" ");
        return parts.reduce((res, p) => {
          if (
            res
              .slice()
              .concat(" ")
              .concat(p).length >
            maxLen - 3
          )
            return "".concat(res).concat("...");
          return res
            .slice()
            .concat(" ")
            .concat(p);
        });
      }
      return text;
    }
  }
};
</script>

<style lang="sass" scoped>
@import './Search'
</style>
