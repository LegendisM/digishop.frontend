import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm, hasLength, isEmail } from "@mantine/form";
import { Avatar, Button, SimpleGrid, Paper, Space, Text, TextInput, Container, Divider, Flex, Box, LoadingOverlay, FileButton } from "@mantine/core";
import { UPLOADS_STORAGE } from "@/constants/config";
import { GET_API_ROUTE } from "@/constants/api.config";
import { useAxios } from "@/common/service/api.service";
import DashboardLayout from "@/components/dashboard/layout";
import Alerts, { AlertColors } from "@/components/common/alerts";
import { IProfileFetchResponseDto, IProfileUpdateResponseDto } from "@/common/interfaces/profile/profile.dto";
import { JsonToFormData } from "@/common/helpers/form.helpers";

export default function ProfilePage() {
    const [file, setFile] = useState<File | null>(null);
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
    const [{ data: fetchData, loading: fetchLoading, error: fetchError }, fetch] = useAxios<IProfileFetchResponseDto>({
        url: GET_API_ROUTE('profile', 'fetch'),
        method: 'GET'
    }, { manual: false });
    const [{ data: updateData, loading: updaeLoading, error: updateError }, update] = useAxios<IProfileUpdateResponseDto>({
        url: GET_API_ROUTE('profile', 'update'),
        method: 'PUT'
    });

    useEffect(() => {
        if (fetchData) {
            form.setValues(_.omit(fetchData, ['avatar']));
        }
    }, [fetchData]);

    useEffect(() => {
        if (updateData?.state && file) {
            fetch();
            setFile(null);
        }
    }, [updateData])

    const onSubmit = () => {
        let formData = JsonToFormData(form.values);
        if (file) {
            formData.set('avatar', file);
        }
        update({ data: formData });
    }

    return (
        <DashboardLayout label="Profile">
            <LoadingOverlay visible={fetchLoading || updaeLoading} />
            <Container size={'md'}>
                <Paper p={'md'} pt={'lg'} radius={'md'} shadow={'md'} withBorder>
                    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
                        <Flex justify={'space-between'} align={'center'}>
                            <Avatar src={fetchData?.avatar ? `${UPLOADS_STORAGE}/avatars/${fetchData.avatar}` : null} size={'xl'} radius={'sm'} />
                            {file && (
                                <Box>
                                    <Text size="sm" align="center" mt="sm" color="green">
                                        Picked Avatar: {file.name}
                                    </Text>
                                    <Text size="xs" align="center" color="grey">
                                        Press <Text color="green" fw={'bold'} display={'contents'}>Save</Text> will upload your avatar
                                    </Text>
                                </Box>
                            )}
                            <FileButton onChange={(data) => {
                                setFile(data);
                            }} accept="image/png,image/jpg,image/jpeg">
                                {(props) => <Button variant="default" size="xs" {...props}>Select Avatar</Button>}
                            </FileButton>
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
                            {
                                condition: fetchError != undefined,
                                color: AlertColors.error,
                                title: "Error",
                                content: fetchError?.message ?? "Invalid Message"
                            },
                            {
                                condition: updateError != undefined,
                                color: AlertColors.error,
                                title: "Error",
                                content: updateError?.message ?? "Invalid Message"
                            },
                        ]}
                    />
                </Paper>
            </Container>
        </DashboardLayout>
    );
}