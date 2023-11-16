import svgs from "@/assets/svg/export";

svgs;

const items = [
  {
    id: 0,
    view: 'dashboard',
    title: "Dashboard",
    icon: svgs.sidebar_1,
    icon_active: svgs.sidebar_1_active,
  },
  {
    id: 1,
    view: 'canlendar',
    title: "Calendar",
    icon: svgs.sidebar_2,
    icon_active: svgs.sidebar_2_active,
  },
  {
    id: 2,
    view: 'task',
    title: "Tasks",
    icon: svgs.sidebar_3,
    icon_active: svgs.sidebar_3_active,
  },
  {
    id: 3,
    view: 'exam',
    title: "Exams",
    icon: svgs.sidebar_4,
    icon_active: svgs.sidebar_4_active,
  },
  {
    id: 4,
    view: 'shedule',
    title: "Schedule",
    icon: svgs.sidebar_5,
    icon_active: svgs.sidebar_5_active,
  },
  {
    id: 5,
    view: 'pomodoro',
    title: "Pomodoro",
    icon: svgs.sidebar_6,
    icon_active: svgs.sidebar_6_active,
  },
  {
    id: 6,
    view: 'settings',
    title: "Settings",
    icon: svgs.sidebar_7,
    icon_active: svgs.sidebar_7_active,
  },
];

export default items;
