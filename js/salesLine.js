var btnAddItems     = document.getElementById("btnAddItem");
var txtItemId       = document.getElementById("itemId");
var txtSalesQty     = document.getElementById("salesQty");
var txtSalesUnit    = document.getElementById("salesUnit");

btnAddItems.addEventListener("click", function(event){
	event.preventDefault();
	
	
	var itemTr = document.createElement("tr");
	//itemTr.className="row";

	var itemIdTd = document.createElement("td");
	//itemCodeTd.className = "col";
	var salesQtyTd = document.createElement("td");
	//qtdeTd.className = "col";
    var salesUnitTd = document.createElement("td");
	//precoTd.className="col";

	itemIdTd.textContent = txtItemId.value;
	salesQtyTd.textContent = txtSalesQty.value;
	salesUnitTd.textContent = txtSalesUnit.value;
    
    itemTr.appendChild(itemIdTd);
    itemTr.appendChild(salesQtyTd);
    itemTr.appendChild(salesUnitTd);

    var table = document.getElementById("tableBody"); //assigned to body to apply Bootstrap's classes

    table.appendChild(itemTr);
});