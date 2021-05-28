export interface User {
    id: string,
    username: string,
    email: string
    password: string;
    cart: string[];
    items: string[];
}

export interface Categories {
    name: string;
}

export interface messages {
    message: string;
}

export interface Types {
    name: string;
    content: string
}

export interface Position {
    name: string
    cost: number
    files: string
    categories: Categories[]
    user?: User;
    id?: string
    getFile(file: string): void;
    type: Types
}