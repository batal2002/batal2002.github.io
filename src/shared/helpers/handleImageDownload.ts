import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase";
import {v4} from "uuid";
import imageCompression from "browser-image-compression";

export const handleImageDownload = (target: HTMLInputElement | null, callback: (imgURL: string, imgFile: string | undefined) => void) => {
    if (target) {
        let imgFile = target.files?.[0]
        if (imgFile) {
            const formatList = ['jpeg', 'jpg', 'gif', 'png', 'svg', 'bmp']
            const fileFormat = imgFile.type.split("/").splice(-1, 1)[0].toLowerCase()
            if (formatList.includes(fileFormat)) {
                const refStorage = ref(storage, `images/${v4()}`)
                const options = {
                    maxSizeMB: 0.6,
                    maxWidthOrHeight: 1920,
                }
                imageCompression(imgFile, options).then((compressedFile) =>
                    uploadBytes(refStorage, compressedFile)
                        .then(value => {
                            getDownloadURL(value.ref).then(async imgURL => {
                                    callback(imgURL, imgFile?.name)
                                }
                            )
                        })
                )

            }
        }
        target.value = ''
    }
}