var statusCodes = {
    QUEUED: 10,
    RUNNING: 20,

    // task is paused and wait for
    CPU_INTENSIVE_RUNNING_QUEUED: 30,
    FAILED: 40,
    COMPLETED: 50,
    CANCELED: 60
};

var runningStatusCodes = {
    NONE: 0,
    PROCESSING_DRONE_IMAGE: 10,
    CREATING_CESIUM_ASSET: 20,
    UPLOADING: 30,
    TILING: 40,
    DOWNLOADING: 50,
    PACKAGING: 60,
    PUBLISHING_CONSTRUKTED_ASSET: 70
};

function updateState() {
    var url = "https://tile01.construkted.com:5000/task/all";

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
            doUpdateState(null);
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

        var taskInfo = getTaskInfo(data, postId);

        if(taskInfo === null) {
            if(wpPostState === 'pending')
                postStateDiv.innerHTML = 'Initializing...';
            else
                postStateDiv.innerHTML = wpPostState;

            continue;
        }

        var statusCode = taskInfo.status.code;
        var runningStatus = taskInfo.runningStatus;

        if(statusCode === statusCodes.FAILED) {
            postStateDiv.innerHTML = 'ERROR<br>Please contact<br>support@construkted.com';
            console.warn('task failed at running state: ' + runningStatus);
            continue;
        }

        var percent = getProcessingProgress(taskInfo);

        if(percent == 100)
            postStateDiv.innerHTML = 'Completed';
        else
            postStateDiv.innerHTML = percent + ' %';
    }
}

function getProcessingProgress(taskInfo) {
    var runningStatus = taskInfo.runningStatus;

    if(runningStatus === runningStatusCodes.CREATING_CESIUM_ASSET)
        return 5;
    // 5-20%
    else if(runningStatus === runningStatusCodes.UPLOADING){
        var uploadingPercent = taskInfo.uploadingProgress;

        var percent = 5 + uploadingPercent / 100 * 15;

        return percent.toFixed(2);
    }
    // 20-70%
    else if(runningStatus === runningStatusCodes.TILING) {
        if(isNaN(taskInfo.tilingProgress) || taskInfo.tilingProgress === -1)
            return 20;
        else{
            var tilingPercent = taskInfo.tilingProgress;

            var percent = 20 + tilingPercent / 100 * 50;

            return percent.toFixed(2);
        }
    }
    else if(runningStatus === runningStatusCodes.DOWNLOADING) {
        var downloadProgress = taskInfo.downloadProgress; // (0 ~ 1)

        if(downloadProgress === -1)
            return 70;

        var percent = 70 + downloadProgress * (80 - 70);

        return percent.toFixed(1);
    }
    else if(runningStatus === runningStatusCodes.PACKAGING)
        return 80;
    else if(runningStatus === runningStatusCodes.PUBLISHING_CONSTRUKTED_ASSET)
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

function getTaskInfo(data, postId) {
    if(data === null)
        return null;

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

function showErrorMessage(message) {
    var data = {
        alert: 'error',
        label: 'Garbage data detected',
        icon: 'icon-flag',
        message: message
    };

    var $alert = '<div class="airkit_alert fixed-top-right alert-'+ data.alert +' alert-dismissible" role="alert"><button type="button" class="close"><span aria-hidden="true">&times</span></button><p>'+ data.message +'</p></div>';

    $body.find('.airkit_alert').remove();

    $($alert).appendTo('body');

    setTimeout(function(){
        $('.alert-'+ data.alert +'').addClass('in');
    }, 100);

    setTimeout(function(){
        $('.alert-'+ data.alert +'').fadeOut(function(){
            $(this).remove();
        });
    }, 3500);

    jQuery('.airkit_alert').append(data);
}

jQuery(document).ready(function(){
    window.$ = jQuery;
    console.log("jquery initialized");

    initState();
    updateState();
});
