
export class table{

	constructor(){
		this.columns = [];
		this.values = [];
		this.table_name = "";
	}

	is_type(){
		return(this.table_name);
	}

	get_id(){
		return values[0];
	}

	get_values(wid = false){

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

	get_columns(wid = false){

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
