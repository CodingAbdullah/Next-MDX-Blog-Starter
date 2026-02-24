// Chat input custom data type
export default interface ChatInputType {
    isLoading: boolean;
    onSendMessage: (text: string) => void;
}
