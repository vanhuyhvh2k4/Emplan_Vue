import * as authService from "@/services/authService.js";
export default {
  data() {
    let uid = this.$route.query.uid;
    return {
      code: "",
      uid,
      isPending: false,
    };
  },
  methods: {
    async handleSubmitForm() {
      let payload = {
        token: this.code,
      };
      this.isPending = true;
      const response = await authService.verifyEmail(this.uid, payload);
      this.isPending = false;
      if (response.status === 200) {
        alert("Verify successfully");
        this.$router.push("login");
      } else {
        alert(response.message);
        this.$refs.childRef.clearInput();
      }
    },
    handleCode(value) {
      this.code = value;
    },
  },
  mounted() {
    document.title = "Verify Email | Emplaner";
  },
};
