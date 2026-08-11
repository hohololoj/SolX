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
			name: "roll",
			description: "возвращает тебе случайное целое число",
			parameters: {
				type: "object",
				properties: {
					min: {
						type: "number",
						description: "минимальное число (включительно): integer"
					},
					max: {
						type: "number",
						description: "максимальное число (включительно): integer"
					}
				},
				required: ['min', 'max']
			}
		}
	},
]

interface ToolDefinition{
	type: "function",
	id: string,
	function: {
		name: string;
		arguments: Record<string, unknown>
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
			// this.arguments = (() => {
			// 	try{
			// 		return JSON.parse(functionCall.arguments)
			// 	}
			// 	catch{
			// 		console.log('JSON.parse аргументов упал');
			// 		return {}
			// 	}
			// })()
			this.arguments = functionCall.arguments;
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