'use client';

import AlbaList from "./components/AlbaList";
import ListFilter from "./components/ListFilter";
import SearchBar from "./components/SearchBar";

export default function AlbaFormList(){



    return(
        <>
            <SearchBar />
            <div style={{ height: '100%', backgroundColor: 'var(--background100)' }}>
                <ListFilter
                isSort={isSort}
                setIsSort={setIsSort} />
                <AlbaList />
            </div>

        </div>
    )
}