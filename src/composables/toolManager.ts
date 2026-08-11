import { NumberValidator, ObjectValidator, StringExpected } from "./validators";

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

	// ============================================= Это пример тулза ====================================================
	// в обертку приходит неизвестный объект, в обертке нужно проверить поля и вернуть результаты тулза
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
	// ============================================= Это пример тулза ====================================================

	private tool_roll(args: Record<string, unknown>): ArgumentsParsingResult {
		function roll(min: number, max: number): number {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		const argsValidObject = new ObjectValidator(args).hasProperty('min').hasProperty('max').validate<{ min: number, max: number }>();
		if(!argsValidObject.result){return{
			status: false,
			message: "Парсер не нашел поля min или поля max"
		}}
		//Проверять, что min < max
		const {num: min, result: minIsInteger} = new NumberValidator(argsValidObject.object.min).prepare().isInteger().validate();
		if(!minIsInteger){return{
			status: false,
			message: 'значение min - не Integer, ожидался integer'
		}}
		const {num: max, result: maxIsInteger} = new NumberValidator(argsValidObject.object.max).prepare().isInteger().validate();
		if(!maxIsInteger){return{
			status: false,
			message: 'значение max - не Integer, ожидался Integer'
		}}
		if(min > max){
			return{
				status: false,
				message: 'min не может быть больше max'
			}
		}
		return{
			status: true,
			result: roll(min, max)
		}
	}

	private undefinedTool(): ArgumentsParsingResult{
		return {
			status: false,
			message: 'tool с таким именем не найден'
		}
	}

	private initTools(){
		this.toolBindings = {
			'roll': this.tool_roll
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