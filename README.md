# Ozon Product Title Generator Chrome Extension

A Chrome extension that automatically generates optimized Russian titles for Ozon product pages using AI, with additional features for tag generation and color name translation.

## Features

- **AI-Generated Russian Titles**: Automatically generate optimized Russian product titles based on existing product information
- **Tag Generation**: Generate relevant tags for products
- **Color Name Translation**: Automatically translate color names to English
- **SKU Field Filling**: Auto-fill SKU prefixes and models
- **Symbol Replacement**: Replace special symbols (—→-, «→<, »→>)
- **Chinese Character Removal**: Ensure titles have no Chinese characters
- **Multi-Region AI Support**: Works with both domestic and international Qwen AI endpoints

## Installation

1. Clone or download this repository to your local machine
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension should now appear in your Chrome extensions list

## Configuration

1. Click on the extension icon in the Chrome toolbar
2. Enter your Qwen AI API Key in the settings popup
3. Select your region (Mainland China or Singapore)
4. Click "Save" to store your configuration

## Usage

1. Navigate to a Dianxiaomi Ozon product page
2. Click the "AI Generate" button that appears on the page
3. The extension will:
   - Connect to Qwen AI
   - Analyze the product information
   - Generate optimized Russian title and tags
   - Translate color names to English
   - Fill the generated content back into the form fields

## Technical Details

- **Manifest Version**: V3
- **Background Script**: Handles API calls to Qwen AI
- **Content Script**: Manipulates the DOM and processes page content
- **Storage**: Uses Chrome's storage API to securely store API keys
- **AI Integration**: Uses Qwen AI for content generation

## Troubleshooting

### Common Issues

1. **API Key Error**: Ensure you've entered a valid Qwen AI API Key in the settings
2. **Color Name Translation Issues**: Make sure color name fields are properly identified
3. **Extension Context Invalidated**: Refresh the page and try again
4. **Keyword Field Not Found**: The extension will use the title as a fallback

### Error Messages

- "未设置 Qwen API Key，请在插件设置中配置": Enter your API Key in the settings
- "Extension context invalidated": Refresh the page and try again
- "Failed to find keyword field": The extension will use alternative sources for keywords

## Files

- `manifest.json`: Extension configuration
- `content.js`: Main content script with core functionality
- `background.js`: Background script for API calls
- `popup.html`: Settings interface
- `popup.js`: Settings functionality

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.