import { Input } from 'antd';
import queryString from 'query-string';
import { useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import useGetValuesFromParams from '../../hooks/useGetValuesFromParams';
import { PARAM_FIELD } from '../../utils/enum/param-field.enum';
import SearchIcon from '../icons/SearchIcon';

type SearchInputProps = {
    label?: ReactNode;
    placeholder?: string;
    className?: string;
    searchParamName?: PARAM_FIELD;
};

export default function SearchInput({
    placeholder,
    className,
    searchParamName = PARAM_FIELD.SEARCH_KEYWORD,
}: SearchInputProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = queryString.parse(location.search);
    const [searchKeyword] = useGetValuesFromParams([searchParamName]);
    const [searchText, setSearchText] = useState(searchKeyword || '');

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (searchText === '') {
            delete params[searchParamName];
        } else {
            params[searchParamName] = searchText;
        }
        navigate({ search: queryString.stringify(params) });
    };

    const handleClearSearch = () => {
        setSearchText('');
        navigate({ search: '' });
    };

    return (
        <div>
            <Input
                id='search'
                placeholder={placeholder}
                className={twMerge('w-48 p-2 px-4', className)}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={handlePressEnter}
                suffix={!searchText && <SearchIcon className='size-3 text-gray-600' />}
                allowClear
                onClear={handleClearSearch}
            />
        </div>
    );
}
