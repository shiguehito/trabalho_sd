export function hash_func(text) {
    var hash = 0;
	if (text.length == 0) return hash;
	for (i = 0; i < text.length; i++) {
		char = text.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash;
	}
    return hash;
}