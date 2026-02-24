// Tool invocation part custom data type
export default interface ToolInvocationPartType {
    type: string;
    toolName: string;
    toolCallId: string;
    state: string;
    input?: unknown;
    output?: unknown;
}
