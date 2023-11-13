import * as authService from "@/services/authService.js";
import router from '@/router';
export default {
    data() {
        return {
            fullName: '',
            email: '',
            password: '',
            isPending: false
        }
    },
    methods: {
        async handleSubmitForm() {
            let payload = {
                name: this.fullName,
                email: this.email,
                password: this.password
            };
            this.isPending = true;
            const response = await authService.register(payload);
            this.isPending = false;

            if (response.status === 201) {
                router.push({name: 'verify', query: {uid: response.data.id}})
            } else {
                alert(response.response.data.message);
            }
        },
        handleFullName(value) {
            this.fullName = value;
        },
        handleEmail(value) {
            this.email = value;
        },
        handlePassword(value) {
            this.password = value;
        }
    },
    mounted() {
        document.title = "Register Account | Emplaner"
    },
};