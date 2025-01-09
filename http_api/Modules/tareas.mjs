import {db} from "./Objects/Object-database"
import {tarea} from "./Objects/Object-tarea.mjs"

export class tareas_modules{

	static async get_tareas(category_id){

		const database = new db();
		const state = await database.get_row("tareas", ["category_id"], [category_id]);

		if(state.code != 0){
			return {error: state.error};
		}

		if(state.rows.length == 0){
			return {error: "category not found"};
		}

		return state;
	}

	static async get_all_tareas(user_id){

		const database = new db();
		const state = await database.get_row("tareas", ["user_id"], [user_id]);

		if(state.code != 0){
			return {error: state.error};
		}

		if(state.rows.length == 0){
			return {error: "tareas not found"};
		}

		return state.rows;
	}

	static async get_today(user_id){

		const database = new db();
		const today = new Date();

		const state = await database.get_row("tareas", ["user_id", "date"], [user_id, `${today.getFullYear()}-${today.getMoth()}-${today.getDate()}`]);

		if(state.code != 0){
			return {error: state.error};
		}
		if(state.rows.legth == 0){
			return {error: "tareas not found"}
		}

		return state.rows

	}



}
