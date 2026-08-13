import type { MemoryController } from "./memoryController";
import type { ComposerType } from "./useComposer";
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
	composer: ComposerType;
	memoryController: MemoryController;
	
	constructor(composer: ComposerType){
		this.toolBindings = {};
		this.composer = composer;
		this.memoryController = this.composer.memoryController;
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

	private tool_save = (args: Record<string, unknown>): ArgumentsParsingResult =>{
		console.log('[tool_save()]: args: ', args);
		const save = (collectionName: string, value: string) => {
			this.memoryController.save(collectionName, value);
		}

		const argsValidObject = new ObjectValidator(args)
			.hasProperty('collectionName')
			.hasProperty('value')
			.validate<{
				collectionName: string,
				value: string
			}>();
		if(!argsValidObject.result){
			return{
				status: false,
				message: "Не предоставлено поле collectionName или поле value"
			}
		}

		const {result: collectionNameIsValid, str: collectionName} = new StringExpected(argsValidObject.object.collectionName).isNotEmpty().validate();
		if(!collectionNameIsValid){
			return{
				status: false,
				message: "Поле collectionName пустое или не строка"
			}
		}

		const {result: valueIsValid, str: value} = new StringExpected(argsValidObject.object.value).isNotEmpty().validate();
		if(!valueIsValid){
			return{
				status: false,
				message: "Поле value пустое или не строка"
			}
		}

		save(collectionName, value);
		return{
			status: true,
			result: "Запись успешно сохранена"
		}
	}
	private tool_edit = (args: Record<string, unknown>): ArgumentsParsingResult =>{

		const edit = (collectionName: string, recordId: string, value: string) => {
			this.memoryController.edit(collectionName, recordId, value);
		}

		const argsValidObject = new ObjectValidator(args)
			.hasProperty('collectionName')
			.hasProperty('recordId')
			.hasProperty('value')
			.validate<{collectionName: unknown, recordId: unknown, value: unknown}>()
		if(!argsValidObject.result){
			return{
				status: false,
				message: "Не предоставлено одно или несколько из полей: collectionName, recordId, value"
			}
		}

		const {result: collectionNameIsValid, str: collectionName} = new StringExpected(argsValidObject.object.collectionName).isNotEmpty().validate();
		if(!collectionNameIsValid){
			return{
				status: false,
				message: "поле collectionName пустое или не строка"
			}
		}

		const {result: recordIdIsValid, str: recordId} = new StringExpected(argsValidObject.object.recordId).isNotEmpty().validate();
		if(!recordIdIsValid){
			return{
				status: false,
				message: "поле recordId пустое или не строка"
			}
		}

		const {result: valueIsValid, str: value} = new StringExpected(argsValidObject.object.value).isNotEmpty().validate();
		if(!valueIsValid){
			return{
				status: false,
				message: "поле value пустое или не строка"
			}
		}

		edit(collectionName, recordId, value);
		return{
			status: true,
			result: `Запись ${recordId} в коллекции ${collectionName} успешно обновлена`
		}
	}

	private tool_deleteCollection = (args: Record<string, unknown>): ArgumentsParsingResult => {

		const deleteCollection = (collectionName: string) => {
			this.memoryController.deleteCollection(collectionName);
		}

		const argsValidObject = new ObjectValidator(args).hasProperty('collectionName').validate<{collectionName: unknown}>();

		if(!argsValidObject.result){
			return{
				status: false,
				message: "Обязательное поле collectionName не предоставлено"
			}
		}

		const {str: collectionName, result: collectionNameIsValid} = new StringExpected(argsValidObject.object.collectionName).isNotEmpty().validate();
		if(!collectionNameIsValid){
			return{
				status: false,
				message: `Обязательное поле collectionName не string или пустое`
			}
		}

		deleteCollection(collectionName);
		return{
			status: true,
			result: `Коллекция ${collectionName} успешно удалена`
		}
	}

	private tool_deleteRecord = (args: Record<string, unknown>): ArgumentsParsingResult => {

		const deleteRecord = (collectionName: string, recordId: string) => {
			this.memoryController.deleteRecord(collectionName, recordId);
		}

		const argsValidObject = new ObjectValidator(args).hasProperty('collectionName').hasProperty('recordId').validate<{collectionName: unknown, recordId: unknown}>();

		if(!argsValidObject.result){
			return{
				status: false,
				message: `Обязательно поле collectionName или recordId не предоставлено`
			}
		}

		const {str: collectionName, result: collectionNameIsValid} = new StringExpected(argsValidObject.object.collectionName).isNotEmpty().validate();
		if(!collectionNameIsValid){
			return{
				status: false,
				message: `Значение поля collectionName не string или пустое`
			}
		}

		const {str: recordId, result: recordIdIsValid} = new StringExpected(argsValidObject.object.recordId).isNotEmpty().validate();
		if(!recordIdIsValid){
			return{
				status: false,
				message: `Значение поля recordId не string или пустое`
			}
		}

		deleteRecord(collectionName, recordId);
		return{
			status: true,
			result: `Запись ${recordId} успешно удалена из коллекции ${collectionName}`
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
			'roll': this.tool_roll,
			'save': this.tool_save,
			'edit': this.tool_edit,
			'deleteRecord': this.tool_deleteRecord,
			'deleteCollection': this.tool_deleteCollection,
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