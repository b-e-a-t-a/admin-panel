<template>
  <div class="Mentor page">
    <Navbar :is-back-button-visible="true" />
    <div class="container">
      <loader v-if="state == 'loading'" />
      <div class="Mentor__header">
        <h2>{{ mentor.fullname }}</h2>
      </div>
      <div class="Mentor__content">
        <div class="Mentor__details p">
          <form @submit.prevent>
            <h4>Personal data</h4>
            <div class="Mentor__item">
              <div class="key" :class="{ beingEdited: edition.first_name }">
                Name
              </div>

              <div v-if="!edition.first_name" class="value">
                {{ mentor.first_name || "no data" }}
              </div>
              <div v-else class="value">
                <input
                  v-model="first_name"
                  name="first_name"
                  class="name"
                  @keyup.enter="changeData('first_name', first_name)"
                  @keyup.esc="finishEdition('first_name')"
                />
              </div>

              <div v-if="!edition.first_name" class="actions">
                <i class="fas fa-user-edit" @click="edit('first_name')" />
              </div>
              <div v-else class="actions whileEdited">
                <button
                  class="btn-ghost-primary btn-default-short btn-standard"
                  @click="changeData('first_name', first_name)"
                >
                  Save
                </button>
                <button
                  class="btn-gradient-brown btn-default-short btn-standard"
                  @click="finishEdition('first_name')"
                >
                  Cancel
                </button>
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
        title="Something went wrong! Please try again"
        @close="toastState = 'hidden'"
      />
      <Toast
        v-if="toastState == 'errorMessage'"
        :title="error.error"
        @close="toastState = 'hidden'"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "theme/Navbar/Navbar";
import Loader from "theme/Loader";
import Toast from "theme/Toast";
import { fetchMentor, updateMentorData } from "../requests.js";

export default {
  name: "Mentor",
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
      items: ["first_name", "last_name", "email"],
      edition: {
        first_name: false,
        last_name: false,
        email: false
      }
    };
  },
  mounted() {
    this.state = "loading";
    this.getMentor();
  },
  methods: {
    getMentor() {
      return fetchMentor(this.mentorId)
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
        });
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
    },
    setEditables(key) {
      this[key] = this.mentor[key];
    },
    edit(el) {
      this.edition[el] = true;
      this.first_name = this.mentor.first_name;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./Mentor"
</style>
