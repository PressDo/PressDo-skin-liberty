onClickSearch = () => {
	var searchText = $('#searchInput').val();
	if (!searchText) return;
	location.href = '/Search?q=' + encodeURIComponent(searchText)
}

onClickGo = () => {
	var searchText = $('#searchInput').val();
	if (!searchText) return;
	location.href = '/w/' + searchText
}