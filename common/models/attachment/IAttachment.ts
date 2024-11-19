export default interface IAttachment {
    uuid: string;
    contentUuid?: string;
    enable?: boolean;
    name?: string;
    origin?: string;
    size?: number;
    path?: string;
    format?: string;
    createdAt: Date;
};