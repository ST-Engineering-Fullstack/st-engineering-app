import { CSVUpload } from "../../../components/CSVUpload";
import SearchInput from "../../../components/search/SearchInput";
import { PARAM_FIELD } from "../../../utils/enum/param-field.enum";

const CSVManagementFilter = () => {


    return (
        <div>
            <CSVUpload />
            <div className='ml-1 w-full lg:w-fit my-5'>
                <SearchInput
                    placeholder='Search by name'
                    className='min-w-full lg:min-w-[390px]'
                    searchParamName={PARAM_FIELD.SEARCH_KEYWORD}
                />
            </div>
        </div>
    )
}

export default CSVManagementFilter