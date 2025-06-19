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
}