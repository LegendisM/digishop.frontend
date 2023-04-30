import { createStyles, Container, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandInstagram, IconBrandTelegram, IconBrandGithub } from '@tabler/icons-react';
import Logo from './logo';

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: rem(120),
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },
    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export default function Footer() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Logo />
                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <ActionIcon component="a" href="https://github.com/LegendisM" size="lg">
                        <IconBrandGithub size="1.05rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component="a" href="https://t.me/LegendisM" size="lg">
                        <IconBrandTelegram size="1.05rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component="a" href="https://www.instagram.com/legendism76/" size="lg">
                        <IconBrandInstagram size="1.05rem" stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    )
}