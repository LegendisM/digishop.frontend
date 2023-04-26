import { AxiosResponse } from 'axios';
import { hasLength, useForm } from '@mantine/form';
import { IconPhoneCall } from '@tabler/icons-react';
import { TextInput, Textarea, Group, Text, Button, Container, Paper, Divider, Flex, Space, Box, LoadingOverlay } from '@mantine/core';
import Layout from '@/components/layout';
import { useAxios } from '@/common/service/api.service';
import { GET_API_ROUTE } from '@/constants/api.config';
import { ISupportSendResponseDto } from '@/common/interfaces/support/support.dto';
import Alerts, { AlertColors } from '@/components/common/alerts';
import { useRouter } from 'next/router';
import Auth from '@/components/common/auth';

export default function SupportPage() {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            subject: '',
            content: '',
        },
        validate: {
            subject: hasLength({ min: 2, max: 80 }),
            content: hasLength({ min: 1, max: 255 })
        },
    });
    const [{ data, loading, error }, send] = useAxios<ISupportSendResponseDto>({
        url: GET_API_ROUTE('support', 'send'),
        method: 'POST',
        data: form.values
    });

    const onSendResponse = (response: AxiosResponse<ISupportSendResponseDto>) => {
        if (response.data.state) {
            router.push('/dashboard/support');
        }
    }

    return (
        <Layout pageKey="support" title="Support" description="Get in touch with our powerful team">
            <Auth auth={true} message={true}>
                <LoadingOverlay visible={loading || data?.state == true} />
                <Container size={'sm'} my={40}>
                    <Paper shadow={'md'} withBorder p={30} pt={20} mt={30} radius={'md'}>
                        <Flex justify={'space-between'} align={'center'}>
                            <Space />
                            <Text
                                align="center"
                                size={'lg'}
                                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 700 })}
                            >
                                Get in touch with our powerful team
                            </Text>
                            <IconPhoneCall />
                        </Flex>
                        <Divider mt={'xs'} mb={'xs'} />
                        <Box component='form' onSubmit={form.onSubmit((values) => {
                            send().then(onSendResponse);
                        })}>
                            <TextInput
                                name="subject"
                                label="Subject"
                                placeholder="Subject"
                                mt="md"
                                variant="filled"
                                {...form.getInputProps('subject')}
                            />
                            <Textarea
                                name="content"
                                label="Message"
                                placeholder="Your message"
                                maxRows={10}
                                minRows={5}
                                autosize
                                variant="filled"
                                mt="md"
                                {...form.getInputProps('content')}
                            />

                            <Group position="center" mt="xl">
                                <Button type="submit" size="md">
                                    Send Message
                                </Button>
                            </Group>
                        </Box>
                        <Space h={'md'} />
                        <Alerts
                            messages={[
                                {
                                    condition: data !== undefined && data?.state == false,
                                    color: AlertColors.error,
                                    title: 'Error',
                                    content: "There was a problem creating your support request"
                                }
                            ]}
                        />
                    </Paper>
                </Container>
            </Auth>
        </Layout>
    );
}