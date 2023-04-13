import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export enum AlertColors {
    success = 'blue',
    warning = 'yellow',
    error = 'red'
}

export default function Alerts(data: { messages: { title: string, content: string, condition: boolean, color: AlertColors }[] }) {
    return (
        <>
            {
                data.messages.map((msg, index) => (
                    <Alert key={index} mt={'xs'} icon={<IconAlertCircle size="1rem" />} title={msg.title} hidden={msg.condition == false} color={msg.color}>
                        {msg.content}
                    </Alert>
                ))
            }
        </>
    );
}