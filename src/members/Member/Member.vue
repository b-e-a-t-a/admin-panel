<template>
  <div class="Member page">
    <Navbar :is-back-button-visible="true" />
    <div class="container">
      <loader v-if="state == 'loading'" />
      <div class="Member__header">
        <h2>{{ mentor.fullname }}</h2>
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
                  {{ mentor[item.value] || "no data" }}
                </div>
                <div v-else class="value">
                  <textarea
                    v-if="item.value == 'aboutMe'"
                    v-model="item[item.value]"
                    name="aboutMe"
                    class="aboutMe"
                    @keyup.enter="changeData('aboutMe', item[item.value])"
                    @keyup.esc="finishEdition('aboutMe')"
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

            <h4>Company data</h4>
            <div :key="item.id" v-for="item in companyItems">
              <div class="Member__item">
                <div class="key" :class="{ beingEdited: edition[item.value] }">
                  {{ item.label }}
                </div>

                <div v-if="!edition[item.value]" class="value">
                  {{ mentor[item.value] || "no data" }}
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
        v-if="toastState == 'apiError'"
        error
        title="It is faked data. No such a user in hosted API!"
        @close="toastState = 'hidden'"
      />
      <Toast
        v-if="toastState == 'errorMessage'"
        error
        :title="error.error"
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
import { fetchMember, updateMentorData } from "../requests.js";
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
      mentorId: this.$route.params.mentorId,
      mentor: {},
      toastState: "hidden",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      aboutMe: "",
      company: "",
      companyUrl: "",
      edition: {
        first_name: false,
        last_name: false,
        email: false,
        phone: false,
        aboutMe: false,
        company: false,
        companyUrl: false
      },
      items: [
        {
          label: "Name",
          value: "first_name",
          first_name: ""
        },
        {
          label: "Surname",
          value: "last_name"
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
          label: "About me",
          value: "aboutMe"
        }
      ],
      companyItems: [
        {
          label: "Company name",
          value: "company",
          company: ""
        },
        {
          label: "Company www",
          value: "companyUrl"
        }
      ]
    };
  },
  mounted() {
    this.state = "loading";
    this.getMentor();
  },
  methods: {
    getMentor() {
      return fetchMember(this.mentorId)
        .then(response => {
          const data = response.data.data;
          const companyData = response.data.ad;

          this.mentor = {
            ...data,
            fullname: data.first_name + " " + data.last_name,
            company: companyData.company,
            companyUrl: companyData.url,
            aboutMe: companyData.text,
            phone: Math.floor(100000000 + Math.random() * 900000000).toString()
          };
          this.state = "loaded";
        })
        .catch(error => {
          this.error = error;
          this.state = "error";
          if (this.error.error) {
            this.toastState = "errorMessage";
          } else {
            this.toastState = "apiError";
          }
        });
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
      let mentorObject = Object.assign({}, this.mentor);
      mentorObject.name = val;
      this.mentor = mentorObject;
      this.mentor[key] = val;
      const data = { [key]: val };
      this.state = "loading";

      updateMentorData(this.mentorId, data)
        .then(() => {
          this.state = "loaded";
          this.toastState = "updated";
        })
        .catch(error => {
          this.error = error;
          this.state = "error";
          if (this.error.error) {
            this.toastState = "errorMessage";
          } else {
            this.toastState = "error";
          }
        });
    },
    finishEdition(key) {
      this.edition[key] = false;
      this.setEditables(key);
      this.toastState = "hidden";
    },
    setEditables(key) {
      this[key] = this.mentor[key];
    },
    edit(el) {
      this.edition[el] = true;
      this.first_name = this.mentor.first_name;
      this.last_name = this.mentor.last_name;
      this.email = this.mentor.email;
      this.phone = this.mentor.phone;
      this.aboutMe = this.mentor.aboutMe;
      this.company = this.mentor.company;
      this.companyUrl = this.mentor.companyUrl;
      const personalItem = this.items.find(item => item.value == el);
      const companyItem = this.companyItems.find(i => i.value == el);
      const item = personalItem || companyItem;
      item[el] = this.mentor[el];
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./Member"
</style>
