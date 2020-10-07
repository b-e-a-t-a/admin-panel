<template>
  <div :class="['SelectField', className, { disabled }]">
    <label v-if="label" :class="{ required }" :for="name">
      {{ label }}
    </label>
    <div class="SelectField__input">
      <span v-if="error" class="SelectField__fieldError">
        {{ errorMessage }}
      </span>
      <multiselect
        :value="visibleValue"
        :name="name"
        :placeholder="placeholder"
        :options="options"
        :show-labels="showLabels"
        :class="[
          'SelectField__select',
          { 'has-value': value && value != '' },
          { err: error }
        ]"
        :track-by="valueName"
        :label="labelName"
        :disabled="disabled"
        :multiple="multiple"
        :close-on-select="closeOnSelect"
        select-label=""
        deselect-label=""
        :block-keys="['Enter']"
        selected-label="Selected"
        @input="$emit('update:visibleValue', $event)"
      >
      </multiselect>
    </div>
    <div class="SelectField__info">
      <slot />
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "SelectField",
  components: { Multiselect },
  props: [
    'fieldType',
    'options',
    'name',
    'label',
    'disabled',
    'placeholder',
    'className',
    'required',
    'type',
    'error',
    'errorMessage',
    'value',
    'valueName',
    'labelName',
    'showLabels',
    'parseVisibleValue',
    'multiple',
    'closeOnSelect',
  ],
  computed: {
    visibleValue() {
      const val = this.options.find(
        o => this.value == (this.valueName ? o[this.valueName] : o)
      );

      if (this.parseVisibleValue) return this.parseVisibleValue(val);

      return val;
    }
  },
  methods: {
    onChange(option) {
      this.$emit(
        "update:visibleValue",
        this.valueName && option ? option[this.valueName] : option
      );
    }
  }
};
</script>

<style lang="sass">
@import '../SelectField'
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css" />
