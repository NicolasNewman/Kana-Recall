export default class Timer {
	private date: Date;
	constructor() {
		this.date = new Date();
	}

	start() {
		this.date = new Date();
	}

	end() {
		return (new Date().valueOf() - this.date.valueOf()).valueOf() / 1000;
	}
}
