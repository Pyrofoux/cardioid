// Save list manipulation functions
function save()
{
	var list = getList();


	current_pattern = {"resolution":resolution,"coefficient":coefficient};

	//Check if saved item is not already in list
	for(var i in list)
	{
		if(list[i].resolution == current_pattern.resolution && list[i].coefficient == current_pattern.coefficient)
		{
			return false;
		}
	}

	list.unshift(current_pattern);
	setList(list);

	refreshList();
}

function removeFromList(id)
{
	var list = getList();

	list.splice(id,1);
	setList(list);
	refreshList();
}

function getList()
{
	var list = Lockr.get('saved-list');

	if(typeof list != "object")
	{
		return [];
	}

	return list;
}

function setList(save)
{
	Lockr.set('saved-list', save);
}

function refreshList()
{
	var list = getList();

	var parent = get("save_list");

	parent.innerHTML = "";
	list.map(function(element, id)
	{
		var li = dc("li");


		var label = dc("span");
		label.innerHTML = `${element.coefficient}/${element.resolution}`;
		label.className = "interact_link";
		// label.dataId = id;
		label.onclick = function()
		{
			load_pattern(getList()[id]);
		}

		 var cross = dc("span");
		 cross.innerHTML = " [X]";
		 // cross.dataId = id;
		 cross.className = "list-delete";
		 cross.onclick = function()
		 {
			removeFromList(id);
		 }

		 parent.appendChild(li);
		 li.appendChild(label);
		 li.appendChild(cross);
	});

}
