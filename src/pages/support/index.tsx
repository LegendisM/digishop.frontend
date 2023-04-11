import Layout from '@/components/layout';
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container, Paper, Divider, Flex, Space } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPhoneCall } from '@tabler/icons-react';

export default function SupportPage() {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validate: {
            name: (value) => value.trim().length < 2,
            email: (value) => !/^\S+@\S+$/.test(value),
            subject: (value) => value.trim().length === 0,
        },
    });

    return (
        <Layout pageKey="support" title="Support" description="Get in touch with our powerful team">
            <Container size={'sm'} my={40}>
                <Paper shadow={'md'} withBorder p={30} pt={20} mt={30} radius={'md'}>
                    <Flex justify={'space-between'} align={'center'}>
                        <Space />
                        <Title
                            align="center"
                            size={'18'}
                            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 700 })}
                        >
                            Get in touch with our powerful team
                        </Title>
                        <IconPhoneCall />
                    </Flex>
                    <Divider mt={'xs'} mb={'xs'} />
                    <form onSubmit={form.onSubmit(() => { })}>

                        <SimpleGrid cols={2} mt="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                name="name"
                                variant="filled"
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                label="Email"
                                placeholder="Your email"
                                name="email"
                                variant="filled"
                                {...form.getInputProps('email')}
                            />
                        </SimpleGrid>

                        <TextInput
                            label="Subject"
                            placeholder="Subject"
                            mt="md"
                            name="subject"
                            variant="filled"
                            {...form.getInputProps('subject')}
                        />
                        <Textarea
                            mt="md"
                            label="Message"
                            placeholder="Your message"
                            maxRows={10}
                            minRows={5}
                            autosize
                            name="message"
                            variant="filled"
                            {...form.getInputProps('message')}
                        />

                        <Group position="center" mt="xl">
                            <Button type="submit" size="md">
                                Send message
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </Container>
        </Layout>
    );
}