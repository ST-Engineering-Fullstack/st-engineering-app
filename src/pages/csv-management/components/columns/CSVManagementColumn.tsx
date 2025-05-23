import type { CSVDTO } from "../../../../apis/csv/dto/csv.dto";
import { TableHeaderCell } from "../../../../components/table/TableHeaderCell";
import { DATE_TIME_SHORT_FORMAT } from "../../../../constants/date.constant";
import { formatFileSize } from "../../../../utils/file.helper";
import { IMAGES } from "../../../../utils/theme";
import { getDateInFormat } from "../../../../utils/time.helper";

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
                    <p className="w-[150px] truncate font-medium flex gap-2 items-center">
                        <img src={IMAGES.ICONS.CSV_ICON} alt="csv-icon" className="w-10 h-10" />
                        {props.filename ? props.filename : "N/A"}
                    </p>
                );
            },
        },
        {
            title: () => <TableHeaderCell key="uploadedAt" label="Uploaded At" />,
            key: "uploadedAt",
            render: ({ ...props }: CSVDTO) => {
                return <div>{props.uploadedAt ? getDateInFormat(props?.uploadedAt, DATE_TIME_SHORT_FORMAT) : "N/A"}</div>;
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
                return <div
                    className="w-[150px] truncate"
                    title={props.originalName || "N/A"}
                >
                    {props.originalName || "N/A"}
                </div>;
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
