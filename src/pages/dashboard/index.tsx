import { useEffect } from "react";
import { useForm, hasLength, isEmail } from "@mantine/form";
import { Avatar, Button, SimpleGrid, Paper, Space, TextInput, Container, Divider, Flex, Box, LoadingOverlay } from "@mantine/core";
import { GetApiRoute } from "@/constants/api.config";
import { useAxios } from "@/common/service/api.service";
import DashboardLayout from "@/components/dashboard/layout";
import Alerts, { AlertColors } from "@/components/common/alerts";
import { IProfileFetchResponseDto, IProfileUpdateResponseDto } from "@/common/interfaces/profile/profile.dto";

export default function ProfilePage() {
    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            nationalcode: ''
        },
        validate: {
            username: hasLength({ min: 3, max: 25 }, 'Username must be 3-25 characters long'),
            email: isEmail(),
            nationalcode: hasLength({ min: 10, max: 10 }, 'National Code must be 10 characters long')
        }
    });
    const [{ data: fetchData, loading: fetchLoading, error: fetchError }] = useAxios<IProfileFetchResponseDto>({
        url: GetApiRoute('profile', 'fetch'),
        method: 'GET'
    }, { manual: false });
    const [{ data: updateData, loading: updaeLoading }, update] = useAxios<IProfileUpdateResponseDto>({
        url: GetApiRoute('profile', 'update'),
        method: 'PUT',
        data: form.values
    });

    useEffect(() => {
        if (fetchData) {
            form.setValues(fetchData);
        }
    }, [fetchData]);

    return (
        <DashboardLayout label="Profile">
            <LoadingOverlay visible={fetchLoading || updaeLoading} />
            <Container size={'md'}>
                <Paper p={'md'} pt={'lg'} radius={'md'} shadow={'md'} withBorder>
                    <Box component="form" onSubmit={form.onSubmit((values) => {
                        update();
                    })}>

                        <Flex justify={'space-between'} align={'center'}>
                            <Avatar src={fetchData?.avatar} size={'xl'} radius={'sm'} />
                            <Space w={'sm'} />
                            <Button variant="default" size="xs" >Select</Button>
                        </Flex>
                        <Divider my={'sm'} />
                        <SimpleGrid cols={2}>
                            <TextInput
                                type="text"
                                name="username"
                                label="Username"
                                placeholder="Your Username"
                                required
                                {...form.getInputProps('username')}
                            />
                            <TextInput
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="Your Email"
                                required
                                {...form.getInputProps('email')}
                            />
                        </SimpleGrid>
                        <TextInput
                            type="text"
                            name="nationalcode"
                            label="National Code"
                            placeholder="Your National Code"
                            maxLength={10}
                            mt={'md'}
                            required
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            {...form.getInputProps('nationalcode')}
                        />
                        <Button type="submit" fullWidth mt="lg" color="green">
                            Save
                        </Button>
                    </Box>
                    <Space h={'xs'} />
                    <Alerts
                        messages={[
                            {
                                condition: updateData != undefined,
                                color: updateData?.state ? AlertColors.success : AlertColors.error,
                                title: 'Info',
                                content: updateData?.message ?? 'Invalid Message'
                            },
                        ]}
                    />
                </Paper>
            </Container>
        </DashboardLayout>
    );
}