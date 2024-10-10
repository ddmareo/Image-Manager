<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col md="6" class="mt-5">
        <b-form @submit.prevent="uploadImage">
          <b-form-file
            v-model="file"
            placeholder="Choose files..."
            drop-placeholder="Drop files here..."
            accept="image/*"
            multiple
            required></b-form-file>
          <b-button type="submit" class="mt-2 custom-gray-button"
            >Upload</b-button
          >
        </b-form>
        <b-alert show variant="info" class="mt-2">
          Maximum file size: 5MB. Accepted formats: PNG, JPG, GIF, WEBP.
        </b-alert>
        <b-alert :show="!!message" variant="success" class="mt-3">{{
          message
        }}</b-alert>
        <b-alert :show="!!errorMessage" variant="danger" class="mt-3">{{
          errorMessage
        }}</b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
module.exports = {
  data() {
    return {
      file: null,
      message: "",
      errorMessage: "",
    };
  },

  methods: {
    async uploadImage() {
      const formData = new FormData();
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

      // Clear previous messages
      this.message = "";
      this.errorMessage = "";

      // Check if files are selected
      if (!this.file || this.file.length === 0) {
        this.errorMessage = "No files selected.";
        return;
      }

      // Track rejected files and valid files
      const rejectedFiles = [];
      let validFiles = 0;

      // Filter files
      for (let i = 0; i < this.file.length; i++) {
        if (this.file[i].size <= MAX_FILE_SIZE) {
          formData.append("image", this.file[i]);
          validFiles++;
        } else {
          rejectedFiles.push(this.file[i].name);
        }
      }

      // If there are valid files to upload
      if (validFiles > 0) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:1880/uploadimage",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // If all files are valid, show the success message
          if (rejectedFiles.length === 0) {
            this.message = "Files have been successfully uploaded.";
          } else {
            // If some files are too large, only show the error message
            this.errorMessage =
              "Some files are not successfully uploaded because of large file size.";
          }
        } catch (error) {
          this.errorMessage =
            error.response?.data || "Failed to upload the image.";
        }
      }

      // If all files are rejected
      if (validFiles === 0 && rejectedFiles.length > 0) {
        if (rejectedFiles.length === 1) {
          this.errorMessage =
            "Failed to upload the file because it has exceeded the maximum size limit.";
        } else {
          this.errorMessage =
            "Failed to upload the files because they exceeded the maximum size limit.";
        }
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
