
var _budget_value = null;
var DateLoaded;
var _data = {};
var DataKeyInit;
var DateData;

function CheckDate() {
	var m = new Model();
	DataKeyInit = m.getDateKey();
	DateData = m.getDate();
	if(localStorage["TimeKey"] == DataKeyInit && localStorage[DateData]!=undefined){
		DateLoaded = JSON.parse(localStorage[DateData]);
		_budget_value = DateLoaded[0];
		_data = DateLoaded[1];
	}
};
CheckDate();
function Start(getValue) {
	var m = new Model(_budget_value,_data,getValue);
	var v = new View();
	var c = new Controller();
	c.init(m,v);
	var DataKeyInit = m.getDateKey();
	var DateData = m.getDate();
};

Start();