import { reactive } from "vue";

export const enum NotificationTypes{
	SUCCESS = 1,
	FAILURE = 2,
	WARN = 3
}

export interface Notification{
	type: NotificationTypes;
	title: string;
	message: string;
	showTime: number | undefined;
}

interface NotificationState{
	notifications: Notification[];
}

export class NotificationController{

	private state: NotificationState;
	private timeout!: number | null;
	
	constructor(){
		this.state = reactive<NotificationState>({
			notifications: [],
		});
		this.timeout = null;
	}

	private queue(){
		if(this.state.notifications.length <= 0){
			return;
		}

		const firstNotification = this.state.notifications[0];
		if(firstNotification === undefined){
			return;
		}

		console.log(firstNotification);

		if(firstNotification.showTime !== undefined && this.timeout === null){
			this.timeout = setTimeout(() => {
				this.shiftNotification();
			}, firstNotification.showTime);
		}
		else{
			return;
		}

	}

	private shiftNotification(){
		this.state.notifications.shift();
		this.timeout = null;
		this.queue();
	}

	clickCloseFirstNotification(){
		this.state.notifications.shift();
		this.queue();
	}

	pushNotification(notification: Notification){
		this.state.notifications.push(notification);
		this.queue();
	}
	
	getState(): Readonly<NotificationState>{
		return this.state;
	}
}