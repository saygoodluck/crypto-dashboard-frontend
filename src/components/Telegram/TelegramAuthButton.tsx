import "./TelegramAuthButton.css";

const TelegramAuthButton = ({username}: { username: string | null }) => {
    const botLink = 'https://t.me/crowdTesttt_bot?start=auth';

    return (
        <div>
            {username ? (
                <button>{username}</button>
            ) : (
                <a href={botLink} target="_blank" rel="noopener noreferrer">
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