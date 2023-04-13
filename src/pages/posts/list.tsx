import {
    DateField,
    TagField,
    List,
    TextField,
    useTable,
    FilterDropdown,
    useSelect
} from "@refinedev/antd";
import Select from "antd/lib/select";
// import { useTable } from "@refinedev/core"
import { Table } from "antd";
import { IPost, ICategory } from "interfaces"
import { useMany } from "@refinedev/core";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds = tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    })

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />

                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            < TextField
                                value={
                                    categoriesData?.data.find((item) => item.id === value)?.title
                                } />
                        )
                    }}

                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
            </Table>
        </List >
    )
}

// 