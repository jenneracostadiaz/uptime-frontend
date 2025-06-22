export type System = {
    id: number;
    name: string;
    description: string;
    status: boolean;
};

export type Component = {
    id: number;
    name: string;
    description: string;
    status: boolean;
    serviceSystemId: number;
};

export type Check = {
    id: number;
    name: string;
    serviceSystemId: number;
    componentId: number;
    checkUrl: string;
    checkInterval: number;
    checkTimeout: number;
    requestHeaders: string;
    downAlertDelay: number;
    downAlertResend: number;
    downAlertMessage: string;
    alertEmail: string;
};

export type UptimeEvent = {
    id: number;
    uptimeCheckId: number;
    startTime: string;
    endTime: string;
    isUp: boolean;
    isFalsePositive: boolean;
    category: string;
    note: string;
    jiraTicket: string;
    maintenanceType: string;
};
