'use client';

import AlbaList from "./components/AlbaList";
import ListFilter from "./components/ListFilter";
import SearchBar from "./components/SearchBar";

export default function AlbaFormList(){



    return(
        <>
            <SearchBar />
            <ListFilter />
            <AlbaList />
        </>
    )
}