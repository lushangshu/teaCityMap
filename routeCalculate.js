var mapScale = 200;
function reconvertXYToLngLat(x, y) {
	var yBottomLength = coord.rightBottom[0] - coord.leftBottom[0];
	var yTopLength = coord.rightTop[0] - coord.leftTop[0];

	var xRightLength = coord.rightTop[1] - coord.rightBottom[1];
	var xLeftLength = coord.leftTop[1] - coord.leftBottom[1];

	var ny = x / mapScale;
	var nx = y / mapScale;
	var angle = 360 - 72;
	var nnx = (nx * Math.cos(angleCalc(angle)) + ny * Math.sin(angleCalc(angle))).toFixed(6);
	var nny = (ny * Math.cos(angleCalc(angle)) - nx * Math.sin(angleCalc(angle))).toFixed(6);
	var tx = parseFloat((nnx * (coord.rightTop[0] - coord.leftBottom[0]).toFixed(6))) + parseFloat((coord.leftBottom[0]).toFixed(
		6));
	var ty = parseFloat((nny * (coord.rightTop[1] - coord.leftBottom[1]).toFixed(6))) + parseFloat((coord.leftBottom[1]).toFixed(
		6));

	return res = {
		lat: tx.toFixed(6),
		lng: ty.toFixed(6)
	}
}
function convertLngLatToXYAxis(latLng) {
	var yBottomLength = coord.rightBottom[0] - coord.leftBottom[0];
	var yTopLength = coord.rightTop[0] - coord.leftTop[0];

	var xRightLength = coord.rightTop[1] - coord.rightBottom[1];
	var xLeftLength = coord.leftTop[1] - coord.leftBottom[1];

	var angle = 72;
	var x = (((latLng.lng - coord.leftBottom[0]).toFixed(6)) / ((coord.rightTop[0] - coord.leftBottom[0]).toFixed(6))).toFixed(
		6); // 经度
	var y = (((latLng.lat - coord.leftBottom[1]).toFixed(6)) / ((coord.rightTop[1] - coord.leftBottom[1]).toFixed(6))).toFixed(
		6); // 纬度
	var xNew = (x * Math.cos(angleCalc(angle)) + y * Math.sin(angleCalc(angle))).toFixed(6);
	var yNew = (y * Math.cos(angleCalc(angle)) - x * Math.sin(angleCalc(angle))).toFixed(6);
	var res = {
		x: yNew * mapScale, 
		y: xNew * mapScale
	}
	return res;
}


function angleCalc(angle) {
	return 2 * 3.14159 / 360 * angle; //M_PI是无穷数 转数据类型会出错
}



/*
 xPoint yPoint 是要判断的点
 polygonList 是多边形坐标点的集合[[[{x: 2,y: 1}, {x: 1,y: 3}, {x: 3,y: 5}, {x: 5,y: 4}, {x: 4,y: 1}, {x: 3,y: 2}, {x: 2,y: 1}]],[],[]]
*/
function defNode(xPoint, yPoint, polygonList) {
	var isIn = false;
	for (var i = 0; i < polygonList.length; i++) {
		isIn = pointInPolygon({
			x: xPoint,
			y: yPoint
		}, polygonList[i]);
		if (isIn) {
			//console.log("true");
			return true;
		}
	}
	return isIn;


}
