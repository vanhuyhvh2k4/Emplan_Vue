import { DEFAULT_AVATAR_URL } from "@/constants";
import * as authService from "@/services/authService";

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
    async uploadProfile(payload) {
      const response = await authService.updateProfile(payload);

      if (response.status === 200) {
        return response.data.user;
      }
    },
    async handleChangeAvatar(e) {
      const imgRef = this.$refs.imgRef;
      const file = e.target.files[0];
      if (file) {
        if (
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png"
        ) {
          imgRef.src = URL.createObjectURL(file);
          this.editProfileData.binaryAvatar = file;
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
    async handleClickSaveEditProfile() {
      if (confirm("Are you sure to change?")) {
        const formData = new FormData();
        formData.append("name", this.editProfileData.name);
        formData.append("job", this.editProfileData.job);
        if (this.editProfileData.binaryAvatar) {
          formData.append("avatar", this.editProfileData.binaryAvatar);
        }
        fetch(`${process.env.VUE_APP_API_URL}/update-profile`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.$cookies.get("gid")}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            const updatedUser = data.data.user;
            const updateUserStringify = JSON.stringify(updatedUser);
            localStorage.setItem("current_user", updateUserStringify);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  async created() {
    this.isLoading = true;
    await this.getCurrentUser();
    this.isLoading = false;
  },
};
