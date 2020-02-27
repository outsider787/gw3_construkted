var State = {
    Unknown: 'Unknown',
    Creating: 'Creating',        // creating Cesium asset
    Uploading: 'Uploading',      // uploading
    Tiling: 'Tiling',            // tiling by Cesium API
    Downloading: 'Downloading',  // downloading tileset tiled by Cesium API
    Packaging: 'Packaging',      // packaging downloaded tileset to sqlite file
    Deleting: 'Deleting',        // deleting downloaded original downloaded tile
    Finished: 'Finished',        // tiling and packaging finished
    Completed: 'Completed',      // corresponding WordPress 's post state is to updated to 'publish'
    ErrorInUpdatePostState: 'ErrorInPostState'
};

function updateState() {
    var url = "https://tile01.construkted.com:5000/get_active";

    $.ajax({
        url : url,
        type : 'get',
        data : {
        },
        success : function( response ) {
            doUpdateState(response);

            setTimeout(function(){ updateState(); }, 1000);
        },
        error: function(xhr, status, error) {
            console.error(error);
            setTimeout(function(){ updateState(); }, 1000);
        }
    });
}

function doUpdateState(data) {
    var postStateDivList = $("div[id^='post-processing-state']");

    for(var i = 0; i < postStateDivList.length; i++) {
        // this is HTML element
        var postStateDiv = postStateDivList[i];

        var postId = postStateDiv.getAttribute('data-post-id');
        var wpPostState = postStateDiv.getAttribute('data-wp-state');

        // we do not need to update state.
        if(wpPostState === 'publish'){
            continue;
        }

        var tilingJobInfo = getTilingJobInfo(data, postId);

        if(tilingJobInfo === null) {
            // postStateDiv.innerHTML = "Unknown";
            postStateDiv.innerHTML = wpPostState;
            continue;
        }

        var percent = getProcessingProgress(tilingJobInfo);

        if(percent == 100)
            postStateDiv.innerHTML = 'Completed';
        else
            postStateDiv.innerHTML = percent + ' %';
    }
}

function getProcessingProgress(tilingJobInfo) {
    var state = tilingJobInfo.state;

    if(state === State.Creating)
        return 5;
    // 5-20%
    else if(state === State.Uploading){
        var uploadingPercent = tilingJobInfo.uploadingProgress;

        var percent = 5 + uploadingPercent / 100 * 15;

        return percent.toFixed(2);
    }
    // 20-70%
    else if(state === State.Tiling) {
        if(isNaN(tilingJobInfo.tilingStatus))
            return 20;
        else{
            var tilingPercent = tilingJobInfo.tilingStatus;

            var percent = 20 + tilingPercent / 100 * 50;

            return percent.toFixed(2);
        }
    }
    else if(state === State.Downloading)
        return 70;
    else if(state === State.Packaging)
        return 80;
    else if(state === State.Deleting)
        return 90;
    else if(state === State.Finished)
        return 95;
    if(state === State.Completed)
        return 100;
    else
        return 0;
}

function getState(tilingJobInfo) {
    var state = tilingJobInfo.state;

    if(state === State.Completed)
        return "Completed";
    else if(state === State.Creating)
        return "Creating Asset";
    else if(state === State.Downloading)
        return "Downloading tileset";
    else if(state === State.Packaging)
        return "Packaging";
    else if(state === State.Tiling) {
        if(!isNaN(tilingJobInfo.tilingStatus))
            return "Tiling " + tilingJobInfo.tilingStatus + ' %';
        else
            return "Tiling " + tilingJobInfo.tilingStatus;
    }
    else if(state === State.Uploading)
        return "Uploading " + tilingJobInfo.uploadingProgress + ' %';
    else if(state === State.Deleting)
        return "Deleting tileset";
    else if(state === State.Finished)
        return "Updating";
    else
        return "Unknown";
}

function getTilingJobInfo(data, postId) {
    for(var i = 0; i < data.length; i++) {
        if(data[i].postId === postId ){
            return data[i];
        }
    }

    return null;
}

function initState() {
    var postStateDivList = $("div[id^='post-processing-state']");

    for(var i = 0; i < postStateDivList.length; i++) {
        // this is HTML element
        var postStateDiv = postStateDivList[i];

        var wpPostState = postStateDiv.getAttribute('data-wp-state');

        if(wpPostState === 'publish'){
            postStateDiv.innerHTML = "Completed";
        }
        else
            postStateDiv.innerHTML = "Pending";
    }
}

jQuery(document).ready(function(){
    window.$ = jQuery;
    console.log("jquery initialized");

    initState();
    updateState();
});
