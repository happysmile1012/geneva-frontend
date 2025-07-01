import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
function TextInput({
    askQuestion,
    inputRef,
    waitingAnswer
}) {
    const [query, setQuery] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                console.log('Shift + Enter pressed');
            } else {
                e.preventDefault();
                askQuestion(query);
                setQuery('');
            }
        }
    };
    // Function to handle the auto resizing of the textarea
    const handleInputChange = (e) => {
        setQuery(e.target.value);
        const textarea = e.target;
        textarea.style.height = 'auto'; // Reset height before recalculating
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    };
    return <div
        className="flex w-full pb-2 cursor-text flex-col items-center justify-center rounded-[20px] border border-[#F1E2FA] contain-inline-size overflow-clip bg-white dark:bg-black shadow-[10px_1px_20px_1px_black]">
        <Textarea
            ref={inputRef}
            className="resize-none max-h-48 overflow-auto !border-none focus-visible:ring-0 !
                none ml-2 !min-h-8 bg-white dark:bg-black !text-xl"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows="1" // Initially set to 1 row
            placeholder="Ask Geneva anything"
        />
        <div className="flex w-full px-2">
            <img src="/image/logo.png" alt="logo" className="w-[30] ml-auto cursor-pointer"
                onClick={() => {
                    if (!waitingAnswer) {
                        askQuestion(query);
                        setQuery('');
                    }
                }} />
        </div>
    </div>
}

export default TextInput;
