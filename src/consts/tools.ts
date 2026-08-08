type ToolType = "function";
type FunctionParameterType = "object";

type FunctionParametersPropertiesTypes = "string" | "number" | "object" | "array" | "boolean" | "null"

export interface FunctionParametersProperties{
	type: FunctionParametersPropertiesTypes,
	description?: string;
	enum?: string[];
	format?: string;
	items?: FunctionParametersProperties; // Для type: "array"
  	properties?: { [key: string]: FunctionParametersProperties }; // Для type: "object"
}

export interface ToolFunctionParametersProperties{
	[key: string]: FunctionParametersProperties
}

export interface ToolFunctionParameters{
	type: FunctionParameterType;
	properties: ToolFunctionParametersProperties;
	required: string[];
}

export interface ToolFunctionDefinition{
	/*Имя функции. Макс 64 символа*/
	name: string;
	/*Описание функции для модели*/
	description?: string;
	/*Параметры которые принимает функция*/
	parameters?: ToolFunctionParameters;

	strict?: boolean;
}

export interface Tool{
	type: ToolType,
	function: ToolFunctionDefinition
}

export const TOOLS: Tool[] = [
	{
		type: "function",
		function: {
			name: "alert",
			description: "вызывает всплывающее сообщение",
			parameters: {
				type: "object",
				properties: {
					message: {
						type: "string",
						description: "Сюда передавай сообщение для вывода"
					}
				},
				required: ['message']
			}
		}
	},
	{
		type: "function",
		function: {
			name: "getTime",
			description: "возвращает тебе время на пк пользователя",
			parameters: {
				type: "object",
				properties: {
					
				},
				required: []
			}
		}
	}
]

interface ToolDefinition{
	type: "function",
	id: string,
	function: {
		name: string;
		arguments: string
	}
}

export class ToolParser{

	private id: string;
	private name: string | null;
	private arguments: Record<string, unknown> | null;

	constructor(tool: ToolDefinition){
		this.id = tool.id;
		this.name = null;
		this.arguments = null;
		if(tool.type === "function"){
			this.parseFunction(tool)
		}
	}

	private parseFunction(tool: ToolDefinition) {
		const functionCall = tool.function;
		if (functionCall.name !== undefined) {
			this.name = functionCall.name;
		}
		if (functionCall.arguments !== undefined) {
			this.arguments = (() => {
				try{
					return JSON.parse(functionCall.arguments)
				}
				catch{
					console.log('JSON.parse аргументов упал');
					return {}
				}
			})()
		}
	}

	parse(){
		return {
			id: this.id,
			name: this.name,
			arguments: this.arguments
		}
	}

}