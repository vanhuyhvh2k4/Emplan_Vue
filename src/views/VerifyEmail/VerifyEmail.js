import * as authService from "@/services/authService.js";
export default {
    data() {
        let uid = this.$route.query.uid;
        return {
            code: '',
            uid
        }
    },
    methods: {
        async handleSubmitForm() {
            let payload = {
                token: this.code
            };

            const response = await authService.verifyEmail(this.uid, payload);

            if (response.status === 200) {
                alert("Verify successfully");
                this.$router.push('login');
            } else {
                alert(response.message);
            }
        },
        handleCode(value) {
            this.code = value;
        }
    },
};