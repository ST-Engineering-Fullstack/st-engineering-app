import { Button } from "antd";
import { useState } from "react";
import type { CSVDTO } from "../../../../apis/csv/dto/csv.dto";
import TrashOutlineIcon from "../../../../components/icons/TrashOutlineIcon";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import { TableHeaderCell } from "../../../../components/table/TableHeaderCell";
import { formatFileSize } from "../../../../utils/file.helper";

export const CSVManagementColumn = () => {

    const [openCSVModal, setOpenCSVModal] = useState<'cancel' | 'confirm' | boolean>(
        false
    );

    return [
        {
            title: () => <TableHeaderCell key='id' label='ID' />,
            key: 'id',
            render: ({ ...props }: CSVDTO) => {
                return <div>{props._id}</div>;
            },
        },
        {
            title: () => <TableHeaderCell key='FileName' label='File Name' />,
            key: 'FileName',
            render: ({ ...props }: CSVDTO) => {
                return <p className='w-[150px] truncate font-medium'>{props.filename ? props.filename : 'N/A'}</p>;
            },
        },
        {
            title: () => <TableHeaderCell key='mimeType' label='Media Type' />,
            key: 'mimeType',
            render: ({ ...props }: CSVDTO) => {
                return <div>{props.mimeType}</div>;
            },
        },
        {
            title: () => <TableHeaderCell key='originalName' label='Original Name' />,
            key: 'originalName',
            render: ({ ...props }: CSVDTO) => {
                return <div>{props.originalName ? props.originalName : 'N/A'}</div>;
            },
        },
        {
            title: () => <TableHeaderCell key='size' label='Size' />,
            key: 'size',
            render: ({ ...props }: CSVDTO) => {
                return <div>{props.size ? formatFileSize(props.size) : 'N/A'}</div>;
            },
        },
        {
            title: <TableHeaderCell key='action' label='Actions' />,
            key: 'action',
            render: ({ ...props }: CSVDTO) => (
                <div className='flex items-center gap-2'>
                    <Button
                        className='!px-4 !py-5 text-sm'
                        onClick={() => setOpenCSVModal('confirm')}
                    >
                        <TrashOutlineIcon className='h-4 w-4 text-primary-500' />
                    </Button>
                    <ConfirmModal
                        open={openCSVModal === 'confirm'}
                        setOpen={setOpenCSVModal}
                    // handleOk={handleOk}
                    >
                        Do you want to delete this file?
                    </ConfirmModal>
                </div>
            ),
        },
    ];
};