interface StringValidation_IsString{
	result: true;
	str: string;
}
interface StringValidation_NotString{
	result: false;
	str: ''
}
type StringValidationResult = StringValidation_IsString | StringValidation_NotString;

export class StringExpected{
	
	private str: unknown;
	private result: boolean;

	constructor(expectedString: unknown){
		this.str = expectedString;
		this.result = true;
	}

	private isString(): boolean{
		return this.result && (typeof this.str === "string");
	}

	isNotEmpty(){
		this.result = this.isString() && ((this.str as string).length !== 0);
		return this;
	}

	minLength(len: number){
		this.result = this.isString() && ((this.str as string).length >= len);
		return this;
	}
	maxLength(len: number){
		this.result = this.isString() && ((this.str as string).length <= len);
		return this;
	}
	

	hasRegexp(regexp: RegExp) {
		this.result = this.isString() && (this.str as string).match(regexp) !== null;
		return this;
	}
	hasString(string: string) {
		this.result = this.isString() && ((this.str as string).includes(string));
		return this;
	}

	validate(): StringValidationResult{
		if(this.result){
			return {
				result: true,
				str: this.str as string
			}
		}
		else{
			return {
				result: false,
				str: ''
			}
		}
	}

}

interface ObjectValid<T>{
	result: true,
	object: T
}
interface ObjectInvalid{
	result: false
}
type ObjectValidationResult<T> = ObjectValid<T> | ObjectInvalid;

export class ObjectValidator{

	private object: unknown;
	private result: boolean;

	constructor(obj: unknown){
		this.object = obj;
		this.result = true;
	}

	private isObject(){
		return this.result && typeof this.object === "object" && this.object !== null;
	}

	hasProperty(propertyName: string){
		this.result = this.isObject() && propertyName in (this.object as object);
		return this;
	}

	validate<T>(): ObjectValidationResult<T>{
		if(this.result){
			return{
				result: true,
				object: this.object as T
			}
		}
		else{
			return {
				result: false
			}
		}
	}

}

class NumberValidator{
	
	private number: number;
	private result: boolean;
	private skip: boolean;

	constructor(number: number, skip: boolean){
		this.number = number;
		this.result = true;
		this.skip = skip
	}

	private r(){
		return this.result;
	}

	gt(num: number) {
		this.result = this.r() && this.number > num;
		return this;
	}
	gte(num: number) {
		this.result = this.r() && this.number >= num;
		return this;
	}
	lt(num: number) {
		this.result = this.r() && this.number < num;
		return this;
	}
	lte(num: number) {
		this.result = this.r() && this.number <= num;
		return this;
	}

	isInteger(){
		this.result = this.r() && Number.isInteger(this.number);
		return this;
	}

	inRange(min: number, max: number){
		this.result = this.r() && this.number >= min && this.number <= max;
		return this;
	}

	validate(){
		return {
			num: this.number as number,
			result: this.result
		};
	}

}

class NumberValidatorWrapper{
	
	private number: unknown;

	constructor(num: unknown){
		this.number = num;
	}

	prepare(): NumberValidator{
		let skip: boolean;
		let num: number = 0;
		if(typeof this.number === "number"){
			num = this.number
			skip = !isNaN(this.number);
		}
		else if(typeof this.number === "string"){
			const parsed = parseFloat(this.number);
			if(!isNaN(parsed)){
				this.number = parsed;
				num = parsed
				skip = true;
			}
			else{
				skip = false;
			}
		}
		else{
			skip = false;
		}
		return new NumberValidator(num, skip);
	}

}
export {NumberValidatorWrapper as NumberValidator};