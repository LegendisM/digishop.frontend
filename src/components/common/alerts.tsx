import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function Alerts(data: { messages: { type: string, title: string, content: string }[] }) {
    return (
        <>
            {
                data.messages.map((msg) => (
                    <Alert icon={<IconAlertCircle size="1rem" />} title={msg.title} color="red" withCloseButton>
                        {msg.content}
                    </Alert>
                ))
            }
        </>
    );
}