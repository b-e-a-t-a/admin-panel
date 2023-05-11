<template>
  <div :class="['DateField__field', className]">
    <label
      v-if="label"
      :class="{ required: required == true, err: error }"
      :for="name"
    >
      {{ label }}
    </label>
    <div class="DateField__input">
      <span v-if="error" class="DateField__fieldError">
        {{ errorMessage }}
      </span>
      <date-picker
        :value="value"
        :locale="locale"
        :upper-limit="upperLimit"
        :lower-limit="lowerLimit"
        :starting-view="startingView"
        :month-heading-format="monthHeadingFormat"
        :weekday-format="weekdayFormat"
        :input-format="inputFormat"
        :week-starts-on="weekStartsOn"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{ err: error }"
        :clearable="false"
        @input="$emit('update:value', $event)"
      />
      <slot />
    </div>
  </div>
</template>

<script>
import DatePicker from "vue3-datepicker";

export default {
  name: "DateField",
  components: { DatePicker },
  props: {
    name: String,
    label: String,
    placeholder: String,
    className: Object,
    required: Boolean,
    error: String,
    errorMessage: String,
    upperLimit: Date,
    lowerLimit: Date,
    startingView: String,
    monthHeadingFormat: String,
    weekdayFormat: String,
    inputFormat: String,
    locale: Object,
    format: [Object, String],
    weekStartsOn: Number,
    disabled: Boolean,
    value: [String, Function, Date, Number, Object]
  },
  emits: ["update:value"]
};
</script>

<style lang="sass">
@import '../DateField'
</style>
