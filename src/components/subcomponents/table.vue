<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col style="margin-top: 5%">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="tb-display"
          style="float: right"></b-pagination>
        <b-table
          id="tb-display"
          striped
          hover
          small
          :items="items"
          :per-page="perPage"
          :fields="fields"
          :current-page="currentPage">
          <template #cell(no)="row">
            {{ (currentPage - 1) * perPage + row.index + 1 }}
            <!-- Calculate the display number -->
          </template>

          <template #cell(name)="row">
            <a
              :href="`http://127.0.0.1:1880/image/${row.item.name}`"
              target="_blank">
              {{ row.item.name }}
            </a>
          </template>

          <template #cell(actions)="row">
            <b-button
              size="sm"
              class="custom-gray-button"
              @click="deleteItem(row.item.id)">
              Delete
            </b-button>
          </template>
        </b-table>

        <b-button class="custom-gray-button mt-3" @click="deleteAllItems"
          >Delete All</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
module.exports = {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [],
      fields: [
        {
          key: "no",
          label: "No.",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "name",
          label: "Name",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "actions",
          label: "Actions",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  mounted() {
    this.fetchImages();
  },
  methods: {
    fetchImages() {
      axios
        .get("http://127.0.0.1:1880/dataimage")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    },

    deleteItem(id) {
      if (confirm("Are you sure you want to delete this image?")) {
        axios
          .delete(`http://127.0.0.1:1880/deleteimage/${id}`)
          .then(() => {
            this.items = this.items.filter((item) => item.id !== id);
          })
          .catch((error) => {
            console.error("Error deleting image:", error);
          });
      }
    },

    deleteAllItems() {
      if (confirm("Are you sure you want to delete all images?")) {
        axios
          .delete("http://127.0.0.1:1880/deleteallimages")
          .then(() => {
            this.items = [];
          })
          .catch((error) => {
            console.error("Error deleting all images:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
.custom-gray-button {
  background-color: #141414;
  color: #fff;
  border: none;
}

.custom-gray-button:hover {
  background-color: #3b3b3b;
}
</style>
