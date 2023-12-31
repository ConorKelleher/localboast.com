export type TextPosition = {
  startPosition: string;
  endPosition: string;
};
export type Dict<T> = {
  [key: string]: T;
};
export type ParsedTags = {
  [key: string]: null | Dict<string | TextPosition[]> | string | string[];
};
export type IgnoreList = {
  [tag: string]: null;
};
// Parses the command component of the IRC message.
export type ParsedCommand = {
  command: string;
  channel?: string;
  isCapRequestEnabled?: boolean;
  botCommand?: string;
  botCommandParams?: string;
};
export type ParsedSource = {
  nick: string | null;
  host: string;
};

export type ParsedMessage = {
  tags: ParsedTags | null;
  source: ParsedSource | null;
  command: ParsedCommand | null;
  parameters: string | null;
};
