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
        :lang="lang"
        :type="type"
        :format="format"
        :placeholder="placeholder"
        :minute-step="minuteStep"
        :disabled-date="disabledDate"
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/pl";

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
    format: [Object, String],
    type: [String, Function, Date, Number, Object],
    minuteStep: Number,
    disabled: Boolean,
    disabledDate: [String, Function, Date, Number, Object],
    value: [String, Function, Date, Number, Object]
  },
  emits: ["update:value"],
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        }
      }
    };
  }
};
</script>

<style lang="sass">
@import '../DateField'
</style>
