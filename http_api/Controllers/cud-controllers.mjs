import {cud_module} from "../Modules/CUD.mjs"

export class cud_controller(){

	static verify_data(req, res, next){

		const {table, data} = req.query;
		
		switch(table){
			case "tarea":
					
				break
		}

	}

}
