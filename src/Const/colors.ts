export type EventCode = 1 | 2 | 3;
export type TypeCode = 1 | 2 | 3;
export type Colors = "purple" | "teal" | "blue";

export const eventColors: Record<EventCode, Colors> = {
  1: "purple", // 事件一
  2: "teal", // 事件二
  3: "blue", // 事件三
};

export const typeColors: Record<TypeCode, Colors> = {
  1: "purple", // 國定假日
  2: "teal", // 機構行事曆
  3: "blue", // 個人行事曆
};

export declare type DateColorsConfig = {
  date: string;
  events: EventCode[];
  types: TypeCode[];
};
