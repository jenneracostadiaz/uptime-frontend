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
    systemId: number;
};

export type UptimeCheck = {
    id:number;
    name: string
    serviceSystemId: number
    componentId: number
    checkUrl: string
    checkInterval: number
    checkTimeout: number
    requestHeaders: string
    downAlertDelay: number
    downAlertResend: number
    downAlertMessage: string
    alertEmail: string
}