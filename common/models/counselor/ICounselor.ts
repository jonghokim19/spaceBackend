export default interface ICounselor {
    uid: string;
    name?: string;
    phone?: string;
    order?: number;
    enable?: boolean;
    marketerPhone?: string;
    createdAt: Date;
    updatedAt?: Date;
};