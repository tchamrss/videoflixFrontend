export interface User {
    email: string;
    password: string;
    password2?: string; // Optional property
    name?: string; // Optional property
    token?: string; // Optional property
}
