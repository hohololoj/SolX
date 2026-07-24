export const providerPresets = [
	{
		name: 'OpenAI',
		url: 'api.openai.com',
		model: 'gpt-4o'
	},
	{
		name: 'Anthropic',
		url: 'api.anthropic.com',
		model: 'claude-3-5-sonnet-20241022'
	},
	{
		name: 'Gemini',
		url: 'generativelanguage.googleapis.com',
		model: 'gemini-1.5-pro'
	},
	{
		name: 'Local',
		url: 'localhost:1234',
		model: ''
	}
]
export const SettingLocalId = 3;