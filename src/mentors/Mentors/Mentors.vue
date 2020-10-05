<template>
  <div class="Mentors page">
    <Navbar />
    <div class="container">
      <loader v-if="state == 'loading'" />
      <div class="card">
        <div class="Mentors__header">
          <h2>Mentors list</h2>
        </div>
        <div class="Therapists__content">
          <h3 class="Therapists__contentHeader">
            <span v-if="!mentors.length && state !== 'loading'">
              No mentors
            </span>
            <Table
              v-if="mentors.length"
              :headings="headings"
              :data="sortedMentors"
              is-row-sortable
              is-row-searchable
              :queries="queries"
              :sort-by="sortBy"
              :actions="rowActions"
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
          </h3>
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
import { fetchMentors } from "../requests.js";

export default {
  name: "Mentors",
  components: {
    Navbar,
    Loader,
    Table,
    Avatar
  },
  data() {
    return {
      state: null,
      error: null,
      mentors: [],
      info: null,
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
          icon: "fas fa-info-circle",
          tooltip: "More",
          fn: d => this.$router.push(`/mentors/${d.id}`)
        },
        {
          name: "delete",
          icon: "fas fa-trash",
          class: "btn-secondary-dark",
          fn: d => this.$router.push(`/mentors/${d.id}`)
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
            return a.phone.trim().localeCompare(b.phone.trim());
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
          const companyData = response.data.ad;
          this.mentors = response.data.data.map(mentor => ({
            ...mentor,
            company: companyData.company,
            companyUrl: companyData.url,
            aboutMe: companyData.text,
            phone: Math.floor(Math.random() * 1000000000, 0),
            fullname: mentor.first_name + " " + mentor.last_name
          }));
          this.state = "loaded";
        })
        .catch(error => {
          this.state = "error";
          console.log("error", error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./Mentors";
</style>
