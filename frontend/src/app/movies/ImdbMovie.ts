export class ImdbMovie {
    id?: string;
    type?: string;
    primaryTitle?: string;
    originalTitle?: string;
    primaryImage?: {
        url: string;
        width: number;
        height: number;
    };
    startYear?: number;
    runtimeSeconds?: number;
    genres?: string[];
    rating?: {
        aggregateRating: number;
        voteCount: number;
    };
    plot?: string;
    directors?: {
        id: string;
        displayName: string;
        alternativeNames?: string[];
        primaryImage: {
            url: string;
            width: number;
            height: number;
        };
        primaryProfessions: string[];
    }[];
    writers?: {
        id: string;
        displayName: string;
        alternativeNames?: string[];
        primaryImage: {
            url: string;
            width: number;
            height: number;
        };
        primaryProfessions: string[];
    }[];
    stars?: {
        id: string;
        displayName: string;
        alternativeNames?: string[];
        primaryImage: {
            url: string;
            width: number;
            height: number;
        };
        primaryProfessions?: string[];
    }[];
    originCountries?: {
        code: string;
        name: string;
    }[];
    spokenLanguages?: {
        code: string;
        name: string;
    }[];
    interests?: {
        id: string;
        name: string;
        isSubgenre?: boolean;
    }[];

    constructor(args?: Partial<ImdbMovie>) {
        if (args) {
            Object.assign(this, args);
        }
    }
}
