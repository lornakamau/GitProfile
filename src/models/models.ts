export class User{
    name?: string;
    login?: string;
    bio?: string;
    avatarUrl?: any;
    followers? : Followers;
    following?: Following;
    starredRepositories?: StarredRepositories;
    company?: string;
    location?: string;
    websiteUrl?: any;
    email?: string;
    twitterUsername?: string;
    organizations?: any;
    repositories: any;
}

export class Followers{
    totalCount?: number;
}

export class Following{
    totalCount?: number;
}

export class StarredRepositories{
    totalCount?: number;
}
