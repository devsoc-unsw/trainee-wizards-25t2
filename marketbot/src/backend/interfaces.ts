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

export interface MeetingInput {
    meetingId: string; 
    listing: ListingInput; 
    listingId: string;

    // conversation: ConversationInput;
    // conversationId: string;

    agreedPrice: number;
    location?: string; 
    // meetingData?: DateTime;
    eventId?: string;
    // createdAt: DateTime;
}