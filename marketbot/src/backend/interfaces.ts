export interface UserInput {
    name: string;
    discordId: string;
}

export interface ListingInput {
    title: string;
    description: string;
    minPrice: number;
    maxPrice: number;
    condition: string;
    userId: string;
    status: string;
}
