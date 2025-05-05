'use client';

import AlbaList from "./components/AlbaList";
import ListFilter from "./components/ListFilter";
import SearchBar from "./components/SearchBar";
import { useState } from "react";


export default function AlbaFormList(){
const [isSort, setIsSort] = useState<
    'mostRecent' | 'mostCommented' | 'mostLiked'
  >('mostRecent');


    return(
        <div style={{ height: '100vh'}}>
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