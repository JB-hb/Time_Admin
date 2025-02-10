import {table} from "./Object-table.mjs"

export class category{
	
	constructor(id, description, user_id){
		super();
		this.columns = ["id", "description", "user_id"];
		this.values = [id ?? null, description ?? null, user_id ?? null];
		this.table_name = "tarea_categories"
	}

}
