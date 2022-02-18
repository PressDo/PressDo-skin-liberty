onClickSearch = () => {
	if (!this.searchText) return;
	location.href = '/Search?q=' + encodeURIComponent(this.searchText)
}

onClickGo = () => {
	if (!this.searchText) return;
	location.href = '/w/' + this.searchText
}