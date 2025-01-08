import {db} from "./Objects/Object-database.mjs"
import {tarea} from "./Objects/Object-tarea.mjs"
import {activity} from "./Objects/Object-activity.mjs"
import {habit} from "./Objects/Object-habit.mjs"
import {category} from "./Objects/Object-category.mjs"
import {reward} from "./Objects/Object-reward.mjs"

export class CUD{
	
	//items = {data}
	select_object(table, item){

		switch(table){
			case "tarea":
				return new tarea(item);
				break;
			case "activity":
				return new activity(item);
				break;
			case "habit":
				return new habit(item);
				break;
			case "category":
				return new category(item);
				break;
			case "reward":
				return new reward(item);
				break;
			default:
				return undefined;
		}

	}

	/* request must be object like {
	 * 	table: "",
	 * 	insertI: [all items],
	 * 	updateI: [all items],
	 * 	deleteI: [all items]
	 * }
	 * items = {data}
	 * this function is just for stack of data for one table
	 */
	static async cud_stack({table,insertI, updateI, deleteI}){

		db_insert = [];
		db_update = [];
		db_delete = [];

		if(insertI.length > 0){
			insertI.foreach(item => {
				let temp;

				temp = select_object(table, item);
				
				if(temp == undefined){
					return;
				} 

				db_insert.push(temp);
			}) 
		}			

		if(updateI.length > 0){
			updateI.foreach(item => {
				let temp;
				
				temp = select_object(table, item);

				if(temp == undefined){
					return;
				} 

				db_update.push(temp);
			}) 
		}

		if(deleteI.length > 0){
			deleteI.foreach(item => {
				let temp;
				
				temp = select_object(table, item);

				if(temp == undefined){
					return;
				} 

				db_delete.push(temp);
			}) 
		}

		const database = new db();
		database.set_stack(db_insert, db_update, db_delete);
		const state = await database.push_data();
		return state;
	}

	static async update_single({table, item}){
		
		const row = select_object(table, item);
		if(row == undefined){
			return;
		}
		const database = new db();
		const state = await database.updateS(row);
		
		if(state.code != 0){
			return {error: state.error}
		}

		return state;

	}

	static async insert_single(){

		const row = select_object(table, item);
		if(row == undefined){
			return;
		}
		const database = new db();
		const state = await database.insertS(row);

		if(state.code != 0){
			return {error: state.error}
		}

		return state;


	}
	
	static async delete_single(){

		const row = select_object(table, item);
		if(row == undefined){
			return;
		}
		const database = new db();
		const state = await database.deleteS(row);

		if(state.code != 0){
			return {error: state.error}
		}

		return state;


	}

}
