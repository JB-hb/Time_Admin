import {table} from "./Object-table.mjs"

export class reward{

	constructor(id, description, user_id, category){
		super(table_name, values, columns)
		this.columns = ["id", "description", "user_id", "category"];
		this.values = [id ?? null, description ?? null, user_id ?? null, category ?? null];
		this.table_name = "rewards"
	}

}
