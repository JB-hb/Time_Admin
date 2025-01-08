import {v4 as uuid} from "uuid"
import {db} from "./Objects-database.mjs"

export class auth{

	static async register({password, name, mail}){

		data = {
			id: uuid(),
			password: password,
			name: name,
			mail: mail
		};

		const item = new user(data);

		const database = new db();
		const state = await database.create_user(item);

		return state;
		
	}

	static async login({user_name, password}){

		const database = new db();
		let state = await database.get_row("users",["name"], [user_name]);

		if(state.code != 0){
			return state.error;
		}

		if(state.rows.legth > 0){
			if(state.rows[0].password == pasword){
				return state.rows[0];
			}
		}

		state = await database.get_row("users",["mail"], [user_name]);

		if(state.code != 0){
			return state.error;
		}

		if(state.rows.legth == 0){
			return {error: "user not found"};
		}

		if(state.rows.legth > 0){
			if(state.rows[0].password == pasword){
				return state.rows[0];
			}
		}

		return {error: "wrong password or user"}

	}

	static async update_password({new_password, old_password, user_id}){

		let flag = 0;
		const database = new db();

		const state = await database.get_row("users",["id"], [user_id]);

		if(state.code != 0){
			return state.error;
		}

		if(state.rows.legth == 0){
			return {error: "user not found"};
		}

		if(state.rows[0].password != old_password){
			return {error: "incorrect password"};
		}	

		const data = {
			id: user_id,
			password: new_password
		}

		const item = new user(data);
		const state = await database.updateS(item);
		
		if(state.code != 0){
			return state.error;
		}

		return state;

	}
}
