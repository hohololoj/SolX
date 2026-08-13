import { reactive } from "vue";

interface DB{
	[key: string]: DBCollection
}
interface DBCollection{
	records: {
		[key: string]: string
	};
}

type MemoryState = DB;

export class MemoryController{

	private state!: MemoryState;

	constructor(){
		this.initMemoryState();
	}

	private initMemoryState(){
		this.state = reactive<MemoryState>({
			
		})
	}

	//===================== Коллекции ======================
	private isCollectionExists(collectionName: string){
		return this.state[collectionName] !== undefined;
	}
	private createCollection(collectionName: string){
		this.state[collectionName] = {
			records: {}
		}
	}
	private ensureCollection(collectionName: string){
		const collection = this.state[collectionName];
		if(!collection){
			this.createCollection(collectionName);
		}
	}
	//===================== Коллекции ======================


	//===================== Записи =========================
	private isRecordExists(collectionName: string, recordId: string){
		return this.state[collectionName]?.records[recordId] !== undefined;
	}
	private pushRecord(collectionName: string, value: string, passedId?: string){
		console.log('[memoryController.pushRecord()]: collectionName: ', collectionName);
		console.log('[memoryController.pushRecord()]: value: ', value);
		const id = passedId || `${Date.now()}`;
		this.state[collectionName]!.records[id] = value;
	}
	private editRecord(collectionName: string, id: string, value: string){
		this.state[collectionName]!.records[id] = value;
	}
	//===================== Записи =========================


	resetMemoryState(){
		for(const key in this.state){
			delete this.state[key];
		}
	}

	save(collectionName: string, value: string, id?: string){
		this.ensureCollection(collectionName);
		this.pushRecord(collectionName, value, id);
	}

	edit(collectionName: string, id: string, value: string){
		this.ensureCollection(collectionName);
		if(!this.isRecordExists(collectionName, id)){
			this.save(collectionName, value);
		}
		else{
			this.editRecord(collectionName, id, value);
		}
	}

	deleteRecord(collectionName: string, recordId: string){
		this.ensureCollection(collectionName);
		if(!this.isRecordExists(collectionName, recordId)){return}

		delete this.state[collectionName]!.records[recordId];
	}
	deleteCollection(collectionName: string){
		if(!this.isCollectionExists(collectionName)){return;}

		delete this.state[collectionName];
	}
	
	getDump(){
		return this.state;
	}

	stringDump(){
		let dump = '';
		for(const collection in this.state){
			dump += `=== Коллекция: ${collection} ===\n`;
			for(const recordId in this.state[collection]!.records){
				dump += `ID: ${recordId}: ${this.state[collection]!.records[recordId]}\n`
			}
		}
		return dump;
	}

}