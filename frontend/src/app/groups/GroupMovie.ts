export class GroupMovie {
    imdbId?: string;
    upvotes: string[] = [];
    downvotes: string[] = [];

    constructor(args?: Partial<GroupMovie>) {
        if (args) {
            Object.assign(this, args);
        }
    }
}
