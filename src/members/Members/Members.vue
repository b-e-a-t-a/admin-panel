<template>
  <div class="Members page">
    <Navbar />
    <div class="container">
      <loader v-if="state == 'loading'" />
      <div class="card">
        <div class="Members__header">
          <h2>Members list</h2>
        </div>
        <div class="Members__paginationInfo perPage">
          <div class="Members__customSelect">
            <label for="results-select">Results per page</label>
            <select
              id="results-select"
              name="results"
              v-model="selectedResultsPerPage"
            >
              <option v-for="(item, key) in itemsPerPage" :key="'item-' + key">
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <div class="Members__paginationInfo">
          <div>Page {{ currentPage + 1 }} of {{ totalPages }}</div>
          <div>
            Showing {{ currentPage * selectedResultsPerPage + 1 }} to
            {{
              currentPage * selectedResultsPerPage +
                (selectedResultsPerPage * 100) / 100
            }}
            results
          </div>
          <div>Total results: {{ members.length }}</div>
        </div>

        <div class="Members__options">
          <button
            class="btn-standard btn-default-medium btn-gradient-dark"
            @click="() => openModal('addMember', {})"
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
            :data="usersToShow"
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
                  filteredMembers.length == 0 &&
                  state !== 'loading'
              "
            >
              No search results. Change search query and try again
            </h4>
          </div>

          <div class="Members__paginationButtons">
            <button
              class="pageBtn"
              :class="{ disabled: currentPage == 0 }"
              :disabled="currentPage == 0"
              @click="handlePreviousPage"
            >
              <i class="fas fa-angle-left"></i>
              <span class="bolded">{{ currentPage }}</span>
            </button>
            <button class="pageBtn activePage">
              <span class="bolded">{{ currentPage + 1 }}</span>
              <span></span>
            </button>
            <button
              class="pageBtn"
              :class="{ disabled: disabledNextButton }"
              :disabled="disabledNextButton"
              @click="handleNextPage"
            >
              <i class="fas fa-angle-right"></i>
              <span class="bolded">{{ currentPage + 2 }}</span>
            </button>
          </div>

          <Modal v-if="modalState != 'hidden'" @close="closeModal">
            <template v-if="modalState == 'loading'" v-slot:loader>
              <loader class="sectionOnly" />
            </template>
            <template v-slot:header>{{ modalTitle }}</template>
            <template v-if="activeModal.name === 'removeMember'" v-slot:content>
              <Confirm
                :confirm-question="
                  `Do you really want to delete member: ${selectedMember.fullname} ?`
                "
                :button-text="'Yes'"
                @accept="deleteMember(selectedMember.id)"
                @close="modalState = 'hidden'"
              />
            </template>
            <template
              v-else-if="activeModal.name === 'addMember'"
              v-slot:content
            >
              <member-form
                :initial-values="selectedMember"
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
      selectedMember: {},
      activeModal: {},
      toastState: "hidden",
      updateDate: format(new Date(), "dd LLLL yyyy"),
      numberOfMembers: 100,
      currentPage: 0,
      selectedResultsPerPage: 100,
      itemsPerPage: [10, 20, 50, 100, 500, 4000],
      usersToShow: [],
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
          fn: d => this.$router.push({ name: "Member", params: { ...d }})
        },
        {
          name: "delete",
          icon: "far fa-trash-alt",
          class: "btn-secondary-dark",
          fn: d => this.openModal("removeMember", d)
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
    sortedMembers() {
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
    filteredMembers() {
      let filteredMembers;
      const sFullname = this.queries.find(q => q.key == "fullname").searchText || "";
      const sCountry = this.queries.find(q => q.key == "country").searchText || "";
      const sAge = this.queries.find(q => q.key == "age").searchText || "";
      const sEmail = this.queries.find(q => q.key == "email").searchText || "";
      const sPhone = this.queries.find(q => q.key == "phone").searchText || "";

      const anySearch = sAge || sFullname || sEmail || sPhone || sCountry;

      if (anySearch)
        filteredMembers = this.sortedMembers
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
          .filter(s => s.age && s.age.toString().indexOf(sAge) !== -1)
          .filter(
            u =>
              u.email &&
              u.email.toLowerCase().indexOf(sEmail.toLowerCase()) !== -1
          )
          .filter(u => u.phone && u.phone.indexOf(sPhone) !== -1);
      else filteredMembers = this.sortedMembers;
      return filteredMembers;
    },
    modalTitle() {
      switch (this.activeModal.name) {
        case "addMember":
          return "Add member";
        case "removeMember":
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
    },
    totalPages() {
      const total = Math.ceil(
        this.numberOfMembers / this.selectedResultsPerPage
      );
      return total;
    },
    disabledNextButton() {
      const isFilterApplied = this.filteredMembers.length !== this.members.length;
      const equalsCount =
        this.usersToShow.length == this.members.length &&
        this.members.length == this.selectedResultsPerPage;
      const pageFrom = this.currentPage + 1;
      const pageTo = this.totalPages;

      const isLastPage = equalsCount
        ? this.usersToShow.length <= this.selectedResultsPerPage
        : pageFrom == pageTo;

      if (isFilterApplied) {
        return true;
      } else return isLastPage;
    }
  },
  mounted() {
    this.getMembers();
  },
  watch: {
    selectedResultsPerPage(newVal) {
      this.usersToShow = this.members.slice(0, newVal);
      this.currentPage = 0;
      this.filteredMembers = this.members;
      this.queryFullname = "";
      this.queryCountry = "";
      this.queryAge = "";
      this.queryEmail = "";
      this.queryPhone = "";
    },
    filteredMembers(newVal) {
      this.usersToShow = newVal;
    }
  },
  methods: {
    getMembers() {
      this.state = "loading";
      return fetchMembers(this.numberOfMembers)
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
            registered: new Date(member.registered.date),
            street:
              member.location.street && member.location.street.name
                ? member.location.street.name +
                  " " +
                  member.location.street.number
                : member.location.street,
            city: member.location.city,
            postcode: member.location.postcode,
            title: member.name.title,
            username: member.login.username
          }));
          this.usersToShow = this.members;
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
      this.selectedMember = user;
    },
    deleteMember() {
      this.modalState = "loading";
      setTimeout(() => {
        this.modalState = "hidden";
        this.toastState = "removed";
        this.members = this.members.filter(
          member => member.id !== this.selectedMember.id
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
    },
    handlePreviousPage() {
      this.state = "loading";
      const selectedResultsPerPage = Number(this.selectedResultsPerPage);
      const currentPageStart = this.currentPage * selectedResultsPerPage + 1;
      const previousPageEnd = currentPageStart - 1;
      const previousPageStart = previousPageEnd + 1 - selectedResultsPerPage;
      this.usersToShow = this.members.slice(
        previousPageStart - 1,
        previousPageEnd
      );

      this.currentPage--;

      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      this.state = "loaded";
    },
    handleNextPage() {
      this.state = "loading";
      const selectedResultsPerPage = Number(this.selectedResultsPerPage);
      const currentPageStart = this.currentPage * selectedResultsPerPage + 1;
      const currentPageEnd = currentPageStart + selectedResultsPerPage - 1;
      const nextPageStart = currentPageEnd + 1;
      const nextPageEnd = nextPageStart + selectedResultsPerPage - 1;
      this.usersToShow = this.members.slice(nextPageStart - 1, nextPageEnd);

      this.currentPage++;

      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      this.state = "loaded";
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./Members"
</style>
