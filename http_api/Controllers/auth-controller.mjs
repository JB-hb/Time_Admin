import {auth_module} from "../Modules/auth.mjs"

export class auth_controller(){

	#verify_mail(mail){
		const domains = ["gmail", "hotmail", "outlook", "yahoo"];
		const extensions = ["com","net","es"];
		let match = 0;
		for(let i = 0; i < domains.length, i++){
			for(let j=0; j < extensions.length(); j++){
				const temp = `${domains[i]}.${extensions[j]}`
				if(mail.includes(temp)){
					match = 1
					break;
				}

			}
			if(match == 1){
				break;
			}
		}

		if(match == 1){
			return true
		}else{
			return false 
		}

	}

	#verify_pass(req, res, next){
		const invalid_char = ['"',"+","/","-","_","*","="];
		const {password} = req.query;
		let match = 0;

		for(let i = 0; i < invalid_char.length(); i++){
			if(password.includes(invalid_char[i]){
				match = 1;
				break;
			}
		} 

		if(match == 0){
			return true
		}else{
			return false
		}

	}

	register(req, res){
		const {mail, password} = req.body

		if(this.#verify_pass(password) != true){
			res.json({error: "password not valid"})
		}
		if(this.#verify_mail(mail) != true){
			res.json({error: "mail not valid"})
		}
		
		const result = await auth_module.register(req.body)	
		res.json(result)
	}

	static async login(req, res){
		const {user_name, password} = req.body

		if(this.#verify_pass(password) != true){
			res.json({error: "password not valid"})
		}
		if(this.#verify_mail(mail) != true){
			res.json({error: "mail not valid"})
		}

		const result = await auth_module.login(req.body)
		res.json(result)
	}

	static async change_pass(req, res){
		const {old_password, new_password} = req.body
		const {user_id} = req.params

		if(this.#verify_pass(old_password) != true){
			res.json({error: "password not valid"})
		}
		if(this.#verify_pass(new_password) != true){
			res.json({error: "password not valid"})
		}

		const data = {
			old_password: old_password,
			new_password: new_password,
			user_id: user_id
		}
		const result = await auth_module.update_password(data)
		res.json(result)
	}

}
