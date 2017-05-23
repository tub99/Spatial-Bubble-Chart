function ChartManager(ht,wd,data,pap,tool)
{
	var chart=new Chart();
	chart.setData(data);
	chart.buildChart(ht,wd,pap,tool);

}