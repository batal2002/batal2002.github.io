export interface IImage {
    id: string
    date: number
    imgURL: string
}

export interface Profile {
    userId: string | null
    email: string
    name: string
    surname: string
    avatarURL: string
    imagesList: IImage[]
    isProfileLoading: boolean
    isUser: boolean
}

export interface User {
    userId: string | null
    name: string
    surname: string
    avatarURL: string
    isLoginLoading: boolean
}