import svgs from "@/assets/svg/export.js";
export default {
    data() {
        return {
            svgs,
            currentDate: new Date(),
        };
    },
    computed: {
        formattedDate() {
            const options = {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            };
            return this.currentDate.toLocaleDateString("en-US", options);
        },
        formattedTime() {
            const options = {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                second: "numeric",
            };
            return this.currentDate.toLocaleTimeString("en-US", options);
        },
    },
    created() {
        setInterval(() => {
            this.currentDate = new Date();
        }, 1000);
    },
    mounted() {
        document.title = "Dashboard | Emplanner";
    },
};