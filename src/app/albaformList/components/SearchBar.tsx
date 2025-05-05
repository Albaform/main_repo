'use client';

import Image from "next/image";
import {
  SearchBarWrapper,
  SearchBarContainer,
  SearchInput
} from "../styles";
import { useState } from "react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const searchIcon = '/images/albaformList/search.png';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <SearchBarWrapper>
        <SearchBarContainer>
          <Image src={searchIcon} alt="searchicon" width={24} height={24} />
          <SearchInput
            type="text"
            value={keyword}
            onChange={handleChange}
            placeholder="어떤 알바를 찾고 계세요?"
          />
        </SearchBarContainer>
      </SearchBarWrapper>
      

  </>
  );
}
