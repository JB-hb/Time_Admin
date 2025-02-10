import {table} from "./Object-table.mjs"

export class activity{

	construct(id, day, description, user_id){
		super();
		this.table_name = "activities"
		this.columns = ["id", "day", "description", "user_id"];
		this.values = [id ?? null, day ?? null, description ?? null, user_id ?? null];
	}

}
