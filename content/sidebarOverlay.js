var BluesbeatSidebar = {

  init: function() {
    api_key = "";
    resultLabels = {'artist': 'Artist',
                    'title': 'Title',
                    'release': 'Release',
                    'bitrate': 'Bitrate',
                    'samplerate': 'Sample Rate',
                    'danceability': 'Danceability',
                    'duration': 'Duration',
                    'energy': 'Energy',
                    'key': 'Key',
                    'loudness': 'Loudness',
                    'liveness': 'Liveness',
                    'tempo': 'Tempo',
                    'time_signature': 'Time Signature',
                    'mode': 'Mode'}
    BluesbeatSidebar.clearResults();
  },
  
  clearResults: function(){
    var results_vbox = document.getElementById("bluesbeat-results");
    while (results_vbox.hasChildNodes()) {
      results_vbox.removeChild(results_vbox.lastChild);
    }
  },
  
  loadMatches: function(loc, matches) {
    tracks = []
    for (var i=0; i<matches.length; i++){
      filename = this.getFileName(matches[i]);
      uri = this.buildURI(loc, matches[i]);
      track={filename: filename, uri: uri};
      tracks[tracks.length] = track;
    }
    
    return tracks;
  },
  
  getFileName: function(filepath) {
    //start at end of pathname and stop at first occurence of /
    index = filepath.length - 1;
    while (index >= 0) {
      if (location.pathname.charAt(index) == '/'){
        break;
      }
      else{
        index--;
      }
    }
    return filepath.substring(index+1, filepath.length);
  },
  
  buildURI: function(location, filepath) {
    //start at end of pathname and stop at first occurence of /
    index = location.pathname.length - 1;
    while (index >= 0) {
      if (location.pathname.charAt(index) == '/'){
        break;
      }
      else{
        index--;
      }
    }
    //trim everything after last /
    var uri = location.pathname.substring(0, index);
    var path = filepath;
    var host = location.protocol + "//" + location.hostname;
    return host + uri + "/" + path;
  },
  
  getTrackInfo: function(trackURI) {
    var targetURL = "http://developer.echonest.com/api/v4/track/upload?api_key=" + api_key +"&url=" + encodeURIComponent(trackURI);    
    var req = $.ajax({
                url: targetURL,
                type: "POST",
                dataType:"json",
                error: function(data) { alert("error: " + data["status"]["code"]); },
                contentType: "application/x-www-form-urlencoded",
                accepts: "text/plain",
                success: this.showTrackResults});
  },
  
  showTrackResults : function(data){
    BluesbeatSidebar.clearResults();
    var track = data["response"]["track"];
    var resultBox = document.getElementById("bluesbeat-results");
    var track = data["response"]["track"];
    var audio_summary = BluesbeatSidebar.getAudioSummary(track["id"]);
    var similar = data["response"]["track"]["artist"];
    for (var key in audio_summary) {
      track[key] = audio_summary[key];
    }
    
    var tree = document.createElement("tree");
    tree.setAttribute("height", "500");
    
    
    var cols = document.createElement("treecols");
    
    
    var col1 = document.createElement("treecol");
    col1.setAttribute("label", "Attribute");
    col1.setAttribute("minwidth", "100");
    col1.setAttribute("properties", "resultColumn");
    cols.appendChild(col1);
    
    var col2 = document.createElement("treecol");
    col2.setAttribute("label", "Value");
    col2.setAttribute("minwidth", "200");
    col2.setAttribute("properties", "resultColumn");
    cols.appendChild(col2);

    tree.appendChild(cols);
    var treeChildren = document.createElement("treechildren");
    
    for (var key in track) {
      if (key in resultLabels) {
        var treeItem = document.createElement("treeitem");
        var treeRow = document.createElement("treerow");
        
        var treeCell1 = document.createElement("treecell");
        treeCell1.setAttribute("label", resultLabels[key]);
        treeCell1.setAttribute("properties", "resultAttribute");
        
        var treeCell2 = document.createElement("treecell");
        treeCell2.setAttribute("label", track[key]);
        treeCell2.setAttribute("properties", "resultValue");
        
        treeRow.appendChild(treeCell1);
        treeRow.appendChild(treeCell2);
        treeItem.appendChild(treeRow);
        treeChildren.appendChild(treeItem);
      }
    }
    
    var treeItem = document.createElement("treeitem");
    var treeRow = document.createElement("treerow");
    var treeCell1 = document.createElement("treecell");
    treeCell1.setAttribute("label", "Similar Artists");
    artists = "";
    for(var i=0; i < similar.length; i++){
      artists += similar[i]["name"];
      if (i < similar.length-1) {
        artists += ", ";
      }
    }
    var treeCell2 = document.createElement("treecell");
    treeCell2.setAttribute("label", artists);
    treeCell2.setAttribute("properties", "resultValue");  
    treeRow.appendChild(treeCell1);
    treeRow.appendChild(treeCell2);
    treeItem.appendChild(treeRow);
    treeChildren.appendChild(treeItem);
    
    tree.appendChild(treeChildren);
    
    
    resultBox.appendChild(tree);
  },
  
  getAudioSummary: function(trackId) {
    var audio_summary = {};
    var targetURL = "http://developer.echonest.com/api/v4/track/profile?api_key=" + api_key + "&format=json&id=" + trackId + "&bucket=audio_summary";
    var req = $.ajax({
                url: targetURL,
                type: "GET",
                dataType:"json",
                error: function() { alert("error"); },
                accepts: "text/plain",
                async: false,
                success: function(data){
                  audio_summary = data["response"]["track"]["audio_summary"];
                }
              })
    return audio_summary;
  },
  
  doDrop : function (event) {
      var url = event.dataTransfer.getData("URL");
      if (url.length > 0 && url.substring(url.length-4, url.length) == ".mp3") {
        this.clearResults();
        this.drawProgressMeter();
        this.getTrackInfo(url);
      }
      else{
        alert("Not a valid track");
      }
    },
    
    doDrag : function(event) {
        return false;
    },
    
  checkDrag : function(event){
    return false;
  },
  
  drawProgressMeter : function(){
    var resultBox = document.getElementById("bluesbeat-results");
    var meter = document.createElement("progressmeter");
    meter.setAttribute("mode", "undetermined");
    resultBox.appendChild(meter);
  },
  
  selectFile : function() {
    this.clearResults();
    this.drawProgressMeter();
    this.getUploadedTrackInfo();
  },
  
  getUploadedTrackInfo :  function(){
    var targetURL = "http://developer.echonest.com/api/v4/track/upload?api_key=" + api_key + "&filetype=mp3";
    var onload = function(data){
      BluesbeatSidebar.showTrackResults(data);
    };
    var onerror = function(data){
      alert("Unable to load this track.");
    }

    var xhr = new XMLHttpRequest();
    upload = xhr.upload;
    xhr.onreadystatechange = function(){
      if(xhr.readyState==4)
            if((xhr.status>=200 && xhr.status<300) || xhr.status==304){
                this.response = this.response || this.responseText;
                BluesbeatSidebar.showTrackResults(this.response);
            }else onerror.call(xhr);
    }
    xhr.open('POST',targetURL,true);
    xhr.setRequestHeader("Content-Type","application/octet-stream");
    var formData = new FormData();
    formData.append("track", document.getElementById("myFileField").files[0]);
    xhr.send(formData);
    return xhr;

  },
  
  findSimilarArtists: function(artistName){
    var targetURL = "http://developer.echonest.com/api/v4/artist/similar?api_key=" + api_key + "&name=" + encodeURIComponent(artistName) + "&format=json&results=1&start=0";    
    var similar = [];
    
    var req = $.ajax({
                url: targetURL,
                type: "GET",
                dataType:"json",
                error: function(data) { alert("error: " + data["status"]["code"]); },
                accepts: "text/plain",
                success: function(data){
                  similar = data["response"]["artists"];
                }
              })
    return similar;
  }
}






