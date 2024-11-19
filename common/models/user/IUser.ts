export default interface IUser {
    uid: string;
    role: roleType;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    createdAt: Date;
    updatedAt?: Date;
};

export enum roleType {
    SYSTEM = 'system',
    ADMIN = 'admin',
};