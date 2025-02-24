export interface IMenu {
    id: number,
    uuid: string, 
    name: string,
    price: number,
    picture: string,
    description: string,
    category: string,
    createdAt: string,
    updatedAt: string
}

export interface IUser {
    id: number,
    uuid: string, 
    name: string,
    email: string,
    password: string,
    profile_picture: string,
    role: string,
    createdAt: string,
    updatedAt: string,
}