import { Pagination } from 'antd';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAGE_SIZE } from '../../constants/shared.constant';
import useGetValuesFromParams from '../../hooks/useGetValuesFromParams';
import { PARAM_FIELD } from '../../utils/enum/param-field.enum';
import Show from '../show/Show';

type CustomTablePaginationProps = {
    totalItems: number;
    queryKey?: string;
    isScrollAfterPageChange?: boolean;
    className?: string;
    pageSize?: number;
};

export default function CustomTablePagination({
    totalItems,
    className,
    queryKey,
    isScrollAfterPageChange = true,
    pageSize = PAGE_SIZE,
    ...props
}: CustomTablePaginationProps) {
    const page = useGetValuesFromParams([queryKey || PARAM_FIELD.PAGE]);
    const location = useLocation();
    const navigate = useNavigate();
    const params = queryString.parse(location.search);

    const totalPages = Math.ceil(totalItems / pageSize);

    const handleChangePage = (page: number) => {
        if (isScrollAfterPageChange) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        params[queryKey || PARAM_FIELD.PAGE] = page.toString();
        navigate({ search: queryString.stringify(params) });
    };

    return (
        <Show when={totalPages > 1}>
            <div className='my-10'>
                <Pagination
                    align='center'
                    total={totalItems}
                    current={+page || 1}
                    pageSize={pageSize}
                    onChange={(page: number) => handleChangePage(page)}
                    className={className}
                    {...props}
                />
            </div>
        </Show>
    );
}
