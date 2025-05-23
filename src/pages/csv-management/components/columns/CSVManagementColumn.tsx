import type { CSVDTO } from "../../../../apis/csv/dto/csv.dto";
import { TableHeaderCell } from "../../../../components/table/TableHeaderCell";
import { formatFileSize } from "../../../../utils/file.helper";

export const CSVManagementColumn = () => {
    return [
        {
            title: () => <TableHeaderCell key="id" label="ID" />,
            key: "id",
            render: ({ ...props }: CSVDTO) => {
                return <div>{props._id}</div>;
            },
        },
        {
            title: () => <TableHeaderCell key="FileName" label="File Name" />,
            key: "FileName",
            render: ({ ...props }: CSVDTO) => {
                return (
                    <p className="w-[150px] truncate font-medium">
                        {props.filename ? props.filename : "N/A"}
                    </p>
                );
            },
        },
        {
            title: () => <TableHeaderCell key="mimeType" label="Media Type" />,
            key: "mimeType",
            render: ({ ...props }: CSVDTO) => {
                return <div>{props.mimeType}</div>;
            },
        },
        {
            title: () => <TableHeaderCell key="originalName" label="Original Name" />,
            key: "originalName",
            render: ({ ...props }: CSVDTO) => {
                return <div>{props.originalName ? props.originalName : "N/A"}</div>;
            },
        },
        {
            title: () => <TableHeaderCell key="size" label="Size" />,
            key: "size",
            render: ({ ...props }: CSVDTO) => {
                return <div>{props.size ? formatFileSize(props.size) : "N/A"}</div>;
            },
        },
    ];
};
