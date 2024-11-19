export default interface IContent {
    uuid: string;
    title?: string;
    tag?: string;
    description?: string;
    viewCount?: number;
    creator?: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};
