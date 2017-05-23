function WorldData()
{

	var datObj={
		"label": "World",
		"value": 100,
		"data":[
				{"label":"Africa " ,"value":10 },
				{"label":"Asia" ,"value": 70,
					"data":[
							{"label":"India","value":50,
								"data":[
										{"label":"West" ,"value":30,
											"data":[
												{"label": "Bombay","value":20},{"label":"Pune" ,"value":10}
											]
										},
										{"label": "East" ,"value":20}
								]
							},
							{"label":" SriLanka" ,"value":5},
							{"label":"Pakistan" ,"value":15,
								"data":[{"label":"Karachi" ,"value":2},{"label":"Lahore" ,"value":3},{"label":"Peshawar" ,"value":6},{"label":"Islamabad" ,"value":4}
								]
							}
						]
				},
				{"label":"Australia" ,"value": 15},
				{"label":"America" ,"value": 5}
			]
	};
	this.getData=function(){
		return datObj;
	};
}