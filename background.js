// 后台脚本，处理 API 调用的核心逻辑

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到来自内容脚本的消息:', request);
  
  if (request.action === 'callQwenAI') {
    handleQwenAICall(request.prompt)
      .then(result => {
        sendResponse({ success: true, result });
      })
      .catch(error => {
        console.error('Qwen AI 调用失败:', error);
        sendResponse({ success: false, error: error.message });
      });
    
    // 保持消息通道开启，以便异步发送响应
    return true;
  }
});

// 处理 Qwen AI 调用
async function handleQwenAICall(prompt) {
  try {
    console.log('开始处理 Qwen AI 调用，提示词:', prompt.substring(0, 100) + '...');
    
    // 从存储中获取 API Key 和地域设置
    const apiKey = await getApiKey();
    const region = await getRegion();
    
    if (!apiKey) {
      throw new Error('未设置 Qwen API Key，请在插件设置中配置');
    }
    
    // 根据地域选择 API 端点
    let apiBaseUrl;
    if (region === 'singapore') {
      apiBaseUrl = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1';
    } else {
      apiBaseUrl = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
    }
    
    const apiUrl = `${apiBaseUrl}/chat/completions`;
    console.log('使用 API 端点:', apiUrl);
    
    console.log('调用 Qwen AI API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的 Ozon 产品优化助手，负责生成高质量的俄语产品标题和标签。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });
    
    console.log('API 调用响应状态:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API 调用失败: ${response.statusText} - ${errorData.error?.message || ''}`);
    }
    
    const data = await response.json();
    console.log('Qwen AI API 响应:', data);
    
    // 解析 AI 响应
    if (!data.choices || data.choices.length === 0) {
      throw new Error('AI 响应格式错误，未找到 choices 字段');
    }
    
    const aiResponse = data.choices[0].message.content;
    console.log('AI 生成的内容:', aiResponse);
    
    // 返回原始 AI 响应，由 content script 统一解析，避免格式不一致
    return aiResponse;
  } catch (error) {
    console.error('Qwen AI 调用错误:', error);
    throw error;
  }
}


// 从存储中获取 API Key
function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.local.get('qwenApiKey', (result) => {
      resolve(result.qwenApiKey || '');
    });
  });
}

// 设置 API Key
function setApiKey(apiKey) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ qwenApiKey: apiKey }, () => {
      resolve();
    });
  });
}

// 从存储中获取地域设置
function getRegion() {
  return new Promise((resolve) => {
    chrome.storage.local.get('qwenRegion', (result) => {
      resolve(result.qwenRegion || 'china');
    });
  });
}

// 设置地域
function setRegion(region) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ qwenRegion: region }, () => {
      resolve();
    });
  });
}

// 初始化后台脚本
async function initBackgroundScript() {
  console.log('Qwen AI 插件后台脚本已初始化');

  // 检查是否已有 API Key
  const existingApiKey = await getApiKey();
  if (!existingApiKey) {
    console.log('未检测到 API Key，请在插件设置中配置');
  } else {
    console.log('已存在 API Key，跳过设置');
  }
}

// 启动初始化
initBackgroundScript();
