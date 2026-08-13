// export const OUTPUT_SCHEMA = {
// 	type: "object",
// 	properties: {
		
// 		message: {
// 			type: "string",
// 			description: "Текст хода — описания, диалоги NPC, события."
// 		},

// 		actions: {
// 			type: "array",
// 			items: {type: "string"},
// 			description: "Варианты действий пользователя. Просто чтобы было быстрее для пользователя. Он все равно может написать свое действие через поле для ввода. Если вызываешь tool можно оставить не заполненным"
// 		},

// 		tool_calls: {
// 			type: "array",
// 			description: "Массив tools, которые ты хочешь вызвать",
// 			items: {
// 				type: "object",
// 				properties: {
// 					id: {type: "string"},
// 					type: {type: "string", enum: ["function"]},
// 					function: {
// 						type: "object",
// 						properties: {
// 							name: {type: "string"},
// 							arguments: {type: "object"}
// 						},
// 						required: ["name", "arguments"]
// 					}
// 				},
// 				required: ["id", "type", "function"]
// 			}
// 		}
// 	},
// 	required: ["message", "actions", "tool_calls"]
// }

export const OUTPUT_SCHEMA = {
	type: "json_schema",
	json_schema: {
		name: "rpg_response",
		strict: true,
		schema: {
			type: "object",
			properties: {
				message: { type: "string", description: "Текст хода — описания, диалоги NPC, события. Только сюда пиши то, что должен увидеть пользователь как сообщение"},
				actions: { type: "array", items: { type: "string" }, description: "Сюда пиши предлагаемые пользователю варианты действий (action choices)" },
				tool_calls: {
					type: "array",
					items: {
						type: "object",
						properties: {
							type: { type: "string", enum: ["function"] },
							function: {
								type: "object",
								properties: {
									name: { type: "string" },
									arguments: { type: "object" }
								},
								required: ["name", "arguments"]
							}
						},
						required: ["id", "type", "function"]
					}
				}
			},
			required: ["message", "actions", "tool_calls"]
		}
	}
};