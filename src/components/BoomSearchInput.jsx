import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import getCaretCoordinates from 'textarea-caret';

function BoomSearchInput({
    searchProduct,
    setCategory,
    inputRef,
    setIcon,
    defaultQuery
}) {

    const [iconOffset, setIconOffset] = useState(8);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setQuery(defaultQuery);
    }, [defaultQuery])

    useEffect(() => {
        if (inputRef.current) {
            let space = 30;
            if (inputRef.current.value == '') space += 35;
            const coords = getCaretCoordinates(inputRef.current, 0);
            setIconOffset(coords.left - space);
            setIcon(true);
        }
    }, [])

    useEffect(() => {
        if (inputRef.current) {
            let space = 30;
            if (inputRef.current.value == '') space += 35;
            const coords = getCaretCoordinates(inputRef.current, 0);
            setIconOffset(coords.left - space);
            // setIcon(true);
        }
    }, [query])

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        let space = 30;
        if (e.target.value == '') space += 15;
        const coords = getCaretCoordinates(e.target, 0);
        setIconOffset(coords.left - space); // `left` is x-coordinate of caret
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                console.log('Shift + Enter pressed');
            } else {
                e.preventDefault();
                setCategory('');
                searchProduct(query, 'search');
            }
        }
    };
    
    return <div className="flex mx-auto px-3 md:px-4 w-full py-3">
        <div className="mx-auto flex flex-col flex-1 gap-4 md:gap-5 lg:gap-6 md:max-w-3xl xl:max-w-[48rem] justify-center items-center">
            <div className="relative flex w-full pb-2 cursor-text flex-col items-center justify-center rounded-[20px] contain-inline-size">
                <div
                    className="absolute inset-y-0 flex pointer-events-none self-start mt-3"
                    style={{ left: `${iconOffset}px` }}
                >
                    <img src="/image/search.png" alt="logo" className="w-[20] h-[20] ml-auto" />
                </div>
                <Textarea
                    ref={inputRef}
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="resize-none max-h-48 overflow-auto !border-none focus-visible:ring-0 !shadow-none !text-xl text-center"
                    rows="1"
                    placeholder="Search ..."
                />
            </div>
        </div>
    </div>
}

export default BoomSearchInput;