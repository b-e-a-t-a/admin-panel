<template>
  <div class="Member page">
    <Navbar :is-back-button-visible="true" />
    <div class="container">
      <loader v-if="state == 'loading'" />
      <div class="Member__header">
        <h2>{{ member.fullname }}</h2>
      </div>
      <div class="Member__content">
        <div class="Member__details p">
          <form @submit.prevent>
            <h4>Personal data</h4>
            <div :key="item.id" v-for="item in items">
              <div class="Member__item">
                <div class="key" :class="{ beingEdited: edition[item.value] }">
                  {{ item.label }}
                </div>

                <div v-if="!edition[item.value]" class="value">
                  {{ member[item.value] || "no data" }}
                </div>
                <div v-else class="value">
                  <input
                    v-if="item.value == 'age'"
                    v-model.number="item[item.value]"
                    name="age"
                    class="age"
                    type="number"
                    :min="18"
                    max="120"
                    @keyup.enter="changeData('age', item[item.value])"
                    @keyup.esc="finishEdition('age')"
                  />
                  <input
                    v-else
                    v-model="item[item.value]"
                    type="text"
                    :name="`${item.value}`"
                    :class="`${item.value}`"
                    @keyup.enter="
                      validateData(`${item.value}`, item[item.value])
                    "
                    @keyup.esc="finishEdition(`${item.value}`)"
                  />
                </div>

                <div v-if="!edition[item.value]" class="actions">
                  <i class="fas fa-user-edit" @click="edit(`${item.value}`)" />
                </div>
                <div v-else class="actions whileEdited">
                  <button
                    class="btn-ghost-primary btn-default-short btn-standard"
                    @click="validateData(`${item.value}`, item[item.value])"
                  >
                    Save
                  </button>
                  <button
                    class="btn-gradient-brown btn-default-short btn-standard"
                    @click="finishEdition(`${item.value}`)"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <h4>Location data</h4>
            <div :key="item.id" v-for="item in locationItems">
              <div class="Member__item">
                <div class="key" :class="{ beingEdited: edition[item.value] }">
                  {{ item.label }}
                </div>

                <div v-if="!edition[item.value]" class="value">
                  {{ member[item.value] || "no data" }}
                </div>
                <div v-else class="value">
                  <input
                    v-model="item[item.value]"
                    type="text"
                    :name="`${item.value}`"
                    :class="`${item.value}`"
                    @keyup.enter="changeData(`${item.value}`, item[item.value])"
                    @keyup.esc="finishEdition(`${item.value}`)"
                  />
                </div>

                <div v-if="!edition[item.value]" class="actions">
                  <i class="fas fa-user-edit" @click="edit(`${item.value}`)" />
                </div>
                <div v-else class="actions whileEdited">
                  <button
                    class="btn-ghost-primary btn-default-short btn-standard"
                    @click="changeData(`${item.value}`, item[item.value])"
                  >
                    Save
                  </button>
                  <button
                    class="btn-gradient-brown btn-default-short btn-standard"
                    @click="finishEdition(`${item.value}`)"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toast
        v-if="toastState == 'updated'"
        title="Data has been updated successfully !"
        @close="toastState = 'hidden'"
      />
      <Toast
        v-if="toastState == 'error'"
        error
        title="Something went wrong! Please try again"
        @close="toastState = 'hidden'"
      />
      <Toast
        v-if="toastState == 'emailError'"
        error
        title="Email format is invalid. Check your data and try again."
        @close="toastState = 'hidden'"
      />
      <Toast
        v-if="toastState == 'phoneError'"
        error
        title="Phone number is invalid. Check your data and try again."
        @close="toastState = 'hidden'"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "theme/Navbar/Navbar";
import Loader from "theme/Loader";
import Toast from "theme/Toast";
import { isEmailValid, isPhoneNumberValid } from "theme/utils/validate.js";

export default {
  name: "Member",
  components: {
    Navbar,
    Loader,
    Toast
  },
  data() {
    return {
      state: null,
      error: null,
      memberId: this.$route.params.id,
      member: this.$route.params,
      toastState: "hidden",
      title: "",
      firstname: "",
      surname: "",
      username: "",
      email: "",
      phone: "",
      gender: "",
      age: "",
      country: "",
      street: "",
      city: "",
      postcode: "",
      edition: {
        title: false,
        firstname: false,
        surname: false,
        username: false,
        email: false,
        phone: false,
        gender: false,
        age: false,
        country: false,
        street: false,
        city: false,
        postcode: false
      },
      items: [
        {
          label: "Title",
          value: "title",
          title: ""
        },
        {
          label: "Name",
          value: "firstname",
          firstname: ""
        },
        {
          label: "Surname",
          value: "surname"
        },
        {
          label: "Username",
          value: "username"
        },
        {
          label: "Email",
          value: "email"
        },
        {
          label: "Phone",
          value: "phone"
        },
        {
          label: "Gender",
          value: "gender"
        },
        {
          label: "Age",
          value: "age"
        }
      ],
      locationItems: [
        {
          label: "Country code",
          value: "country",
          country: ""
        },
        {
          label: "Street",
          value: "street",
          street: ""
        },
        {
          label: "City",
          value: "city"
        },
        {
          label: "Postcode",
          value: "postcode"
        }
      ]
    };
  },
  mounted() {
    this.getMember();
  },
  methods: {
    getMember() {
      this.member = {
        ...this.member,
        firstname: this.member.name
      };
    },
    checkIfEmailValid(key, val) {
      const isValid = isEmailValid(val);
      if (!isValid) {
        this.toastState = "emailError";
      } else {
        this.changeData(key, val);
      }
    },
    checkIfPhoneNumberValid(key, val) {
      const isValid = isPhoneNumberValid(val);
      if (!isValid) {
        this.toastState = "phoneError";
      } else {
        this.changeData(key, val);
      }
    },
    validateData(key, val) {
      if (key == "email") this.checkIfEmailValid(key, val);
      else if (key == "phone") this.checkIfPhoneNumberValid(key, val);
      else this.changeData(key, val);
    },
    changeData(key, val) {
      this.edition[key] = false;
      let memberObject = Object.assign({}, this.member);
      memberObject.name = val;
      this.member = memberObject;
      this.member[key] = val;
      this.state = "loading";
      setTimeout(() => {
        this.state = "loaded";
        this.toastState = "updated";
      }, 500);
    },
    finishEdition(key) {
      this.edition[key] = false;
      this.setEditables(key);
      this.toastState = "hidden";
    },
    setEditables(key) {
      this[key] = this.member[key];
    },
    edit(el) {
      this.edition[el] = true;
      this.firstname = this.member.firstname;
      this.surname = this.member.surname;
      this.email = this.member.email;
      this.phone = this.member.phone;
      this.gender = this.member.gender;
      this.title = this.member.title;
      this.username = this.member.username;
      this.age = this.member.age;
      this.country = this.member.country;
      this.street = this.member.street;
      this.city = this.member.city;
      this.postcode = this.member.postcode;
      const personalItem = this.items.find(item => item.value == el);
      const companyItem = this.locationItems.find(i => i.value == el);
      const item = personalItem || companyItem;
      item[el] = this.member[el];
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./Member"
</style>
