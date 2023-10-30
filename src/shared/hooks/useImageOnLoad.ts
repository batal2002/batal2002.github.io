import {useState} from 'react'


interface ImageOnLoadType {
    handleImageOnLoad: () => void
    isLoaded: boolean
}

export function useImageOnLoad(): ImageOnLoadType {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const handleImageOnLoad = () => {
        setIsLoaded(true)
    }

    return {handleImageOnLoad, isLoaded}
}