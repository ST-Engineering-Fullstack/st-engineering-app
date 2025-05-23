import { TableUtilProvider } from '../../components/table/TableContextUtil';
import CSVManagementList from './components/CSVManagementList';

const CsvManagementPage = () => {

    return (
        <div>
            <TableUtilProvider>
                <CSVManagementList />
            </TableUtilProvider>

        </div>
    )
}

export default CsvManagementPage