import { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { Button, Container, Flex, Group, LoadingOverlay, Pagination, Paper, Space, Title, Text, Modal, Box, TextInput, NumberInput, MultiSelect, Badge, Table } from "@mantine/core";
import { useAxios } from "@/common/service/api.service";
import { IProductFindResponseDto } from "@/common/interfaces/product/product.dto";
import { GET_API_ROUTE } from "@/constants/api.config";
import { IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { hasLength, useForm } from "@mantine/form";
import { IProduct } from "@/common/interfaces/product/product.interface";
import { AxiosResponse } from "axios";

export default function ProductPage() {
    const limit = 10;
    const [activePage, setActivePage] = useState(1);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedCategories, setSelectedCategories] = useState<{ value: string, label: string }[]>([]);
    const form = useForm({
        initialValues: {
            name: '',
            category: [''],
            description: '',
            price: 1,
            stock: 1
        },
        validate: {
            'name': hasLength({ min: 1, max: 50 }),
            'description': hasLength({ min: 1, max: 250 })
        }
    });
    const [{ data: fetchData, loading: fetchLoading, error: fetchError }, fetch] = useAxios<IProductFindResponseDto>({
        url: GET_API_ROUTE('product', 'find'),
        method: 'POST',
        data: { name: "", category: [], description: "", page: activePage, limit },
    }, { manual: false });
    const [{ data: createData, loading: createLoading, error: createError }, create] = useAxios<IProduct>({
        url: GET_API_ROUTE('product', 'create'),
        method: 'POST',
        data: form.values
    });

    const onCreateResponse = (response: AxiosResponse<IProduct>) => {
        if (response.data?._id) {
            form.reset();
            close();
            fetch();
        }
    }

    return (
        <DashboardLayout label="Product">
            <LoadingOverlay visible={fetchLoading || createLoading} />
            <Container fluid>
                <Paper p={'md'} pt={'lg'} radius={'md'} shadow={'md'} withBorder>
                    <Flex justify={'space-between'} align={'center'}>
                        <Title sx={{ fontSize: '1.05rem' }}>
                            Product Management
                        </Title>
                        <Button leftIcon={<IconSettings />} variant={'default'} onClick={open}>New</Button>
                    </Flex>
                    <Space h={'md'} />
                    <div style={{ overflowX: 'auto' }}>
                        <Table striped withBorder withColumnBorders highlightOnHover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Categories</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fetchData ? <>
                                    {fetchData.products.map((product) => (
                                        <tr>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td width={'200px'}>{product.price}</td>
                                            <td width={'200px'}>{product.stock}</td>
                                            <td width={'255px'}>
                                                <Group>
                                                    {product.category.map((value, index) => (<Badge color={index % 2 == 0 ? "green" : "yellow"} variant="light">{value}</Badge>))}
                                                </Group>
                                            </td>
                                            <td width={'180px'}>
                                                <Group position="center">
                                                    <Button variant="light">Edit</Button>
                                                    <Button variant="light" color="red">Delete</Button>
                                                </Group>
                                            </td>
                                        </tr>
                                    ))}
                                </> : null}
                            </tbody>
                        </Table>
                    </div>
                    <Group mt={'md'} position="center">
                        <Pagination value={activePage} onChange={setActivePage} total={fetchData?.total_pages ?? 0} />
                    </Group>
                </Paper>
            </Container>
            <Modal opened={opened} size={'lg'} onClose={close} title={"Create Product"}>
                <Box component={"form"} onSubmit={form.onSubmit((values) => {
                    create().then(onCreateResponse);
                })}>
                    <TextInput
                        name="name"
                        label="Name"
                        placeholder="Enter name"
                        required
                        {...form.getInputProps('name')}
                    />
                    <MultiSelect
                        name="category"
                        label="Category"
                        data={selectedCategories}
                        placeholder="Select Categories"
                        searchable
                        creatable
                        required
                        getCreateLabel={(query: any) => `+ Create ${query}`}
                        onCreate={(query: any) => {
                            const item = { value: query, label: query };
                            setSelectedCategories((current: any) => [...current, item]);
                            return item;
                        }}
                        mt={'md'}
                        {...form.getInputProps('category')}
                    />
                    <TextInput
                        name="description"
                        label="Description"
                        placeholder="Enter description"
                        required
                        mt={'md'}
                        {...form.getInputProps('description')}
                    />
                    <NumberInput
                        name="price"
                        label="Price"
                        placeholder="Enter price"
                        required
                        mt={'md'}
                        {...form.getInputProps('price')}
                    />
                    <NumberInput
                        name="stock"
                        label="Stock"
                        placeholder="Enter stock"
                        required
                        mt={'md'}
                        {...form.getInputProps('stock')}
                    />
                    <Button type={"submit"} mt={"xl"} fullWidth>
                        Create
                    </Button>
                </Box>
            </Modal>
        </DashboardLayout>
    );
}