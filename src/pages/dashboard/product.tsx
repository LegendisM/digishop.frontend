import { useContext, useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { Button, Container, Flex, Group, LoadingOverlay, Pagination, Paper, Space, Title, Modal, Box, TextInput, NumberInput, MultiSelect, Badge, Table } from "@mantine/core";
import { useAxios } from "@/common/service/api.service";
import { IProductFindResponseDto } from "@/common/interfaces/product/product.dto";
import { GET_API_ROUTE } from "@/constants/api.config";
import { IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { hasLength, useForm } from "@mantine/form";
import { IProduct } from "@/common/interfaces/product/product.interface";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { AuthContext } from "@/components/common/auth";

export default function ProductPage() {
    const { auth, user } = useContext(AuthContext);
    const limit = 10;
    const [actionMode, setActionMode] = useState<"Create" | "Edit">("Create");
    const [activePage, setActivePage] = useState(1);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedCategories, setSelectedCategories] = useState<{ value: string, label: string }[]>([]);
    const form = useForm({
        initialValues: {
            name: '',
            category: ['General'],
            description: '',
            price: 1,
            stock: 1
        },
        validate: {
            'name': hasLength({ min: 1, max: 50 }),
            'description': hasLength({ min: 1, max: 250 })
        }
    });
    const [{ data: fetchData, loading: fetchLoading, error: fetchError }, fetchProducts] = useAxios<IProductFindResponseDto>({
        url: GET_API_ROUTE('product', 'find'),
        method: 'POST',
        data: {
            ...{ name: "", category: [], description: "", page: activePage, limit },
            ...(user?.roles.includes('ADMIN') ? {} : { owner: user?.id })
        },
    }, { manual: false });
    const [{ loading: productActionLoading }, productAction] = useAxios<IProduct>({
        url: GET_API_ROUTE('product', 'create/update'),
        data: form.values
    });
    const [{ loading: productDeleteLoading }, deleteProduct] = useAxios<{ state: boolean }>({
        url: GET_API_ROUTE('product', 'delete'),
        method: 'DELETE'
    });

    const onProductNew = () => {
        form.reset();
        setActionMode("Create");
        open();
    }

    const onProductEdit = (product: IProduct) => {
        form.setValues(_.pick(product, ['name', 'category', 'description', 'price', 'stock']));
        form.setFieldValue('id', product._id);
        setActionMode("Edit");
        open();
    }

    const onProductDelete = ({ _id: id }: IProduct) => {
        deleteProduct({ data: { id } }).then((response: AxiosResponse<{ state: boolean }>) => {
            if (response.data.state) {
                fetchProducts();
            }
        });
    }

    const onProductActionResponse = () => {
        form.reset();
        close();
        fetchProducts();
    }

    useEffect(() => {
        setSelectedCategories(form.values.category.map((value) => ({ label: value, value })));
        if (!opened) {
            setActionMode("Create");
        }
    }, [opened]);

    return (
        <DashboardLayout label="Product">
            <LoadingOverlay visible={fetchLoading || productActionLoading || productDeleteLoading} />
            <Container fluid>
                <Paper p={'md'} pt={'lg'} radius={'md'} shadow={'md'} withBorder>
                    <Flex justify={'space-between'} align={'center'}>
                        <Title sx={{ fontSize: '1.05rem' }}>
                            Product Management
                        </Title>
                        <Button leftIcon={<IconSettings />} variant={'default'} onClick={onProductNew}>New</Button>
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
                                    {fetchData.products.map((product, i) => (
                                        <tr key={i}>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td width={'200px'}>{product.price}</td>
                                            <td width={'200px'}>{product.stock}</td>
                                            <td width={'255px'}>
                                                <Group>
                                                    {product.category.map((value, index) => (<Badge key={index} color={index % 2 == 0 ? "green" : "yellow"} variant="light">{value}</Badge>))}
                                                </Group>
                                            </td>
                                            <td width={'180px'}>
                                                <Group position="center">
                                                    <Button variant="light" onClick={() => onProductEdit(product)}>Edit</Button>
                                                    <Button variant="light" color="red" onClick={() => onProductDelete(product)}>Delete</Button>
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
            <Modal opened={opened} size={'lg'} onClose={close} title={`${actionMode} Product`}>
                <Box component={"form"} onSubmit={form.onSubmit((values) => {
                    productAction({
                        method: actionMode == "Create" ? "POST" : "PUT"
                    }).then(onProductActionResponse).catch(onProductActionResponse);
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
                        Submit
                    </Button>
                </Box>
            </Modal>
        </DashboardLayout>
    );
}