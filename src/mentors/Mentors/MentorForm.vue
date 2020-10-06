<template>
  <form class="Mentors__form" @submit.prevent="submitForm()">
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
        v-model:value="company"
        :name="company"
        label="Company *"
        :class="{ error: error }"
      />
      <text-field
        v-model:value="aboutMe"
        :name="aboutMe"
        label="About me"
        fieldType="textarea"
        class="wide"
        :class="{ error: error }"
      />
      <text-field
        v-model:value="photo"
        :name="photo"
        label="Photo url"
        :class="{ error: error }"
      />
      <div class="Mentors__formInfo">* required field</div>
    </div>
    <div class="Mentors__formBtns">
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
import TextField from "theme//TextField";
import { isEmailValid, isPhoneNumberValid } from "theme/utils/validate.js";

export default {
  name: "MentorForm",
  components: {
    TextField
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
      email: "",
      phone: "",
      company: "",
      aboutMe: "",
      photo: "",
      state: "form",
      error: null,
      isEmpty
    };
  },
  computed: {
    formValid() {
      return Boolean(
        this.firstName &&
          this.lastName &&
          this.email &&
          this.company &&
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
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        phone: this.phone,
        company: this.company,
        aboutMe: this.aboutMe,
        photo: this.photo
      };
      Object.keys(dto).forEach(key => dto[key] === "" && delete dto[key]);
      this.$emit("submit", dto);
    }
  }
};
</script>

<style lang="sass">
@import './Mentors'
</style>
