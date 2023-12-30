import { DEFAULT_AVATAR_URL } from "@/constants";

export default {
  data() {
    return {
      DEFAULT_AVATAR_URL,
      isLoading: false,
      editProfileData: {
        avatar: null,
        binaryAvatar: null,
        name: null,
        job: null,
        email: null,
      },
    };
  },
  methods: {
    handleChangeAvatar() {
      const inputRef = this.$refs.inputRef;
      const imgRef = this.$refs.imgRef;
      const file = inputRef.files[0];
      const data = this;
      if (file) {
        if (
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png"
        ) {
          var reader = new FileReader();
          reader.onload = function (event) {
            var binaryData = event.target.result;
            data.editProfileData.binaryAvatar = binaryData;
            imgRef.src = "data:image/jpeg;base64," + btoa(binaryData);
          };
          reader.readAsBinaryString(file);
        } else {
          alert("File must be: .jpg, .jpeg, .png");
        }
      } else {
        alert("Not file selected");
      }
    },
    getCurrentUser() {
      const currentUser = localStorage.getItem("current_user");
      if (currentUser) {
        const user = JSON.parse(currentUser);
        for (const key in this.editProfileData) {
          this.editProfileData[key] = user[key];
        }
        this.editProfileData.avatar = null;
      } else {
        this.$cookies.remove("gid");
        this.$router.push({ name: "login" });
      }
    },
    handleClickSaveEditProfile() {
      if (confirm("Are you sure to change?")) {
        const uploadProfileData = {
          ...this.editProfileData,
          avatar: this.editProfileData.binaryAvatar ?? null,
        };

        delete uploadProfileData.binaryAvatar;

        console.log(uploadProfileData);
      }
    },
  },
  async created() {
    this.isLoading = true;
    await this.getCurrentUser();
    this.isLoading = false;
  },
};
