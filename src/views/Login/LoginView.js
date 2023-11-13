import * as authService from "@/services/authService.js";
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async handleSubmitForm() {
            let payload = {
                email: this.email,
                password: this.password
            };
            const response = await authService.login(payload);

            console.log(response);
        },
        handleEmail(value) {
            this.email = value;
        },
        handlePassword(value) {
            this.password = value;
        }
    },
};