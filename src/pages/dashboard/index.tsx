import DashboardLayout from "@/components/dashboard/layout";
import { Avatar, Box, Button, SimpleGrid, Paper, Grid, Space, TextInput, PasswordInput } from "@mantine/core";

export default function ProfilePage() {
    return (
        <DashboardLayout label="Profile">
            <Paper p={'md'} radius={'md'} shadow={'md'} withBorder>
                <Grid>
                    <Grid.Col span={8}>
                        <TextInput
                            type="text"
                            name="username"
                            label="Username"
                            placeholder="Your Username"
                            required
                        />
                        <TextInput
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Your Email"
                            mt="md"
                            required
                        />
                        <PasswordInput
                            name="password"
                            label="Password"
                            placeholder="Your Password"
                            mt="md"
                            required
                        />
                        <PasswordInput
                            name="confirm-password"
                            label="Confirm Password"
                            placeholder="Confirm Your Password"
                            mt="md"
                            required
                        />
                        <SimpleGrid cols={2}>
                            <Button type="submit" variant="filled" color="green" fullWidth mt="xl">
                                Save Profile
                            </Button>
                            <Button type="submit" variant="outline" fullWidth mt="xl" color="red">
                                Delete Accont
                            </Button>
                        </SimpleGrid>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Avatar src={'https://nextui.org/images/card-example-1.jpeg'} size={'xxl'} radius={'sm'}></Avatar>
                        <Space h={'sm'} />
                        <Button variant="default" size="xs" fullWidth>Upload Avatar</Button>
                    </Grid.Col>
                </Grid>
            </Paper>
        </DashboardLayout>
    );
}