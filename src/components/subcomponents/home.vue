<template>
  <div class="carousel-container">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
      <b-carousel-slide v-for="(image, index) in slides" :key="index">
        <template #img>
          <img
            class="d-block img-fluid fill-container"
            :src="image"
            alt="Image slide" />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      slide: 0,
      sliding: null,
      slides: [],
    };
  },
  mounted() {
    this.fetchImages();
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    fetchImages() {
      axios
        .get("http://127.0.0.1:1880/dataimage")
        .then((response) => {
          const baseURL = "http://127.0.0.1:1880/image/";
          this.slides = response.data.map((item) => `${baseURL}${item.name}`);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    },
  },
};
</script>

<style scoped>
.carousel-container {
  margin: 95px auto 0;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
}
</style>
