document.addEventListener('DOMContentLoaded', function () {
  loadSettings();
  document.getElementById('saveButton').addEventListener('click', saveSettings);
});

function loadSettings() {
  chrome.storage.local.get(['qwenApiKey', 'qwenRegion', 'qwenLogistics'], function (result) {
    if (result.qwenApiKey) {
      document.getElementById('apiKey').value = result.qwenApiKey;
    }
    if (result.qwenRegion) {
      document.getElementById('region').value = result.qwenRegion;
    }
    if (result.qwenLogistics) {
      document.getElementById('logistics').value = result.qwenLogistics;
    }
  });
}

function saveSettings() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const region = document.getElementById('region').value;
  const logistics = document.getElementById('logistics').value;

  if (!apiKey) {
    showStatus('请输入 Qwen API Key', 'error');
    return;
  }

  chrome.storage.local.set(
    {
      qwenApiKey: apiKey,
      qwenRegion: region,
      qwenLogistics: logistics
    },
    function () {
      showStatus('设置保存成功', 'success');
      console.log('Qwen 设置已保存', { apiKey, region });
    }
  );
}

function showStatus(message, type) {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;
  statusElement.className = `status ${type}`;
  statusElement.style.display = 'block';

  setTimeout(function () {
    statusElement.style.display = 'none';
  }, 3000);
}
