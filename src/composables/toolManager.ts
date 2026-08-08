import { ObjectValidator, StringExpected } from "./validators";

interface ToolsCB{
	[key: string]: (args: Record<string, unknown>) => ArgumentsParsingResult
}

interface ArgumentsInvalid{
	status: false;
	message: string;
}
interface CallbackStatusSuccess{
	status: true;
	result?: any
}
interface CallbackStatusFail{
	status: false;
	message: string;
}
type CallbackStatus = CallbackStatusFail | CallbackStatusSuccess
type ArgumentsParsingResult = CallbackStatus | ArgumentsInvalid

export class ToolManager{

	toolBindings: ToolsCB;
	
	constructor(){
		this.toolBindings = {};
		this.initTools();
	}

	private tool_alert(args: Record<string, unknown>): ArgumentsParsingResult{
		function Alert(message: string): CallbackStatus{
			alert(message)
			return{
				status: true
			}
		}
		const argsValidationResult = new ObjectValidator(args).hasProperty('message').validate<{message: string}>();
		if(!argsValidationResult.result){return{
			status: false,
			message: 'Ожидался аргумент message, но не был найден'
		}}
		const message = argsValidationResult.object.message;
		const r = new StringExpected(message).isNotEmpty().validate();
		if(r.result){
			return Alert(message);
		}
		else{
			return {
				status: false,
				message: 'Переданный аргумент не прошел строковую валидацию'
			}
		}
	}

	private tool_getTime(){
		function getTime(): CallbackStatus{
			const date = new Date();
			return{
				status: true,
				result: `${date.toUTCString()}`
			}
		}
		return getTime()
	}

	private undefinedTool(): ArgumentsParsingResult{
		return {
			status: false,
			message: 'tool с таким именем не найден'
		}
	}

	private initTools(){
		this.toolBindings = {
			'alert': this.tool_alert,
			'getTime': this.tool_getTime
		}
	}

	getBinding(toolName: string){
		const toolWrapper = this.toolBindings[toolName];
		if(toolWrapper === undefined){
			return this.undefinedTool
		}
		return toolWrapper
	}

}