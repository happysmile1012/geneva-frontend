import { useState } from "react";

function LLMTitleSearch({
    setSearch
}) {
    const [searchInput, setSearchInput] = useState("");
    return <input
        className="border border-gray w-[80%] m-auto pl-6 pr-2"
        placeholder="Search..."
        value={searchInput}
        onKeyDown={(event) => {
            if (event.keyCode == 13) {
                setSearch(searchInput);
            }
        }}
        onChange={(event) => {
            setSearchInput(event.target.value);
        }}
    />
}

export default LLMTitleSearch;