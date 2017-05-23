function ChartData()
{

	var datObj={
		"label": "World",
		"value": 150,
		"data":[
		//30
				{"label":"Africa " ,"value":30 ,
					"data":[
							{"label":"Egypt","value":5},
							{"label":"SouthAfrica","value":10,
								"data":[{"label":"Durban","value":7},{"label":"CapeTown","value":3}
								]
							},
							{"label":"Nigeria","value":5},
							{"label":"Algeria","value":10}
					]
				},
				//50
				{"label":"Asia" ,"value": 50,
					"data":[
							{"label":"India","value":30,
								"data":[
										{"label":"West" ,"value":10,
											"data":[
												{"label": "Bombay","value":2},{"label":"Pune" ,"value":3},{"label":"Gujarat" ,"value":5}
											]
										},
										{"label": "East" ,"value":10},
										{"label": "South" ,"value":5},
										{"label": "North" ,"value":5}
								]
							},
							{"label":" SriLanka" ,"value":5},
							{"label":"Pakistan" ,"value":15,
								"data":[{"label":"Karachi" ,"value":2},{"label":"Lahore" ,"value":3},{"label":"Peshawar" ,"value":6},{"label":"Islamabad" ,"value":4}
								]
							}
						]
				},
				//40
				{"label":"Australasia" ,"value": 40,
					"data":[{"label":"Australia","value":25,
							"data":[{"label":"Sydney","value":15},{"label":"Perth","value":10}]
					},
					{"label":"New Guinea","value":5},
					{"label":"New-Zeland","value":10}]
				},
				//30
				{"label":"America" ,"value": 30,
				"data":[
						{"label":"S1","value":10},
						{"label":"S2","value":15},
						{"label":"S3","value":2},
						{"label":"S4","value":3}
					]
				}
			]
	};
	this.getData=function(){
		return datObj;
	};
}