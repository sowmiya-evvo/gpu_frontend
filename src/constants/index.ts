export enum MODULES {
    LOGIN = "Login",
    WMS_MOBILE = "WMS Mobile",
    WMS_WERABLE = "WMS Wearable",
    DASHBOARD = "Dashboard",
    MANAGE_TRAININGS = "Manage Trainings",
    MANAGE_TEAMS = "Manage Teams",
    LIVE_DATA = "Live Data",
    LIVE_VIEW = "Live View",
    COMPLETED_TRAININGS = "Completed Trainings",
    ASSESSMENTS = "Assessments",
    REPORTS = "Reports",
    USER_MANAGEMENT = "User Management",
    ROLES = "ROLES",
}

export const MODULES_INCLUDE_OPERATION = [
    "Manage Trainings",
    "Manage Teams",
    "Assessments"
]



export enum CRUD_OPERATION {
    CREATE = "c",
    READ = "r",
    UPDATE = "u",
    DELETE = "d",
}


export enum USER_ROLES {
    COMMISSIONER = "Commissioner",
    DIVISION_COMMANDER = "Division Commander",
    COMMANDER = "Commander FS",
    // SUPER_ADMIN_IT_ADMIN = "Super Admin/IT Admin",
    SUPER_ADMIN = "Super Admin",

    DY_COMMISSIONER = "Dy Commissioner",
    DIRECTOR_OPS = "Director Ops",
    FIRE_FIGHTERS = "Fire Fighters",
    SECTION_COMMANDERS = "Section Commander",
    USER_ADMIN = "User Admin",
    IT_ADMIN = "IT Admin",
    SENIOR_MANGEMENT = "Senior Management"

}

export const CHECK_STATION_DROPDOWN = [
    // USER_ROLES.COMMISSIONER,
    // USER_ROLES.DIRECTOR_OPS,
    // USER_ROLES.DY_COMMISSIONER,
    USER_ROLES.SENIOR_MANGEMENT,
    USER_ROLES.DIVISION_COMMANDER,
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.IT_ADMIN,
    USER_ROLES.USER_ADMIN

]

export enum SCREEN_PATH {
    DASHBOARD = "/dashboard",
    MANAGE_TRAININGS = "/manage-trainings-events",
    MANAGE_TEAMS = "/manage-teams",
    LIVE_DATA = "/live-training-and-tracking",
    LIVE_VIEW = "/live-training-view",
    COMPLETED_TRAININGS = "/completed-training-and-tracking",
    ASSESSMENTS = "/assessments",
    REPORTS = "/reports",
    USER_MANAGEMENT = "/user-management",
    RBAC = "/roles",
}


export const SENIOR_MANAGEMNT = [
    USER_ROLES.COMMISSIONER,
    USER_ROLES.DIRECTOR_OPS,
    USER_ROLES.DY_COMMISSIONER
]


export const ALL_ADMINS = [
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.USER_ADMIN,
    USER_ROLES.IT_ADMIN
]