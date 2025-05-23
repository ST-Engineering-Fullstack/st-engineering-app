import { Button, Modal } from 'antd';
import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type ConfirmModalProps = PropsWithChildren<{
    open: boolean;
    setOpen: (open: boolean) => void;
    handleOk?: (result: boolean) => void;
    handleCancel?: () => void;
    showOK?: boolean;
    showCancel?: boolean;
    btnOkText?: string;
    btnCancelText?: string;
    isLoadingBtn?: boolean;
    className?: string;
    classNameModal?: string;
}>;

export default function ConfirmModal({
    open,
    setOpen,
    handleOk,
    handleCancel,
    showOK = true,
    showCancel = true,
    btnOkText,
    btnCancelText,
    isLoadingBtn,
    className,
    classNameModal,
    children,
}: ConfirmModalProps) {
    return (
        <Modal
            centered
            open={open}
            closable={false}
            footer={null}
            className={twMerge('w-full md:!w-[494px]', classNameModal)}
        >
            <div className='flex flex-col gap-[45px] px-6 pt-[49px] pb-[14px]'>
                <div
                    className={twMerge(
                        'self-center text-base font-normal font-pretendard text-grey-13',
                        className
                    )}
                >
                    {children}
                </div>

                <div className='flex flex-row self-center gap-4'>
                    {showCancel && (
                        <Button
                            onClick={() => {
                                if (handleCancel) {
                                    handleCancel();
                                } else {
                                    setOpen(false);
                                }
                            }}
                            className='!px-[40px] !py-2 !h-[40px] border border-gray-500 text-[#444444] hover:bg-[#F4F7FB]'
                        >
                            {btnCancelText ? btnCancelText : 'Cancel'}
                        </Button>
                    )}
                    {showOK && (
                        <Button
                            loading={isLoadingBtn}
                            type='primary'
                            onClick={() => {
                                if (handleOk) {
                                    handleOk(true);
                                } else {
                                    setOpen(false);
                                }
                            }}
                            className='!px-[40px] !py-2 !h-[40px] bg-primary-500 text-white hover:!bg-primary-400 hover:border-gray-500'
                        >
                            {btnOkText ? btnOkText : 'Confirm'}
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}
