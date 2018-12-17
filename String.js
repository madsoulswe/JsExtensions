String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

String.prototype.trunc = function (length, wordBoundary) {
    var isLong = this.length > length,
        text = isLong ? this.substr(0, length - 1) : this;
    text = wordBoundary && isLong ? text.substr(0, text.lastIndexOf(' ')) : text;
    return isLong ? text + '&hellip;' : text;
};

String.prototype.isNullOrEmpty = function () {
    if (this && this.length > 0)
        return false;

    return true;
};


String.prototype.parseJSONDate = function() {
    return new Date(parseInt(this.substr(6, 13), 10));
};

String.prototype.replaceAll = function (token, newToken, ignoreCase) {
    var _token;
    var str = this + "";
    var i = -1;

    if (typeof token === "string") {

        if (ignoreCase) {

            _token = token.toLowerCase();

            while ((
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                )) !== -1
            ) {
                str = str.substring(0, i) +
                    newToken +
                    str.substring(i + token.length);
            }

        } else {
            return this.split(token).join(newToken);
        }

    }
    return str;
};

String.prototype.toClassName = function () {
    return this.replace(/[^a-z0-9]/g, function (s) {
        var c = s.charCodeAt(0);
        if (c == 32) return '-';
        if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
        return '__' + ('000' + c.toString(16)).slice(-4);
    });
}
