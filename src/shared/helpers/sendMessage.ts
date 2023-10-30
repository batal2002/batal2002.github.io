import {addDoc, collection, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {firestore, storage} from "../../firebase";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {v4} from "uuid";

const getUserImageList = async (previewImages: (string | undefined)[], recipientId: string, userId: string) => {
    if (previewImages.length > 0) {
        return await Promise.all(previewImages.map(file => {
            if (file) {
                return uploadString(ref(storage, `${userId + recipientId}/${v4()}`), file, 'data_url')
                    .then(value => {
                        return getDownloadURL(value.ref).then(imgURL => {
                                return imgURL
                            }
                        )
                    })
            }
        }))
    }
}
const getRecipientImageList = async (previewImages: (string | undefined)[], recipientId: string, userId: string) => {
    if (previewImages.length > 0) {
        return await Promise.all(previewImages.map(file => {
            if (file) {
                return uploadString(ref(storage, `${recipientId + userId}/${v4()}`), file, 'data_url')
                    .then(value => {
                        return getDownloadURL(value.ref).then(imgURL => {
                                return imgURL
                            }
                        )
                    })
            }
        }))
    }
}

interface Message {
    authorId: string
    text: string
    date: any
    imageList?: (string | undefined)[]
}

export const sendMessage = async (recipientId: string, userId: string, messageText: string, previewImages: (string | undefined)[]) => {
    const userImageList = await getUserImageList(previewImages, recipientId, userId)
    const data: Message = {
        authorId: userId,
        text: messageText,
        date: serverTimestamp()
    }
    if (userImageList) data.imageList = userImageList
    await addDoc(collection(firestore, 'usersMessages', userId, recipientId), data)
        .then(async (docRef) => {
            const recipientImageList = await getRecipientImageList(previewImages, recipientId, userId)
            if (recipientImageList) data.imageList = recipientImageList
            await setDoc(doc(firestore, 'usersMessages', recipientId, userId, docRef.id), data)
        })
}