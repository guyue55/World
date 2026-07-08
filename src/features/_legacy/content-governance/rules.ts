import type { ContentReviewRule } from './model'
export const contentReviewRules: ContentReviewRule[] = [
 { id:'private-raw-block', title:'阻止私密原文', riskLevel:'blocked', forbiddenSignals:['private raw','vault raw','sealed raw','私密原文','原文：'], decision:'reject', description:'任何私密原文信号不得进入公开构建。' },
 { id:'family-sensitive-review', title:'家庭敏感内容转人工', riskLevel:'high', forbiddenSignals:['家庭隐私','孩子原文','family raw'], decision:'requires-review', description:'家庭相关内容默认需要人工确认并脱敏。' },
 { id:'ai-action-boundary', title:'AI 动作边界', riskLevel:'high', forbiddenSignals:['自动发布','自动删除','自动改可见性'], decision:'requires-review', description:'AI 建议不能绕过人工确认。' },
]
export const publicBuildForbiddenSignals = contentReviewRules.flatMap(r=>r.forbiddenSignals)
