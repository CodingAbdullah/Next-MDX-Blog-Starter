// Chat messages custom data type
import type { UIMessage } from "ai";

export default interface ChatMessagesType {
    messages: UIMessage[];
    isLoading: boolean;
    error?: Error;
}
