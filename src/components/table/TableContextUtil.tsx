import queryString from 'query-string';
import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SORT_DIRECTION } from '../../utils/enum/sort-direction.enum';

interface ITableContextUtil {
    sortField: string;
    sortOrder: SORT_DIRECTION;
    handleOnReset: () => void;
    handleSoftReset: () => void;
    handleOnChangeOrderField: (field: string) => void;
    handleChangeFilter: (filters: Record<string, any>) => void;
}

const TableContextUtil = createContext<ITableContextUtil>({
    handleSoftReset: () => { },
    handleOnChangeOrderField: () => { },
    sortField: '',
    handleOnReset: () => { },
    sortOrder: SORT_DIRECTION.ASC,
    handleChangeFilter: () => { },
});

interface TableProviderProps {
    children: ReactNode;
}

export const TableUtilProvider: FC<TableProviderProps> = ({ children }) => {
    const [sortField, setSortField] = useState<string>('DATE');
    const [sortOrder, setSortOrder] = useState<SORT_DIRECTION>(SORT_DIRECTION.DESC);
    const navigate = useNavigate();
    const location = useLocation();
    const params = queryString.parse(location.search);

    const handleChangeFilter = (filters: Record<string, any>) => {
        navigate({
            search: new URLSearchParams({
                ...Object.fromEntries(new URLSearchParams(location.search)),
                ...filters,
                page: '1',
            }).toString(),
        });
    };

    const handleSoftReset = () => {
        navigate({
            search: new URLSearchParams({
                ...Object.fromEntries(new URLSearchParams(location.search)),
                page: '1',
            }).toString(),
        });
    };

    const handleOnReset = () => {
        navigate({
            search: new URLSearchParams({
                page: '1',
            }).toString(),
        });
    };

    const handleOnChangeOrderField = (field: string) => {
        let newField = sortField;
        let newSortOrder = sortOrder;
        if (sortField === field) {
            if (sortOrder === SORT_DIRECTION.ASC) {
                newSortOrder = SORT_DIRECTION.DESC;
            } else {
                newSortOrder = SORT_DIRECTION.ASC;
            }
        } else {
            newField = field;
            newSortOrder = SORT_DIRECTION.ASC;
        }
        setSortField(newField);
        setSortOrder(newSortOrder);

        navigate({ search: queryString.stringify(params) });
    };

    return (
        <TableContextUtil.Provider
            value={{
                handleOnReset,
                handleChangeFilter,
                handleSoftReset,
                handleOnChangeOrderField,
                sortField,
                sortOrder,
            }}>
            {children}
        </TableContextUtil.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTableUtil = () => {
    const context = useContext(TableContextUtil);

    return { ...context };
};
