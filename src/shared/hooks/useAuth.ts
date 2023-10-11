import {useAppSelector} from "./redux";


export const useAuth = () => {
    const {userId} = useAppSelector((state) => state.user)

    return {
        isAuth: !!userId,
        userId
    }
}