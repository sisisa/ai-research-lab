import { useState, useCallback, useEffect } from 'react';
import { SkillNode, LearningLogEntry } from '../types';

const STORAGE_KEY = 'google-skills-progress';
const LOGS_STORAGE_KEY = 'google-skills-logs';

const INITIAL_NODES: SkillNode[] = [
  {
    id: 'lv1',
    level: 'Lv1 村',
    title: '基礎の村',
    description: 'AIの冒険はここから始まります。',
    items: ['AIとは', '機械学習', 'データ'],
    status: 'available',
    courses: [
      { title: 'Introduction to Generative AI', url: 'https://www.cloudskillsboost.google/course_templates/536' },
      { title: 'Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }
    ]
  },
  {
    id: 'lv2',
    level: 'Lv2 森',
    title: '学習方法の森',
    description: '機械がどう学ぶのか、その道筋を辿ります。',
    items: ['教師あり学習', '教師なし学習', '強化学習'],
    status: 'locked',
    courses: [
      { title: 'ML Crash Course - Supervised Learning', url: 'https://developers.google.com/machine-learning/crash-course/framing/ml-terminology' }
    ]
  },
  {
    id: 'lv3',
    level: 'Lv3 山',
    title: '深層学習の険峰',
    description: '複雑なネットワークの頂点を目指します。',
    items: ['ニューラルネットワーク', 'CNN', 'RNN'],
    status: 'locked',
    courses: [
      { title: 'Introduction to Neural Networks', url: 'https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/video-lecture' },
      { title: 'Introduction to Image Generation', url: 'https://www.cloudskillsboost.google/course_templates/541' }
    ]
  },
  {
    id: 'lv4',
    level: 'Lv4 城',
    title: '現代AIの王城',
    description: '現在のAIブームの核心に迫ります。',
    items: ['Transformer', 'LLM', '生成AI'],
    status: 'locked',
    courses: [
      { title: 'Transformer Models and BERT Model', url: 'https://www.cloudskillsboost.google/course_templates/538' },
      { title: 'Introduction to Large Language Models', url: 'https://www.cloudskillsboost.google/course_templates/539' }
    ]
  },
  {
    id: 'lv5',
    level: 'Lv5 ダンジョン',
    title: '実践の魔宮',
    description: '学んだ知識を現実に召喚します。',
    items: ['プロンプト設計', 'RAG', 'AIアプリ'],
    status: 'locked',
    courses: [
      { title: 'Generative AI Explorer - Vertex AI', url: 'https://www.cloudskillsboost.google/paths/118' },
      { title: 'Responsible AI: Applying AI Principles', url: 'https://www.cloudskillsboost.google/course_templates/554' }
    ]
  },
];

const EMPTY_LOG: LearningLogEntry = {
  concept: '',
  reason: '',
  mechanism: '',
  example: '',
  ownWords: '',
  aiRelation: '',
};

export const useGoogleSkills = () => {
  const [nodes, setNodes] = useState<SkillNode[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [logs, setLogs] = useState<Record<string, LearningLogEntry>>({});

  // 初回マウント時に localStorage から進捗とログを読み込む
  useEffect(() => {
    // 進捗の読み込み
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const completedIds = JSON.parse(savedProgress) as string[];
        setTimeout(() => {
          setNodes(prev => {
            const newNodes: SkillNode[] = prev.map(node => ({
              ...node,
              status: (completedIds.includes(node.id) ? 'completed' : 'locked') as SkillNode['status']
            }));

            if (newNodes.length > 0) {
              newNodes[0].status = completedIds.includes(newNodes[0].id) ? 'completed' : 'available';
              
              for (let i = 0; i < newNodes.length - 1; i++) {
                if (newNodes[i].status === 'completed') {
                  if (newNodes[i+1].status !== 'completed') {
                    newNodes[i+1].status = 'available';
                  }
                }
              }
            }
            return newNodes;
          });
        }, 0);
      } catch (e) {
        console.error('Failed to load progress from localStorage', e);
      }
    }

    const savedLogs = localStorage.getItem(LOGS_STORAGE_KEY);
    if (savedLogs) {
      try {
        const parsedLogs = JSON.parse(savedLogs);
        setTimeout(() => {
          setLogs(parsedLogs);
        }, 0);
      } catch (e) {
        console.error('Failed to load logs from localStorage', e);
      }
    }
  }, []);

  const selectNode = useCallback((id: string) => {
    setSelectedNodeId(id);
  }, []);

  const updateLog = useCallback((id: string, entry: Partial<LearningLogEntry>) => {
    setLogs((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || EMPTY_LOG), ...entry },
    }));
  }, []);

  // ログを明示的に保存する
  const saveLogs = useCallback(() => {
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const completeNode = useCallback((id: string) => {
    setNodes((prev) => {
      const newNodes = prev.map((node) =>
        node.id === id ? { ...node, status: 'completed' as const } : node
      );

      // 次のレベルをアンロック
      const currentIndex = prev.findIndex((n) => n.id === id);
      if (currentIndex !== -1 && currentIndex < prev.length - 1) {
        if (newNodes[currentIndex + 1].status !== 'completed') {
          newNodes[currentIndex + 1].status = 'available';
        }
      }

      // 進捗を localStorage に保存
      const completedIds = newNodes.filter(n => n.status === 'completed').map(n => n.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
      
      // 完了時にもログを保存
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));

      return newNodes;
    });
  }, [logs]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;
  const currentLog = selectedNodeId ? logs[selectedNodeId] || EMPTY_LOG : null;

  return {
    nodes,
    selectedNode,
    currentLog,
    selectNode,
    updateLog,
    saveLogs,
    completeNode,
  };
};
