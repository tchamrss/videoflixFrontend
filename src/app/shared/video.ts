export interface Video {
    id: number;
    title: string;
    description?: string; // Optional property
    playtime: string;
    genres?: string; // Optional property
    likes: number;
    picture: string;
    date: Date;
    videofile: string;
}