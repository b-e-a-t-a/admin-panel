<template>
  <div
    :class="[
      'TextField__field',
      className,
      { textarea: fieldType == 'textarea' }
    ]"
  >
    <label
      v-if="label"
      :class="{ required: required == true, err: error }"
      :for="name"
    >
      {{ label }}
    </label>
    <div class="TextField__input">
      <span v-if="error" class="TextField__fieldError">
        {{ errorMessage }}
      </span>
      <textarea
        v-if="fieldType === 'textarea'"
        :name="name"
        :placeholder="placeholder"
        :class="[
          { 'has-value': value && value != '' },
          { err: error },
          { noLabel: !label },
          { disabled }
        ]"
        :value="value"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        @keyup="$emit('keyup', $event)"
      />
      <input
        v-else
        :name="name"
        :type="type || 'text'"
        :placeholder="placeholder"
        :class="[
          { 'has-value': value && value != '' },
          { err: error },
          { noLabel: !label },
          { disabled }
        ]"
        :value="value"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        :pattern="pattern"
        autocomplete="off"
        @input="$emit('update:value', $event.target.value)"
        @keyup="$emit('keyup', $event)"
      />
    </div>
    <div class="TextField__info">
      <slot />
      <span>{{ info }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    className: Object,
    fieldType: String,
    required: Boolean,
    min: Number,
    max: Number,
    name: String,
    label: String,
    placeholder: String,
    disabled: Boolean,
    type: String,
    info: String,
    error: String,
    errorMessage: String,
    value: Function,
    step: String,
    pattern: String
  }
};
</script>

<style lang="sass">
@import './TextField'
</style>
