import {cud_module} from "../Modules/CUD.mjs"

export class cud_controller(){

	static async create(req, res){
		const {table} = req.params
		const {data} = req.body

		const result = await cud_module.insert_single(table, data)
		res.json(result)
	}	

	static async update(req, res){
		const {table} = req.params
		const {data} = req.body

		const result = await cud_module.update_single(table, data)
		res.json(result)
	}

	static async remove(req, res){
		const {table} = req.params
		const {data} = req.body

		const result = await cud_module.delete_single(table, data)
		res.json(result)
	}

}
