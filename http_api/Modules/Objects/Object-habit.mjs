import {table} from "./Object-table.mjs"

export class habit{

	constructor(id, description, frequency, user_id){
		super(table_name, columns, values)
		this.columns = ["id", "description", "frequency", "user_id"];
		this.values = [id ?? null, description ?? null, frequency ?? null, user_id ?? null];
		this.table_name = "habits"
	}
}
