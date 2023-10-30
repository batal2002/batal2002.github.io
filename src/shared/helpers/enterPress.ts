import React from "react";

export const enterPress = (e: React.KeyboardEvent<HTMLDivElement>, callback: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        callback()
    }
};