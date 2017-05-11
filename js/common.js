function Model(_budget_value,_data,_getValue) {
	var getValue = _getValue;
	var budget_value = _budget_value;
	var data = _data;
	var local = [budget_value,data];

	this.local = function() {
		var newLocal = local[0];
		return newLocal;
	}
	this.data_Chart = function() {
		return data;
	}

	this.budget_Chart = function() {
		if(budget_value === null){
			budget_value = 0;
		}
		return budget_value;
	}
	this.dateCalender = function() {
		$('#calender').datepicker(
		{ 
			dateFormat: "dd:m:yy" 
		}
		);
		var _getValue = document.getElementById("calender").value;
		return _getValue;
	};
	this.getDate = function() {
		var day = new Date();
		var month = day.getMonth()+1;
		var date = day.getDate();
		var year = day.getFullYear();
		var Time = date+":"+month+":"+year;
		var TimeKey = date+":"+month;
		localStorage['TimeKey'] = TimeKey;
		return Time;
	}
	this.getDateKey = function() {
		var day = new Date();
		var month = day.getMonth()+1;
		var date = day.getDate();
		var TimeKey = date+":"+month;
		return TimeKey;
	}
	this.setLocalStorage = function() {
		var time_local = this.getDate();
		var json_local = JSON.stringify(local);
		var getValue = this.dateCalender();
		if(getValue === undefined || getValue ===""){
			localStorage[time_local] = json_local;
		}
		else{
			localStorage[getValue] = json_local;
		}
	};
	this.getLocalStorage = function() {
		var time_local = this.getDate();
		var getValue = this.dateCalender();
		if(getValue === undefined || getValue ===""){
			var getlocal = JSON.parse(localStorage.getItem(time_local));
		}
		else{
			var getlocal = JSON.parse(localStorage.getItem(getValue));
		}
		
	};
};
function View() {
	var model = null;
	var sum = 0;
	this.Chart = function(_model) {
		model = _model;
		var budget_Chart = model.budget_Chart();
		var num = model.data_Chart();
		var canvas = document.getElementById("Canvas");
		var context = canvas.getContext("2d");
		var CanvasWidth = canvas.width;
		var CanvasHeight = canvas.height;
		var rad = CanvasHeight/3;
		var endangle = 0+(Math.PI*2);
		var startangle = 0;

		if(budget_Chart === ""){
			context.strokeStyle = "#5f0000";
		}
		else{
			context.strokeStyle = "silver";
		}
		context.beginPath();
		context.lineWidth = 40;
		context.arc(CanvasWidth/2,CanvasHeight/2,rad,startangle,endangle,true);
		context.stroke();
		var viewlocal = model.local();
		if(viewlocal === null){
			sum = 0;
			document.getElementById("cost").innerHTML = "Расходы" + " " + sum + "руб.";
			console.log(sum);
		}
		for(var key in num){
			sum += Number(num[key]);
			var recalculate_value = rad*num[key]/budget_Chart;
			var num2 = rad - recalculate_value;
			startangle = endangle;
			endangle = startangle + (Math.PI*2*num2)/rad;
			context.beginPath();
			context.strokeStyle = key;
			context.arc(CanvasWidth/2,CanvasHeight/2,rad,startangle,endangle,true);
			context.stroke();
			document.getElementById("cost").innerHTML = "Расходы" + " " + sum + "руб.";
		}
	}
	var cost = 10;
	this.Budget_full = function() {
		cost = model.budget_Chart();
		document.getElementById("budget_full").innerHTML = "Бюджет" + " " + cost + "руб.";
	};
	this.DescriptionDoom = function(_Description_data,_Description_name) {
		var Description_data = _Description_data;
		var Description_name = _Description_name;
		var ParentBlock = document.getElementById("wrap_list");
		var children = document.createElement("div");
		children.classList.add("list");
		ParentBlock.appendChild(children);
		var BlockPos = document.createElement("span");
		var TextPos = document.createTextNode(_Description_name);
		BlockPos.appendChild(TextPos);
		var BlockVal = document.createElement("span");
		var TextVal = document.createTextNode(Description_data);
		BlockVal.appendChild(TextVal);
		children.appendChild(BlockPos);
		children.appendChild(BlockVal);	
	}
	this.removeList = function() {
		var childList = document.getElementsByClassName("list");
		console.log(childList);
		//for(var i = 0; i < childList.length; i++){
			//document.getElementById("wrap_list").removeChild(childList[i]);
		//}
		while (childList.length!=0){
			document.getElementById("wrap_list").removeChild(childList[0]);
		}
	};
	this.Description = function() {
		var Description = model.data_Chart();

		for(var key in Description){
			var Description_data = Description[key];
			var name = document.createElement("span");
			console.log(key,Description_data);
			switch(key){
				case "red":
				var Description_name = "Еда:";
				this.DescriptionDoom(Description_data,Description_name);
				break;
				case "green":
				var Description_name = "Жилье:";
				this.DescriptionDoom(Description_data,Description_name);
				break;
				case "orange":
				var Description_name = "Кафе:";
				this.DescriptionDoom(Description_data,Description_name);
				break;		
				case "#0b82e8":
				var Description_name = "Гигиена:";
				this.DescriptionDoom(Description_data,Description_name);
				break;
				case "#a1dc11":
				var Description_name = "Машина:";
				this.DescriptionDoom(Description_data,Description_name);
				break;	
				case "#dc119e":
				var Description_name = "Транспорт:";
				this.DescriptionDoom(Description_data,Description_name);
				break;		
				case "#1121dc":
				var Description_name = "Cпорт:";
				this.DescriptionDoom(Description_data,Description_name);
				break;
				case "#47ff47":
				var Description_name = "Здоровье:";
				this.DescriptionDoom(Description_data,Description_name);
				break;
				case "#11dcc9":
				var Description_name = "Развлечения:";
				this.DescriptionDoom(Description_data,Description_name);
				break;	
				case "#2e504d":
				var Description_name = "Такси:";
				this.DescriptionDoom(Description_data,Description_name);
				break;
				case "#35183a":
				var Description_name = "Одежда:";
				this.DescriptionDoom(Description_data,Description_name);
				break;
				case "#f44336":
				var Description_name = "Связь:";
				this.DescriptionDoom(Description_data,Description_name);
				break;
			}
		}	
	};

};
function Controller() {
	var view = null;
	var model = null;
	this.init = function(model,_view) {
		view = _view;
		view.Chart(model);
		view.Budget_full();
		model.setLocalStorage();
		model.getLocalStorage();
		model.dateCalender();
		view.Description();
	};
	var bt = document.getElementsByClassName("bt");
	for(var i = 0; i < bt.length; i++){
		bt[i].onclick = function() {
			var v = new View();
			v.removeList();
			var data_value = this.previousElementSibling.value;
			var color = this.previousElementSibling.id;
			_data[color] = data_value;
			Start();
		}
	}
	var budget_button = document.getElementById("budget_button");
	budget_button.onclick = function() {
		var v = new View();
		v.removeList();
		_budget_value = document.getElementById("budget").value;
		Start();
	};
	document.getElementById("Canvas").onclick = function() {
		document.getElementById("settings").classList.add("show");
	};
	document.getElementById("exit").onclick = function() {
		var v = new View();
		v.removeList();
		Start();
		document.getElementById("settings").classList.remove("show");
		
	};
	document.getElementById("getValue").onclick = function() {
		var m = new Model;
		var _getValue = m.dateCalender();
		if(localStorage[_getValue] === undefined){
			_budget_value = null;
			_data = {};
		}
		else{
			var DataLocal = JSON.parse(localStorage[_getValue]);
			_data = DataLocal[1];
			_budget_value = DataLocal[0];
		}
		Start(_getValue);
	};
};




// Адаптивные скрипты, которые срабатывают только при определенном разрешении экрана
(function($, document, window, viewport) {
	function resizeWindow() {
		// $("a").click(function() {
		// 	if (viewport.is("lg")) {
		// 		return false;
		// 	};
		// });
	};
	$(document).ready(function() {
		resizeWindow();
	});
	$(window).bind("resize", function() {
		viewport.changed(function(){
			resizeWindow();
		});
	});
})(jQuery, document, window, ResponsiveBootstrapToolkit);