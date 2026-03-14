export type MapLevel = 'Lv1 村' | 'Lv2 森' | 'Lv3 山' | 'Lv4 城' | 'Lv5 ダンジョン';

export interface Course {
  title: string;
  url: string;
}

export interface SkillNode {
  id: string;
  level: MapLevel;
  title: string;
  description: string;
  items: string[];
  status: 'locked' | 'available' | 'completed';
  courses?: Course[];
}

export interface LearningLogEntry {
  concept: string;        // 概念
  reason: string;         // なぜ必要なのか
  mechanism: string;      // 仕組み
  example: string;        // 具体例
  ownWords: string;       // 自分の言葉で説明
  aiRelation: string;     // AIツールとの関係
}

export interface GoogleSkillsState {
  nodes: SkillNode[];
  selectedNodeId: string | null;
  logs: Record<string, LearningLogEntry>;
}
