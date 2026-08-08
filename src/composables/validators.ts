interface StringValidation_IsString{
	result: true;
	str: string;
}
interface StringValidation_NotString{
	result: false;
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
				result: false
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