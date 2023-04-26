import { createStyles } from "@mantine/core";

export const useGlobalStyles = createStyles((theme) => ({
    customPaper: {
        border: theme.colorScheme === 'dark' ? '0.0625rem solid #34354a !important' : 'none',
        boxShadow: theme.colorScheme === 'dark' ? "0px 0px 8px 0px #151522c9 !important" : 'none',
        background: theme.colorScheme === 'dark' ? "linear-gradient(45deg, #2b2b3e2b, #5144ac14) !important" : ''
    }
}));