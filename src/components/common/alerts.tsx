import Alert from "./alert";

export default function Alerts(data: { messages: { type: string, title: string, content: string }[] }) {
    return (
        <>
            {
                data.messages.map((msg) => (
                    <Alert title={msg.title} content={msg.content} />
                ))
            }
        </>
    );
}