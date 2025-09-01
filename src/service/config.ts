const apiUrl = process.env.REACT_APP_BASE_URL || '';

export const azureLogin = `${apiUrl}/api/v1/auth`;
export const signOut = `${apiUrl}/auth/signout`;
export const createTraining = `${apiUrl}/api/v1/training`;
export const Training = `${apiUrl}/api/v1/training`;
export const fetchDepartments = `${apiUrl}/api/v1/training`;
export const fetchTrainingListByDateRange = `${apiUrl}/api/v1/training`;
export const groupSync = `${apiUrl}/api/v1/training/groups-sync`;

export const fetchUsersDetails = `${apiUrl}/api/v1/auth`;
export const syncAzureUserApi = `${apiUrl}/api/v1`;
export const generateInviteCode = `${apiUrl}/api/v1/auth`;

export const assessmentUrl = `${apiUrl}/api/v1/assessment`;
export const assessmentQuestnUrl = `${apiUrl}/api/v1/assessment-questn`;

export const dashboardUrl = `${apiUrl}/api/v1/dashboard`;

export const teamUrl = `${apiUrl}/api/v1/team`;

export const moduleUrl = `${apiUrl}/api/v1/modules`;

export const rolesUrl = `${apiUrl}/api/v1/roles`;
export const rbacUrl = `${apiUrl}/api/v1/rbac`;
export const authUrl = `${apiUrl}/api/v1/auth`;
