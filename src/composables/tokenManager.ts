export const enum CutCodes {
	CUT = 0,
	NO_CUT = 1,
	NO_CONTEXT_WINDOW_PRESENT = 2,
	NO_PER_MESSAGE_LIMIT_PRESENT = 3
}

type EndSuccessStatus = { needCut: false, fall: true, message: string } | { needCut: boolean, fall: false };

export class TokenManager {
	private lastTotalTokens: number;
	private perMessageLimit: number;
	private maxTokensSet: number;

	constructor() {
		this.perMessageLimit = 0;
		this.maxTokensSet = 0;
		this.lastTotalTokens = 0;
	}

	private checkLimit(): boolean {
		return this.perMessageLimit != 0;
	}

	private checkMaxTokens() {
		return this.maxTokensSet != 0;
	}

	updateLastTotalTokens(total_tokens: number){
		console.log(`updateLastTotalTokens() call. values:\ntotal_tokens: ${total_tokens}`);
		this.lastTotalTokens = total_tokens;
	}

	setPerMessageLimit(limit: number) {
		this.perMessageLimit = limit;
	}

	setMaxTokens(maxTokens: number) {
		this.maxTokensSet = maxTokens;
	}

	needCut() {
		if (!this.checkLimit()) { return CutCodes.NO_PER_MESSAGE_LIMIT_PRESENT; }
		if (!this.checkMaxTokens()) { return CutCodes.NO_CONTEXT_WINDOW_PRESENT; }
		
		console.log('lastTotalTokens: ', this.lastTotalTokens);
		console.log('perMessageLimit: ', this.perMessageLimit);
		console.log('maxTokens: ', this.maxTokensSet);
		if (this.lastTotalTokens + this.perMessageLimit < this.maxTokensSet) {
			
			return CutCodes.NO_CUT;
		}
		return CutCodes.CUT;
	}

	checkEndSuccess(total_tokens: number, finish_reason: string): EndSuccessStatus {
		let ret: EndSuccessStatus;

		if (this.maxTokensSet < total_tokens) {
			return { needCut: false, fall: true, message: "Неверное значение максимального размера окна контекста! Проверьте в настройках" };
		}
		else if (finish_reason === "length") {
			ret = { needCut: true, fall: false };
		}
		else{
			ret = { needCut: false, fall: false };	
		}
		this.updateLastTotalTokens(total_tokens);
		return ret;
	}
}