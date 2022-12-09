import { customAlphabet } from "nanoid"

export default function generateId () {
    const modelId = customAlphabet('0123456789abcdef', 25);
    return modelId();
} 