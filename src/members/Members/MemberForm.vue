<template>
  <form class="Members__form" @submit.prevent="submitForm()">
    <div>
      <text-field
        v-model:value="firstName"
        :name="firstName"
        label="Name *"
        :class="{ error: error }"
      />
      <text-field
        v-model:value="lastName"
        :name="lastName"
        label="LastName *"
        :class="{ error: error }"
      />
      <div class="Members__customSelect">
        <label for="gender-select">Gender*</label>
        <select id="gender-select" name="gender" v-model="gender">
          <option v-for="(option, key) in options" :key="'option-' + key">
            {{ option }}
          </option>
        </select>
      </div>
      <text-field
        v-model:value.number="age"
        :name="age"
        label="Age*"
        type="number"
        :min="18"
        :max="120"
        :class="{ error: error }"
      />

      <!-- <date-field
        v-model:value="birthDate"
        name="birthDate"
        format="DD-MM-YYYY"
        label="Date of birth"
        placeholder="MM-YYYY"
        class="datepicker block"
        :class="{ error: error }"
      /> -->
      <!-- <select-field
        v-model:visibleValuee="gender"
        label="Gender *"
        placeholder="Select"
        :class="{ error: error }"
        :options="options"
        :show-labels="false"
      /> -->
      <div class="Members__customSelect">
        <label for="country-select">Nationalization code *</label>
        <select id="country-select" name="country" v-model="country">
          <option
            v-for="(option, key) in nationalidades"
            :key="'option-' + key"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <text-field
        v-model:value="email"
        :name="email"
        label="Email *"
        :error="isFieldFilled(email) && !emailValid(email)"
        errorMessage="Invalid email"
        :class="{
          error: error || (isFieldFilled(email) && !emailValid(email))
        }"
      />
      <text-field
        v-model:value.number="phone"
        :name="phone"
        label="Phone"
        type="number"
        placeholder="eg.111111111"
        :min="0"
        :error="isFieldFilled(phone) && !phoneValid(phone)"
        :class="{
          error: error || (isFieldFilled(phone) && !phoneValid(phone))
        }"
        errorMessage="Invalid phone"
      />
      <text-field
        v-model:value="photo"
        :name="photo"
        label="Photo url"
        :class="{ error: error }"
      />
      <div class="Members__formInfo">* required field</div>
    </div>
    <div class="Members__formBtns">
      <button
        type="button"
        class="btn-default-medium btn-standard btn-secondary"
        @click="$emit('close')"
      >
        Cancel
      </button>
      <button
        :disabled="!formValid"
        class="btn-default-medium btn-standard btn-primary-dark"
        @click.prevent="submitForm"
      >
        Create
      </button>
    </div>
  </form>
</template>

<script>
import { isEmpty } from "ramda";
import TextField from "theme/TextField";
// import DateField from "theme/DateField3/DateField";
// import SelectField from "theme/SelectField";
import { isEmailValid, isPhoneNumberValid } from "theme/utils/validate.js";
import { NATIONALIDADES } from "theme/utils/content";

export default {
  name: "MemberForm",
  components: {
    TextField
    // DateField,
    // SelectField
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: new Date(),
      country: "",
      age: "",
      email: "",
      phone: "",
      photo: "",
      state: "form",
      error: null,
      isEmpty,
      options: ["male", "female"],
      nationalidades: NATIONALIDADES
    };
  },
  computed: {
    formValid() {
      return Boolean(
        this.firstName &&
          this.lastName &&
          this.country &&
          this.gender &&
          this.age &&
          this.email &&
          this.emailChecked &&
          (!this.isFieldFilled(this.phone) ||
            (this.isFieldFilled(this.phone) && this.phoneValid(this.phone)))
      );
    },
    emailChecked() {
      return this.emailValid(this.email);
    },
    phoneChecked() {
      return this.phoneValid(this.phone);
    }
  },
  methods: {
    isFieldFilled(field) {
      return Boolean(field !== undefined && !isEmpty(field));
    },
    emailValid(email) {
      return Boolean(isEmailValid(email));
    },
    phoneValid(phone) {
      return Boolean(isPhoneNumberValid(phone));
    },
    submitForm() {
      const dto = {
        name: this.firstName,
        surname: this.lastName,
        country: this.country,
        gender: this.gender,
        email: this.email,
        phone: this.phone,
        age: this.age,
        avatar: this.photo,
        registered: new Date()
      };
      Object.keys(dto).forEach(key => dto[key] === "" && delete dto[key]);
      this.$emit("submit", dto);
    }
  }
};
</script>

<style lang="sass">
@import './Members'
</style>
