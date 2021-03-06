const statusCodes = {
    QUEUED: 10,
    RUNNING: 20,

    // task is paused and wait for
    CPU_INTENSIVE_RUNNING_QUEUED: 30,
    FAILED: 40,
    COMPLETED: 50,
    CANCELED: 60
};

const runningStatusCodes = {
    NONE: 0,
    PROCESSING_DRONE_IMAGE: 10,
    CREATING_CESIUM_ASSET: 20,
    UPLOADING: 30,
    TILING: 40,
    DOWNLOADING: 50,
    PACKAGING: 60,
    PUBLISHING_CONSTRUKTED_ASSET: 70
};

const errorMessageHTML = 'ERROR<br>Please contact<br>support@construkted.com';

let apiUrls = [];
let unreachableAPIUrls = [];

function updateState() {
    apiUrls.forEach( (apiUrl, index, array) => {
        function getTaskAll() {
            $.ajax({
                url : apiUrl + "/task/all",
                type : 'get',
                data : {
                },
                success : function( response ) {
                    response.apiUrl = apiUrl;

                    doUpdateState(response);

                    setTimeout(function(){ getTaskAll(); }, 1000);
                },
                error: function(xhr, status, error) {
                    if(!unreachableAPIUrls.includes(apiUrl))
                        unreachableAPIUrls.push(apiUrl);

                    console.error(error);
                    setTimeout(function(){ getTaskAll(); }, 1000);
                }
            });
        }

        getTaskAll();
    })
}

function doUpdateState(allTasksInfo) {
    let postStateDivList = $("div[id^='post-processing-state']");

    for(let i = 0; i < postStateDivList.length; i++) {
        // this is HTML element
        let postStateDiv = postStateDivList[i];

        let postId = postStateDiv.getAttribute('data-post-id');
        let wpPostState = postStateDiv.getAttribute('data-wp-state');
        let usedApiUrl = postStateDiv.getAttribute('data-api-url');

        if(wpPostState === "publish") {
            postStateDiv.innerHTML = 'Completed';
            continue;
        }

        if(usedApiUrl === "") {
            postStateDiv.innerHTML = errorMessageHTML;
            continue;
        }

        if(unreachableAPIUrls.includes(usedApiUrl)) {
            postStateDiv.innerHTML = errorMessageHTML;
            continue;
        }

        if(allTasksInfo.apiUrl !== usedApiUrl)
            continue;

        // we do not need to update state.
        if(wpPostState === 'publish'){
            continue;
        }

        const taskInfo = getTaskInfo(allTasksInfo, postId);

        if(taskInfo === null) {
            if(wpPostState === 'pending')
                //postStateDiv.innerHTML = errorMessageHTML;
                postStateDiv.innerHTML = 'Initializing...';
            else
                postStateDiv.innerHTML = wpPostState;

            continue;
        }

        let statusCode = taskInfo.status.code;
        let runningStatus = taskInfo.runningStatus;

        if(statusCode === statusCodes.FAILED) {
            postStateDiv.innerHTML = errorMessageHTML;
            console.warn('task failed at running state: ' + runningStatus);
            continue;
        }

        let percent = getProcessingProgress(taskInfo);

        if(percent === 100) {
            if(statusCode !== statusCodes.COMPLETED) {
                postStateDiv.innerHTML = '100%';
            }
            else
                postStateDiv.innerHTML = 'Completed';
        }
        else
            postStateDiv.innerHTML = percent + ' %';
    }
}

function getProcessingProgress(taskInfo) {
    let runningStatus = taskInfo.runningStatus;

    if(runningStatus === runningStatusCodes.CREATING_CESIUM_ASSET)
        return 5;
    // 5-20%
    else if(runningStatus === runningStatusCodes.UPLOADING){
        let uploadingPercent = taskInfo.uploadingProgress;

        let percent = 5 + uploadingPercent / 100 * 15;

        return percent.toFixed(1);
    }
    // 20-70%
    else if(runningStatus === runningStatusCodes.TILING) {
        if(isNaN(taskInfo.tilingProgress) || taskInfo.tilingProgress === -1)
            return 20;
        else{
            let tilingPercent = taskInfo.tilingProgress;

            let percent = 20 + tilingPercent / 100 * (70 - 20);

            return percent.toFixed(1);
        }
    }
    else if(runningStatus === runningStatusCodes.DOWNLOADING) {
        let downloadProgress = taskInfo.downloadProgress; // (0 ~ 1)

        if(downloadProgress === -1)
            return 70;

        let percent = 70 + downloadProgress * (80 - 70);

        return percent.toFixed(1);
    }
    else if(runningStatus === runningStatusCodes.PACKAGING)
        return 80;
    else if(runningStatus === runningStatusCodes.PUBLISHING_CONSTRUKTED_ASSET) {
        return 100;
    }
    else
        return 0;
}

function getState(tilingJobInfo) {
    let state = tilingJobInfo.state;

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

function getTaskInfo(allTasksInfo, postId) {
    if(allTasksInfo === null)
        return null;

    for(let i = 0; i < allTasksInfo.length; i++) {
        if(allTasksInfo[i].postId === postId ){
            return allTasksInfo[i];
        }
    }

    return null;
}

function initState() {
    let postStateDivList = $("div[id^='post-processing-state']");

    for(let i = 0; i < postStateDivList.length; i++) {
        // this is HTML element
        let postStateDiv = postStateDivList[i];

        let wpPostState = postStateDiv.getAttribute('data-wp-state');

        if(wpPostState === 'publish'){
            postStateDiv.innerHTML = "Completed";
        }
        else
            postStateDiv.innerHTML = "Pending";
    }
}

function aggregateAPIUrl() {
    let postStateDivList = $("div[id^='post-processing-state']");

    for(let i = 0; i < postStateDivList.length; i++) {
        // this is HTML element
        let postStateDiv = postStateDivList[i];

        let apiUrl = postStateDiv.getAttribute('data-api-url');

        if(!apiUrl)
            continue;

        apiUrl = apiUrl.trim();

        if(apiUrl === "")
            continue;

        if(apiUrls.indexOf(apiUrl) === -1)
            apiUrls.push(apiUrl);
    }
}

function showErrorMessage(message) {
    let data = {
        alert: 'error',
        label: 'Garbage data detected',
        icon: 'icon-flag',
        message: message
    };

    let $alert = '<div class="airkit_alert fixed-top-right alert-'+ data.alert +' alert-dismissible" role="alert"><button type="button" class="close"><span aria-hidden="true">&times</span></button><p>'+ data.message +'</p></div>';

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

    aggregateAPIUrl();
    initState();
    updateState();
});
