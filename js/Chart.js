
function Chart()
{
	var radius=175,
		level_cnt=0,
		flag=false,
		theta=0,
		height,
		width,
		paper,
		st,
		nodeArray=[],
		setArr=[],
		scalefactor,
		tool,
		parseData=function(pData) {
			var i=0,
				j=0,
				x,
				y,
				theta=0,
				circle,
				txt,
				line,
				px,
				py,
				node,
				radian,
				caption,
				pRad,
				parentNodeValue=pData.value*scalefactor,
				pRad=parentNodeValue,
				spacing=120,
				mySet=paper.set();

				/*theta calculation
					a=r1+r2+k;
					cosA=b^2+c^2-a^2/2*b*c
					A=cosInverse(b^2+c^2-a^2/2*b*c);
				*/
			//A node contains child only if it has data array and 
			// its length>0
			// root level
			if(typeof pData === "object" && pData.value!==undefined && pData.label!==undefined){
				// acquire individual properties for that object
				//console.log("Parent :"+pData.label);
				//it has children
				if(Array.isArray(pData.data) && pData.data.length>0) {

					//calculating datas for parent Node
					if(level_cnt===0){
						node={nodelabel:pData.label,X:width/2,Y:height-parentNodeValue,nodeRadius:parentNodeValue,parentlabel:"None",pX:"",pY:"",angle:360,Value:pData.value};		
						nodeArray.push(node);
						
					}
					//getting children at a level
					while(i<pData.data.length) {
						// theta changes according to level
						if(level_cnt === 0) {
							theta+=360/Number(pData.data.length);
							px=width/2;
							py=height-parentNodeValue;

							
						}
						else {
							
							for(var k=0;k<nodeArray.length;k++){
								if(nodeArray[k].nodelabel === pData.label) {
									px=nodeArray[k].X;
									py=nodeArray[k].Y;
									pRad=nodeArray[k].nodeRadius;
									//Shifting according to parent to spatially distribute children nodes
									if(i===0)
										theta=nodeArray[k].angle-(75/2);
									else
										theta+=75/Number(pData.data.length-1);//+nodeArray[k].angle;
									//console.log("In "+pData.data[i].label+" added is"+nodeArray[k].angle+" whose Parent "+nodeArray[k].nodelabel);
									//console.log("So total angle of "+pData.data[i].label+" is "+theta);
									break;
								}
							}
							
						}
						//Calculate individual properties of a node/bubble
						nR=pData.data[i].value*scalefactor;
						radian=theta*(Math.PI/180);
						radius=pRad+nR+spacing;
						console.log(radius);
						x=(radius*Math.cos(radian))+(px);
						y=(py)-(radius*Math.sin(radian));
						//Creating nodes for every component
						node={nodelabel:pData.data[i].label,X:x,Y:y,nodeRadius:nR,parentlabel:pData.label,pX:px,pY:py,angle:theta,Value:pData.data[i].value};
						nodeArray.push(node);

						i++;

					}
					//radius+=20;

					
					level_cnt++;
					
					//now traverse children
					while(j<pData.data.length) {
						parseData(pData.data[j]);
						j++;
					}
				}
			}

		},
		getValue = function(id) {
			for(var i=0;i<nodeArray.length;i++) {
				if(nodeArray[i].nodelabel === id)
					return nodeArray[i].Value;
			}
			return "";
		},
		drawComponents = function() {
			var i=0,
			colorPalette=['blue','red','lime','green','aqua','maroon','purple','gray','yellow','magenta','lime','#f3a302','#0541e0','#be7853','#3e482a','#ea71e2'],
				X,
				Y,
				dataLabel,
				nodeRadius,
				pX,
				line,
				title,
				pY;
			//Drawing Chart Title
			//title=paper.text(nodeArray[0].X,nodeArray[0].Y+1.5*nodeArray[0].nodeRadius,"Bottom-Up Tree Chart(Comparative Analysis)").attr('font-size',50);
			//st.push(title);

			// Drawing line first so that nodes remain above them	
			while(i<nodeArray.length) {
				X=nodeArray[i].X;
				Y=nodeArray[i].Y;
				nodeRadius=nodeArray[i].nodeRadius;
				dataLabel=nodeArray[i].nodelabel;
				pX=nodeArray[i].pX;
				pY=nodeArray[i].pY;
				if(i>0) {
					line=paper.path(['M',pX,pY,'L',X,Y]).attr({'stroke-dasharray':'--','stroke-width':4});
					st.push(line);
				}		
				i++;
			}
			i=0;
			//Drawing circle and text
			while(i<nodeArray.length) {
				X=nodeArray[i].X;
				Y=nodeArray[i].Y;
				nodeRadius=nodeArray[i].nodeRadius;
				dataLabel=nodeArray[i].nodelabel;
				pX=nodeArray[i].pX;
				pY=nodeArray[i].pY;
				//line=paper.path(['M',pX,pY,'L',X,Y]).attr({'stroke-dasharray':'--'});
				circle = paper.circle(X, Y,0);
				// Sets the fill attribute of the circle to red (#f00)
				circle.attr({"fill": colorPalette[(i%colorPalette.length+1)],'opacity':0.8}).animate({r:nodeRadius},3000,"bounce");
				circle.id=dataLabel;
				//adding animations
				circle.mouseover(function(){

					var frac=(Number(getValue(this.id))/chartData.value*100).toFixed(2);
					//this.attr({'fill':'#06362B','opacity':0.8});
					document.getElementById(tool).style.display="block";
	                document.getElementById(tool).innerHTML="The percentage of "+ this.id +" is "+frac+"% of "+chartData.label;
				});
				circle.mouseout(function(){
					//this.attr({"fill": this.fill,'opacity':0.8});
					document.getElementById(tool).style.display="none";
				});
				txt=paper.text(X,Y-15,dataLabel).attr({'font-size':20});
				st.push(circle,txt);
				i++;

			}
		},
		adjustChartPosition = function(set_to_Adjust,moveX,moveY) {
			var l_coord = set_to_Adjust.getBBox().x,
			r_coord = set_to_Adjust.getBBox().x2,
			t_coord = set_to_Adjust.getBBox().y,
			b_coord = set_to_Adjust.getBBox().y2,
			//Calculating middle of the element
			cx = (l_coord + r_coord)/2,
			cy = (t_coord + b_coord)/2;

		//st.rotate(90,cx,cy);
		set_to_Adjust.translate(moveX,moveY);

		},
		track = function(tooltip) {
			document.onmousemove = function(e){text(e,tooltip);};
			function text(e,tooltip){
				var mx = e.clientX,
					my = e.clientY;
				
				document.getElementById(tooltip).style.left = mx+5;
				document.getElementById(tooltip).style.top = my+15;
			}
		};

	this.setData= function(data) {
		chartData=data;
	};

	this.buildChart = function(ht,wd,pap,toolId)
	{
		//paper = Raphael(0, 0, 700, 700);
		height=ht;
		width=wd;
		paper=pap;
		st=paper.set();
		tool=toolId;
		console.log((chartData.value).toString().length);
		//Calculating scale factor
		//scalefactor=(Number(chartData.value)/Math.pow(10,(chartData.value).toString().length)*5);
		scalefactor=75/Number(chartData.value);
		p_Data=parseData(chartData);
		track(toolId);
		//Drawing is done here
		drawComponents();
		//Adjusting chart position
		adjustChartPosition(st,0,-900);
		console.log(document.getElementById(toolId));
		//Tracking cursor for data display
		

		
		//onsole.log(nodeArray);
	};
}