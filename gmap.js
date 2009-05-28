function $gmap () {
	var thisPtr = this;

	var api = null;
	var map = null;
	var gZoom = 6;
	var orgHeight = 300;
	var orgWidth = 500;

	this.inlet1 = new this.inletClass("inlet1", this, "methods: setCenter, setZoom, panDirection, zoomIn, zoomOut");
	this.outlet1 = new this.outletClass("outlet1", this, "bang on load");
	this.outlet2 = new this.outletClass("outlet2", this, "zoom level");

	this.inlet1["setZoom"] = function (level) {
		map.setZoom(level);
		gZoom = level;
		thisPtr.outlet2.doOutlet(gZoom);
	}

	this.inlet1["setCenter"] = function (args) {
    args = args.split(" ");
		setCenter(args[0], args[1]);
	}

	this.inlet1["panDirection"] = function (args) {
    args = args.split(" ");
    map.panDirection(args[0], args[1]);
	}

	this.inlet1["zoomIn"] = function () {
		if (gZoom<17) {
			map.zoomIn();
			gZoom++;
		  thisPtr.outlet2.doOutlet(gZoom);
		}
	}

	this.inlet1["zoomOut"] = function () {
		if(gZoom>1) {
			map.zoomOut();
			gZoom--;
		  thisPtr.outlet2.doOutlet(gZoom);
		}
	}

	function setCenter (lat, lng) {
	  lat = parseFloat(lat);
	  lng = parseFloat(lng);
	  gLatLng = new api.GLatLng(lat, lng);
		map.setCenter(gLatLng, gZoom);
		thisPtr.outlet2.doOutlet(gZoom);
	}

	function loadMap () {
		if (typeof api.GBrowserIsCompatible == "function" && api.GBrowserIsCompatible()) {
			map = new api.GMap2(iframe.objFrame.contentDocument.getElementById(thisPtr.createElID("map")));
			map.enableContinuousZoom();
		  thisPtr.outlet1.doOutlet("bang");
		}
  }

	function frameInit () {
		iframe.objFrame.contentDocument.getElementById("bodyElement").innerHTML = '<div id="' + thisPtr.createElID("map") + '" style="padding:0px;border:0px;margin:0px;width:' + orgWidth + 'px;height:' + orgHeight + 'px"></div>';
		api = (iframe.objFrame.contentWindow.GMap2) ? iframe.objFrame.contentWindow : iframe.objFrame.contentWindow.wrappedJSObject;
		loadMap();
	}

	var iframe = new LilyComponents._iframe(this, "index.html", 300, 500, "no", frameInit);

	return this;
}

var $gmapMetaData = {
	textName:"gmap",
	htmlName:"gmap",
	objectCategory:"Web Service",
	objectSummary:"Display a location using the Google Map API.",
	objectArguments:""
}