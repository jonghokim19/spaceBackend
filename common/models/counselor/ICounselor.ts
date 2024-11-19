export default interface ICounselor {
    uid: string;
    name?: string;
    phone?: string;
    order?: number;
    enable?: boolean;
    createdAt: Date;
    updatedAt?: Date;
};