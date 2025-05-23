import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getCSVListAPI } from "../../../apis/csv/csv";
import type { CSVDTO } from "../../../apis/csv/dto/csv.dto";
import CustomTablePagination from "../../../components/table/CustomTablePagination";
import { TableBuilder } from "../../../components/table/TableBuilder";
import { PARAM_FIELD } from "../../../utils/enum/param-field.enum";
import CSVManagementFilter from "./CSVManagementFilter";
import { CSVManagementColumn } from "./columns/CSVManagementColumn";

const CSVManagementList = () => {
    const location = useLocation();
    const query = queryString.parse(location.search);

    const queryParams = useMemo(() => {
        const currentPage = +(query['currentPage'] || 1);
        const limit = +(query['limit'] || 5);
        const totalPages = +(query['totalPages'] || 5);
        const pageSize = +(query['pageSize'] || 5);
        const total = +(query['total'] || 5);
        const searchKeyword = query['searchKeyword'] as string;

        return {
            currentPage,
            limit,
            totalPages,
            total,
            searchKeyword,
            pageSize
        };
    }, [query]);

    const { data, isFetching, isLoading } = useQuery({
        queryKey: ['csvList', queryParams.currentPage, queryParams.limit, queryParams.searchKeyword],
        queryFn: async () => {
            try {
                const response = await getCSVListAPI(queryParams);
                return response;
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        },
        enabled: true,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    return (
        <div className="relative">
            <h1 className="font-bold text-2xl my-2 text-gray-600">My Files & Assets</h1>
            <CSVManagementFilter />
            <TableBuilder<CSVDTO>
                rowKey='_id'
                columns={CSVManagementColumn()}
                data={data?.data?.files || []}
                isLoading={isLoading || isFetching}
            />
            <CustomTablePagination
                totalItems={data?.data?.total || 0}
                pageSize={queryParams.totalPages}
                queryKey={PARAM_FIELD.CURRENT_PAGE}
                isScrollAfterPageChange
            />
        </div >
    );
}

export default CSVManagementList;