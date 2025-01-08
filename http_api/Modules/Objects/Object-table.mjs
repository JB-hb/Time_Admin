
export class table{

	constructor(){
		this.columns = [];
		this.values = [];
		this.table_name = "";
	}

	isType(){
		return(this.table_name);
	}

	getId(){
		return values[0];
	}

	getValues(wid = false){

		let response = []
		let i = wid == false ? 1 : 0

		for(i; i < values.length; i++){
			if(this.value[i] == null){
				continue;
			}
			response.push(this.value[i]);
		}

		return response;
	}

	getColumns(wid = false){

		let response = []
		let i = wid == false ? 1 : 0

		for(i; i < values.length; i++){
			if(this.value[i] == null){
				continue;
			}
			response.push(this.columns[i]);
		}

		return response;
	}
	
}
