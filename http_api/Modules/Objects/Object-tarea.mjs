import {table} from "./Object-table.mjs"

export class tarea extends table{

	constructor(id, category_id, description, user_id, created_at){
		super(table_name,columns, values);
		this.table = "tareas";
		this.columns = ["id", "category_id", "description", "user_id", "created_at"];
		this.values = [id ?? null, category_id ?? null, description ?? null, user_id ?? null, created_at ?? null];
		this.column_enum = {
			id: 0,
			category_id: 1,
			description: 2,
			user_id: 3,
			created_at: 4,
		}
	}	

}
