export interface IImage {
    id: string
    date: string
    imgURL: string
}

export interface IPost {
    id: string
    date: string
    text: string
    authorId: string
    imageList: IImage[]
}

export interface ISubscriptions {
    subscriptionId: string
    avatarURL: string,
    name: string,
    surname: string

}

export interface ISubscriptions {
    subscriberId: string
    avatarURL: string,
    name: string,
    surname: string

}

export interface Profile {
    profileId: string | null
    email: string
    name: string
    surname: string
    avatarURL: string
    imagesList: IImage[]
    postsList: IPost[]
    subscriptionsList: ISubscriptions[]
    totalSubscriptions: number
    subscribersList: ISubscriptions[]
    totalSubscribers: number
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
export interface Posts {
    postList: IPost[]
}
export interface IMessage {
    id: string
    authorId: string
    date: string | null
    text: string
    imageList: string[]
}

export interface LastMessage {
    authorId: string,
    text: string,
    imageCount: number
}
export interface RecipientInfo {

    id: string
    avatarURL: string
    name: string
    surname: string
    isLoading: boolean
}

export interface IDialog {
    recipientInfo: RecipientInfo
    messages: IMessage[]
}
export interface DialogInfo {
    lastMessage: LastMessage
    lastUpdateDate: string
    uncheckedMessages: number
    recipientId: string
}
export interface Dialogs {
    dialogsList: DialogInfo[]
    isLoading: boolean
}