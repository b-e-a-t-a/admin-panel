<template>
  <div class="Members page">
    <Navbar />
    <div class="container">
      <loader v-if="state == 'loading'" />
      <div class="card">
        <div class="Members__header">
          <h2>Members list</h2>
        </div>
        <div class="Members__options">
          <button
            class="btn-standard btn-default-medium btn-gradient-dark"
            @click="() => openModal('addMentor', {})"
          >
            <i class="fas fa-user-plus"></i>
            Add member
          </button>
        </div>
        <div class="Members__content">
          <h3 class="Members__contentHeader">
            <span
              v-if="!members.length && state !== 'loading'"
              class="noResults"
            >
              No members yet
            </span>
          </h3>
          <Table
            v-if="members.length"
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
              <span v-else-if="headings[heading].key == 'registered'">
                {{ format(data[headings[heading].key], "dd.LL.yyyy") }}
              </span>
              <span v-else>
                {{ data[headings[heading].key] }}
              </span>
            </template>
          </Table>
          <div class="noResults">
            <h4
              v-if="
                members.length &&
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
                  `Do you really want to delete member: ${selectedMentor.fullname} ?`
                "
                :button-text="'Yes'"
                @accept="deleteMember(selectedMentor.id)"
                @close="modalState = 'hidden'"
              />
            </template>
            <template
              v-else-if="activeModal.name === 'addMentor'"
              v-slot:content
            >
              <member-form
                :initial-values="selectedMentor"
                @close="closeModal"
                @submit="addMember($event)"
              />
            </template>
          </Modal>
          <Toast
            v-if="toastState == 'removed'"
            title="Member has been removed from list!"
            @close="toastState = 'hidden'"
          />
          <Toast
            v-if="toastState == 'created'"
            :title="
              'Mocked member has been added to the table at ' + updateDate
            "
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
import MemberForm from "./MemberForm";
import { fetchMembers } from "../requests.js";
import { format } from "date-fns";
import { generateRandomId } from "theme/utils/helpers.js";

export default {
  name: "Members",
  components: {
    Navbar,
    Loader,
    Table,
    Avatar,
    Modal,
    Confirm,
    Toast,
    MemberForm
  },
  data() {
    return {
      state: null,
      error: null,
      format,
      modalState: "hidden",
      members: [],
      queryFullname: "",
      queryCountry: "",
      queryAge: "",
      queryEmail: "",
      queryPhone: "",
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
          key: "fullname",
          name: "Fullname",
          isRowSortable: true
        },
        {
          key: "country",
          name: "Country",
          isRowSortable: true
        },

        {
          key: "age",
          name: "Age",
          isRowSortable: true
        },
        {
          key: "registered",
          name: "Joined",
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
          icon: "fas fa-info-circle",
          fn: d => this.$router.push(`/members/${d.id}`)
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
          key: "fullname",
          searchText: this.queryFullname,
          placeholder: "search fullname",
          searchable: true
        },
        {
          key: "country",
          searchText: this.queryCountry,
          placeholder: "search country",
          searchable: true
        },
        {
          key: "age",
          searchText: this.queryAge,
          placeholder: "search age",
          searchable: true
        },
        {
          key: "registered",
          searchable: false
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
          key: "actions",
          searchable: false
        }
      ]
    };
  },
  computed: {
    sortedMentors() {
      const members = this.members.slice().sort((a, b) => {
        switch (this.sortBy.key) {
          case "id":
            return a.id.trim().localeCompare(b.id.trim());
          case "fullname":
            return a.fullname.trim().localeCompare(b.fullname.trim());
          case "country":
            return a.country.trim().localeCompare(b.country.trim());
          case "age":
            return a.age - b.age;
          case "registered":
            return new Date(a.registered) - new Date(b.registered);
          case "email":
            return a.email.localeCompare(b.email);
          case "phone":
            return a.phone.trim().localeCompare(b.phone.trim());
          default:
            return 0;
        }
      });
      if (this.sortBy.direction == "asc") return members;
      else if (this.sortBy.direction == "desc")
        return members.slice().reverse();
      return this.members;
    },
    filteredMentors() {
      let filteredMentors;
      const sFullname = this.queries.find(q => q.key == "fullname").searchText || "";
      const sCountry = this.queries.find(q => q.key == "country").searchText || "";
      const sAge = this.queries.find(q => q.key == "age").searchText || "";
      const sEmail = this.queries.find(q => q.key == "email").searchText || "";
      const sPhone = this.queries.find(q => q.key == "phone").searchText || "";

      const anySearch = sAge || sFullname || sEmail || sPhone || sCountry;

      if (anySearch)
        filteredMentors = this.sortedMentors
          .filter(
            u =>
              u.fullname &&
              u.fullname.toLowerCase().indexOf(sFullname.toLowerCase()) !== -1
          )
          .filter(
            u =>
              u.country &&
              u.country.toLowerCase().indexOf(sCountry.toLowerCase()) !== -1
          )
          .filter(s => s.age && s.age.indexOf(sAge) !== -1)
          .filter(
            u =>
              u.email &&
              u.email.toLowerCase().indexOf(sEmail.toLowerCase()) !== -1
          )
          .filter(u => u.phone && u.phone.indexOf(sPhone) !== -1);
      else filteredMentors = this.sortedMentors;
      return filteredMentors;
    },
    modalTitle() {
      switch (this.activeModal.name) {
        case "addMentor":
          return "Add member";
        case "removeMentor":
          return "Delete member";
        default:
          return "";
      }
    },
    generateApiTokenBasedId() {
      const randomId =
        generateRandomId() +
        "-" +
        generateRandomId(4) +
        "-" +
        generateRandomId(4) +
        "-" +
        generateRandomId(4) +
        "-" +
        generateRandomId(12);
      return randomId.toString();
    }
  },
  mounted() {
    this.getMentors();
  },
  methods: {
    getMentors() {
      this.state = "loading";
      return fetchMembers()
        .then(response => {
          const data = response.data.results;
          this.members = data.map(member => ({
            id: member.login.uuid,
            name: member.name.first,
            surname: member.name.last,
            fullname:
              member.name.title +
              " " +
              member.name.first +
              " " +
              member.name.last,
            country: member.nat,
            email: member.email,
            phone: member.phone,
            gender: member.gender,
            age: member.dob.age,
            avatar: member.picture.thumbnail,
            registered: new Date(member.registered.date)
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
        member: user
      };
      this.selectedMentor = user;
    },
    deleteMember() {
      this.modalState = "loading";
      setTimeout(() => {
        this.modalState = "hidden";
        this.toastState = "removed";
        this.members = this.members.filter(
          member => member.id !== this.selectedMentor.id
        );
      }, 500);
    },
    addMember(member) {
      this.modalState = "loading";

      // since API does not support POST/PATCH/PUT, the new one is hard-coded
      const newMember = {
        ...member,
        id: this.generateApiTokenBasedId,
        fullname: member.name + " " + member.surname
      };
      this.updateDate = format(
        new Date(member.registered),
        "dd LLLL yyyy HH:mm"
      );

      setTimeout(() => {
        this.modalState = "hidden";
        this.toastState = "created";
        this.members.push(newMember);
      }, 500);
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./Members"
</style>
