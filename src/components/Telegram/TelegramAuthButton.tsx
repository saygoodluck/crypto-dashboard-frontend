import "./TelegramAuthButton.css";

const TelegramAuthButton = ({username}: { username: string | null }) => {

    return (
        <div>
            {username ? (
                <button>{username}</button>
            ) : (
                <a href={import.meta.env.VITE_TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
                    <button className={"auth-button"}>
                        <img src="/public/telegram.svg" alt="Иконка" className={"tg-icon"} />
                        Авторизоваться
                    </button>
                </a>
            )}
        </div>
    );
};

export default TelegramAuthButton;