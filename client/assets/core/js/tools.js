function l (a) {
	console.log(a)
}

function now (format, ts) {
	ts = ts || (new Date) * 1;
	
	var spool = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
	var D = new Date(ts), d = {};

	d['Y'] = D.getFullYear();
	d['m'] = D.getMonth() + 1;
	d['d'] = D.getDate();
	d['H'] = D.getHours();
	d['i'] = D.getMinutes();
	d['s'] = D.getSeconds();

	var ret = format;
	for(var i in d) {
		var v = d[i];
		v = spool[v] || v;
		ret = ret.replace(i, v);
	}
	return ret;
}

function fb () {
	$('.fancybox').fancybox({
		helpers: {
			title: {
				type: 'inside'
			}
		},
		afterLoad: function () {
			var curr = this.index + 1, total = this.group.length;
			this.title = curr+'/'+total
		}
	});
}