import imageCompression from "browser-image-compression";

export const compressImage = (target: HTMLInputElement | null, callback: (imgFile: File ) => void) => {
    if (target) {
        let imgFile = target.files?.[0]
        if (imgFile) {
            const formatList = ['jpeg', 'jpg', 'gif', 'png', 'svg', 'bmp']
            const fileFormat = imgFile.type.split("/").splice(-1, 1)[0].toLowerCase()
            if (formatList.includes(fileFormat)) {
                const options = {
                    maxSizeMB: 0.3,
                    maxWidthOrHeight: 1920,
                }
                if (imgFile.size > options.maxSizeMB * 1000000) {
                    imageCompression(imgFile, options).then((compressedFile) => {
                            callback( compressedFile)
                        }
                    )
                } else {
                    callback( imgFile)
                }
            }
        }
        target.value = ''
    }
}