import { useEffect } from "react";
import useAuth from "../hooks/AuthHook"; 

const NotFoundPage = () => {
    const auth = useAuth();


    useEffect(() => {
        const checkAuth = () => {
            if (localStorage.getItem('userId')) {
                auth.logIn();
            }
        }
        checkAuth()
    }, [auth])
    return (
        <div className="text-center">
            <img
                alt="Страница не найдена"
                className="img-fluid h-25"
                src="notfoundimg.svg" />
            <h1 className="h4 text-muted">Страница не найдена</h1>
            <p className="text-muted">Но вы можете перейти&nbsp;
                <a href="/">на главную страницу</a>
            </p>
        </div>)
}
export default NotFoundPage;