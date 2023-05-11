<template>
  <div class="Mentors page">
    <Navbar />
    <div class="container">
      <loader v-if="state == 'loading'" />
      <div class="card">
        <div class="Mentors__header">
          <h2>Mentors list</h2>
        </div>
        <div class="Mentors__options">
          <button
            class="btn-standard btn-default-medium btn-gradient-dark"
            @click="() => openModal('addMentor', {})"
          >
            <i class="fas fa-user-plus"></i>
            Add mentor
          </button>
        </div>
        <div class="Mentors__content">
          <h3 class="Mentors__contentHeader">
            <span
              v-if="!mentors.length && state !== 'loading'"
              class="noResults"
            >
              No mentors yet
            </span>
          </h3>
          <Table
            v-if="mentors.length"
            :headings="headings"
            :data="filteredMentors"
            is-row-sortable
            is-row-searchable
            :queries="queries"
            :actions="rowActions"
            v-model:sort-by="sortBy"
          >
            <template v-slot:cell="{ data, heading }">
              <span v-if="headings[heading].key == 'avatar'">
                <Avatar :user="data" isBordered />
              </span>
              <span v-else>
                {{ data[headings[heading].key] }}
              </span>
            </template>
          </Table>
          <div class="noResults">
            <h4
              v-if="
                mentors.length &&
                  filteredMentors.length == 0 &&
                  state !== 'loading'
              "
            >
              No search results. Change search query and try again
            </h4>
          </div>
          <Modal v-if="modalState != 'hidden'" @close="closeModal">
            <template v-if="modalState == 'loading'" v-slot:loader>
              <loader class="sectionOnly" />
            </template>
            <template v-slot:header>{{ modalTitle }}</template>
            <template v-if="activeModal.name === 'removeMentor'" v-slot:content>
              <Confirm
                :confirm-question="
                  `Do you really want to delete mentor: ${selectedMentor.fullname} ?`
                "
                :button-text="'Yes'"
                @accept="deleteMentor(selectedMentor.id)"
                @close="modalState = 'hidden'"
              />
            </template>
            <template
              v-else-if="activeModal.name === 'addMentor'"
              v-slot:content
            >
              <mentor-form
                :initial-values="selectedMentor"
                @close="closeModal"
                @submit="addMentor($event)"
              />
            </template>
          </Modal>
          <Toast
            v-if="toastState == 'removed'"
            title="Mentor has been removed !"
            @close="toastState = 'hidden'"
          />
          <Toast
            v-if="toastState == 'created'"
            :title="'Mentor has been created successfully at ' + updateDate"
            @close="toastState = 'hidden'"
          />
          <Toast
            v-if="toastState == 'error'"
            error
            title="Something went wrong! Please try again"
            @close="toastState = 'hidden'"
          />
          <Toast
            v-if="toastState == 'errorMessage'"
            error
            :title="error.error"
            @close="toastState = 'hidden'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "theme/Navbar/Navbar";
import Loader from "theme/Loader";
import Table from "theme/Table";
import Avatar from "theme/Avatar";
import Modal from "theme/Modal";
import Confirm from "theme/Confirm";
import Toast from "theme/Toast";
import MentorForm from "./MentorForm";
import { fetchMentors, removeMentor, createMentor } from "../requests.js";
import { format } from "date-fns";

export default {
  name: "Mentors",
  components: {
    Navbar,
    Loader,
    Table,
    Avatar,
    Modal,
    Confirm,
    Toast,
    MentorForm
  },
  data() {
    return {
      state: null,
      error: null,
      modalState: "hidden",
      mentors: [],
      queryName: "",
      querySurname: "",
      queryFullname: "",
      queryEmail: "",
      queryPhone: "",
      queryCompany: "",
      selectedMentor: {},
      activeModal: {},
      toastState: "hidden",
      updateDate: format(new Date(), "dd LLLL yyyy"),
      headings: [
        {
          key: "avatar",
          name: "Photo",
          isRowSortable: false
        },
        {
          key: "id",
          name: "Id",
          isRowSortable: true
        },
        {
          key: "first_name",
          name: "Name",
          isRowSortable: true
        },
        {
          key: "last_name",
          name: "Surname",
          isRowSortable: true
        },
        {
          key: "fullname",
          name: "Fullname",
          isRowSortable: true
        },
        {
          key: "email",
          name: "Email",
          isRowSortable: true
        },
        {
          key: "phone",
          name: "Phone",
          isRowSortable: true
        },
        {
          key: "company",
          name: "Company",
          isRowSortable: true
        },
        {
          key: "actions",
          name: "Actions",
          isRowSortable: false
        }
      ],
      sortBy: {
        key: "id",
        direction: "asc"
      },
      rowActions: [
        {
          name: "edit",
          icon: "fas fa-edit",
          tooltip: "More",
          fn: d => this.$router.push(`/mentors/${d.id}`)
        },
        {
          name: "delete",
          icon: "far fa-trash-alt",
          class: "btn-secondary-dark",
          fn: d => this.openModal("removeMentor", d)
        }
      ],
      queries: [
        {
          key: "avatar",
          searchable: false
        },
        {
          key: "id",
          searchable: false
        },
        {
          key: "first_name",
          searchText: this.queryName,
          placeholder: "search name",
          searchable: true
        },
        {
          key: "last_name",
          searchText: this.querySurname,
          placeholder: "search surname",
          searchable: true
        },
        {
          key: "fullname",
          searchText: this.queryFullname,
          placeholder: "search fullname",
          searchable: true
        },
        {
          key: "email",
          searchText: this.queryEmail,
          placeholder: "search email",
          searchable: true
        },
        {
          key: "phone",
          searchText: this.queryPhone,
          placeholder: "search phone no",
          searchable: true
        },
        {
          key: "company",
          searchText: this.queryCompany,
          placeholder: "search company",
          searchable: true
        },
        {
          key: "actions",
          searchable: false
        }
      ]
    };
  },
  computed: {
    sortedMentors() {
      const mentors = this.mentors.slice().sort((a, b) => {
        switch (this.sortBy.key) {
          case "id":
            return a.id - b.id;
          case "first_name":
            return a.first_name.trim().localeCompare(b.first_name.trim());
          case "last_name":
            return a.last_name.trim().localeCompare(b.last_name.trim());
          case "fullname":
            return a.fullname.trim().localeCompare(b.fullname.trim());
          case "email":
            return a.email.localeCompare(b.email);
          case "phone":
            return a.phone - b.phone;
          case "company":
            return a.company.trim().localeCompare(b.company.trim());
          default:
            return 0;
        }
      });
      if (this.sortBy.direction == "asc") return mentors;
      else if (this.sortBy.direction == "desc")
        return mentors.slice().reverse();
      return this.mentors;
    },
    filteredMentors() {
      let filteredMentors;
      const sName = this.queries.find(q => q.key == "first_name").searchText || "";
      const sSurname = this.queries.find(q => q.key == "last_name").searchText || "";
      const sFullname = this.queries.find(q => q.key == "fullname").searchText || "";
      const sEmail = this.queries.find(q => q.key == "email").searchText || "";
      const sPhone = this.queries.find(q => q.key == "phone").searchText || "";
      const sCompany = this.queries.find(q => q.key == "company").searchText || "";

      const anySearch = sName || sSurname || sFullname || sEmail || sPhone || sCompany;

      if (anySearch)
        filteredMentors = this.sortedMentors
          .filter(
            s =>
              s.first_name &&
              s.first_name.toLowerCase().indexOf(sName.toLowerCase()) !== -1
          )
          .filter(
            s =>
              s.last_name &&
              s.last_name.toLowerCase().indexOf(sSurname.toLowerCase()) !== -1
          )
          .filter(
            u =>
              u.fullname &&
              u.fullname.toLowerCase().indexOf(sFullname.toLowerCase()) !== -1
          )
          .filter(
            u =>
              u.email &&
              u.email.toLowerCase().indexOf(sEmail.toLowerCase()) !== -1
          )
          .filter(u => u.phone && u.phone.indexOf(sPhone) !== -1)
          .filter(
            u =>
              u.company &&
              u.company.toLowerCase().indexOf(sCompany.toLowerCase()) !== -1
          );
      else filteredMentors = this.sortedMentors;
      return filteredMentors;
    },
    modalTitle() {
      switch (this.activeModal.name) {
        case "addMentor":
          return "Add mentor";
        case "removeMentor":
          return "Delete mentor";
        default:
          return "";
      }
    }
  },
  mounted() {
    this.getMentors();
  },
  methods: {
    getMentors() {
      this.state = "loading";
      return fetchMentors()
        .then(response => {
          const companyData = response.data.ad || {};
          this.mentors = response.data.data.map(mentor => ({
            ...mentor,
            company: companyData.company || "LEARN - Learning with us co",
            companyUrl: companyData.url,
            aboutMe: companyData.text,
            phone: Math.floor(100000000 + Math.random() * 900000000).toString(),
            fullname: mentor.first_name + " " + mentor.last_name
          }));
          this.state = "loaded";
        })
        .catch(error => {
          this.state = "error";
          console.log("error", error);
        });
    },
    closeModal() {
      this.modalState = "hidden";
    },
    openModal(modalName, user) {
      this.modalState = "visible";
      this.activeModal = {
        name: modalName,
        mentor: user
      };
      this.selectedMentor = user;
    },
    deleteMentor() {
      this.modalState = "loading";
      removeMentor(this.selectedMentor.id)
        .then(() => {
          this.modalState = "hidden";
          this.toastState = "removed";
          this.mentors = this.mentors.filter(
            mentor => mentor.id !== this.selectedMentor.id
          );
        })
        .catch(error => {
          this.error = error;
          this.modalState = "hidden";
          if (this.error.error) {
            this.toastState = "errorMessage";
          } else {
            this.toastState = "error";
          }
        });
    },
    addMentor(mentor) {
      this.modalState = "loading";
      createMentor(mentor)
        .then(res => {
          const mentorData = res.data;
          const id = mentorData.id;
          const createdAt = mentorData.createdAt;

          // since no newMentor in response, the new one is hardcoded
          const newMentor = {
            ...mentor,
            id,
            fullname: mentor.first_name + " " + mentor.last_name
          };
          this.updateDate = format(new Date(createdAt), "dd LLLL yyyy HH:mm");
          this.modalState = "hidden";
          this.toastState = "created";
          this.mentors.push(newMentor);
        })
        .catch(error => {
          this.error = error;
          this.modalState = "hidden";
          if (this.error.error) {
            this.toastState = "errorMessage";
          } else {
            this.toastState = "error";
          }
        });
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./Mentors"
</style>
