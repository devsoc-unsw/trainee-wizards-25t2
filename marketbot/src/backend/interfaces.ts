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

export interface meetingInput {
    title: string;
    description: string;
    meetingTime: number;
    meetingLocation: string; 
    userId: string;
    status: string; 
}