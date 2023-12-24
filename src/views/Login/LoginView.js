import * as authService from "@/services/authService.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      isPending: false,
    };
  },
  methods: {
    async handleSubmitForm() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.isPending = true;
      const response = await authService.login(payload);
      this.isPending = false;
      if (response.status === 200) {
        this.$cookies.set("gid", response.data.token, "7d");
        const payloadString = JSON.stringify(response.data.user);
        localStorage.setItem("current_user", payloadString);
        this.$router.push({ name: "dashboard" });
      } else {
        this.$refs.childRef1.clearInput();
        this.$refs.childRef2.clearInput();
        alert("The provided credentials are incorrect.");
      }
    },
    handleEmail(value) {
      this.email = value;
    },
    handlePassword(value) {
      this.password = value;
    },
  },
  mounted() {
    document.title = "Login Account | Emplaner";
  },
};
