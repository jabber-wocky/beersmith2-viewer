var xml2json = require("simple-xml2json");
require('css-toggle-switch/dist/toggle-switch.css');

var Utils = function () {};

Utils.prototype.replaceAll = function (find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
};

Utils.prototype.htmlDecode = function (input){
  var e = document.createElement('textarea');
  e.innerHTML = input;
  var result = "";
  result = this.replaceAll("&"," &amp; ", e.value);
  result = this.replaceAll(" < "," &lt; ", result);
  result = this.replaceAll(" > "," &gt; ", result);
  result = this.replaceAll("","", result);

  return result;
};

Utils.prototype.parseXml = function (xmlStr) {
    xmlStr = this.htmlDecode(xmlStr);

    if (window.DOMParser) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    }
    return null;
};

Utils.prototype.loadXMLDoc = function (filename) {
    var xhttp;
    if (window.ActiveXObject)
    {
      xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else {
      xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    //try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
    xhttp.send("");
    return this.parseXml(xhttp.responseText);
};

Utils.prototype.getCalc = function () {
  console.log("get Calc");

  var inside = document.getElementById("recipe-details").innerHTML;
  var results = inside.match(/!@#[^!]*!@#/gm);
  for (result in results) {
    var original = results[result];
    var script = original.replace(/!@#/g,"");
    eval(script);

    var color = 0;
    var og = 0;
    var fg = 0;
    
    var grains = calc.grains;
    //calc og
    // og += lbs * ppg * mash efficiency / volume
    // http://www.howtobrew.com/section2/chapter12-3.html
    for (key in grains) {
      og += ( (Math.round(grains[key]['weight']*10)/10) * (46 * (grains[key]['yield'])/100) * (grains[key]['ee']) / (Math.round(grains[key]['volume']*100)/100) );
      fg = grains[key]['fg'];
      }
    og = Math.round(og);
    inside = inside.replace("$$OG$$", "1." + ("00000"+og).substr(-3) + " SG");
    inside = inside.replace("$$FG$$", "1."+ ("0000"+Math.round(fg*1000)).substr(-3) +" SG"); //Math.round(fg*1000)/1000
    og = (og / 1000) + 1;
    inside = inside.replace("$$ABV$$", (Math.round((og-fg)*131.25*100) / 100) + "%");
    
    //round((F_R_DESIRED_OG - F_R_OG_SECONDARY)*131.25*100) div 100
    
    // calc color
    for (key in grains) {
      color += ( (Math.round(grains[key]['color'])) * (Math.round(grains[key]['weight']*10)/10) / (Math.round(grains[key]['volume']*100)/100) );
      }
      color = 1.4922 * (Math.pow(color,0.6859));
      inside = inside.replace("$$color$$", Math.round(color*10)/10+" SRM");
    
    var sparge = calc.sparge;
    if (sparge.type == 1) {
      var steps = [];
      var total_water = sparge.pre_boil_water;
      var grain_water_abs = sparge.grain_weight * 0.12;
      
      var max_mash_vol = sparge.mash_tun_vol * (sparge.percentage/100) - (0.19838 * sparge.grain_weight);
      var even_mash_step = even_mash_step = total_water / Math.ceil((total_water+grain_water_abs)/max_mash_vol);;
      
      if (sparge.drain == 1) {
        steps.push('Drain mash tun');
        total_water = total_water - sparge.mash_water + grain_water_abs;
        
        even_mash_step = total_water / Math.ceil(total_water/max_mash_vol);
      }
      else {
        if (sparge.even == 0) {
          steps.push( Math.round( ( Math.min(total_water, max_mash_vol) + grain_water_abs - sparge.mash_water ) * 100) / 100) ;
          total_water = sparge.pre_boil_water - ( Math.round( ( Math.min(total_water, max_mash_vol) + grain_water_abs - sparge.mash_water ) * 100) / 100) - sparge.mash_water + grain_water_abs;
        }
        else {
          steps.push(Math.round((even_mash_step + grain_water_abs - sparge.mash_water) * 100) / 100);
          total_water -= Math.round((even_mash_step + grain_water_abs - sparge.mash_water) * 100) / 100;
        }
      }
      
      for(var x = 0; x < Math.ceil(total_water/max_mash_vol); x++) {
        if (sparge.even == 0) {
          if (total_water < max_mash_vol) {
            steps.push(Math.round(total_water * 100) / 100);
            total_water -= Math.round(total_water * 100) / 100;
          }
          else {
            steps.push(Math.round(max_mash_vol * 100) / 100);
            total_water -= Math.round(max_mash_vol * 100) / 100;
          }
        }
        else {
          steps.push(Math.round(even_mash_step * 100) / 100);
          total_water -= Math.round(even_mash_step * 100) / 100;
        }
      }
      
      inside = inside.replace("$$batch-steps-no$$", JSON.stringify(steps.length));
      var steps_str = "";
      for (var s in steps) {
        steps_str += '<span class data-unit="imperial">'+steps[s]+' gal</span><span data-unit="metric">'+ (Math.round(steps[s] * 3.78541 * 10) / 10) +'L</span>, ';
      }
      inside = inside.replace("$$batch-steps-vols$$", steps_str.substring(0,steps_str.length-2));
      
      //inside = inside.replace("$$batch-steps-vols$$", JSON.stringify(steps));
    }
    
  }
  document.getElementById("recipe-details").innerHTML = inside;
}

module.exports = new Utils();