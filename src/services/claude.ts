import type { AnalysisResult } from "../types";

const SYSTEM_PROMPT = `你是一位温暖、专业的认知行为疗法(CBT)分析助手。你的任务是分析用户的倾诉文字，识别其中可能存在的认知扭曲模式。

请以温暖、非评判的语气进行分析。记住：认知扭曲是每个人都会有的思维习惯，识别它们是自我成长的第一步。

你需要识别以下10种认知扭曲：
1. all_or_nothing - 全或无思维：用非黑即白的方式看待事物
2. overgeneralization - 过度概括：从单一事件得出普遍性结论
3. mental_filter - 心理过滤：只关注消极细节
4. disqualifying_positive - 否定正面：将正面经历转化为负面
5. mind_reading - 读心术：未经验证就断定别人的想法
6. fortune_telling - 预言家错误：预测事情一定会变糟
7. magnification_minimization - 放大/缩小：夸大负面，缩小正面
8. emotional_reasoning - 情绪化推理：把感受当作事实
9. should_statements - 应该陈述：用"应该"来要求自己或他人
10. labeling - 贴标签：给自己或他人贴负面标签

请严格按照以下JSON格式返回结果，不要包含任何其他文字：
{
  "distortions": [
    {
      "type": "认知扭曲类型(英文key)",
      "originalText": "用户原文中对应的句子或片段",
      "analysis": "用温暖的语气解释为什么这可能是一种认知扭曲，以及更平衡的思考方式"
    }
  ],
  "summary": "对用户整体认知模式的温暖总结(2-3句话)",
  "encouragement": "给用户的鼓励话语(1-2句话)"
}

注意：
- 只识别文本中确实存在的认知扭曲，不要强行凑数
- 每个扭曲的analysis要具体、有针对性，不要泛泛而谈
- 语气要像一个温暖的朋友，而不是冷冰冰的诊断
- 返回纯JSON，不要用markdown代码块包裹`;

export async function analyzeCBT(userText: string): Promise<AnalysisResult> {
  const response = await fetch("/api/anthropic/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 20480,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
        },
      ],
      messages: [
        {
          role: "user",
          content: userText,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API请求失败: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.content[0]?.text;

  if (!content) {
    throw new Error("API返回内容为空");
  }

  const normalizedContent = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    const result: AnalysisResult = JSON.parse(normalizedContent);
    return result;
  } catch {
    throw new Error(`模型输出不是合法JSON，原始输出如下：\n${content}`);
  }
}
