import { useEffect } from "react";
import useAuth from "../hooks";

const NotFoundPage = () => {
    const auth = useAuth();
    const checkAuth = () => {
        if (localStorage.getItem('userId')) {
            auth.logIn();
        } 
    }

    useEffect(() => {
        checkAuth()
    }, [])
    return (
        <div class="text-center">
            <img
                alt="Страница не найдена"
                class="img-fluid h-25"
                src="notfoundimg.svg" />
            <h1 class="h4 text-muted">Страница не найдена</h1>
            <p class="text-muted">Но вы можете перейти&nbsp;
                <a href="/">на главную страницу</a>
            </p>
        </div>)
}
export default NotFoundPage;