<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Tiling State Page
 */
?>
<div class="wrap">
    <?php

    $all_tasks = construkted_get_all_task();

    $tasks_being_processed = [];
    $tasks_in_queue = [];
    $tasks_failed = [];

    if($all_tasks != null)
        foreach ($all_tasks as $task) {
            $status_code = $task['status']['code'];

            if($status_code == 10) // queued
                array_push($tasks_in_queue, $task);
            else if ($status_code == 20) // running
                array_push($tasks_being_processed, $task);
            else if ($status_code == 40) // failed
                array_push($tasks_failed, $task);
            else
                continue;
        }

    $count_of_tasks_being_processed = count($tasks_being_processed);
    $count_of_tasks_in_queue = count($tasks_in_queue);
    $count_of_tasks_failed = count($tasks_failed);
    ?>

    <h2><?php esc_html_e('Processing State', 'gowatch-child'); ?></h2>

    <p>
        <input id="refresh-tiling-state" type="button" class="button-primary" value="Click to Refresh" />
        <span id = 'construkted-api-state' style="font-size: 1.5em; margin-left: 10px">
            <?php
            if($all_tasks == null)
                echo 'Not Live';
            else
                echo 'Live'
            ?>
        </span>
    </p>

    <h2 id = 'tasks-being-processed-title'
        <?php
        if ($count_of_tasks_being_processed <= 0 )
            echo 'style="display: none"';
        ?> >
        <?php esc_html_e('Tasks being processed : ', 'gowatch-child'); ?>
        <span id = 'count-of-tasks-being-processed'> <?php echo $count_of_tasks_being_processed ?>  </span>
    </h2>

    <div id="tasks-being-processed">
        <?php
        // Show the data
        echo get_html_for_tasks($tasks_being_processed);
        ?>
    </div>

    <h2 id = 'tasks-in-queue-title'
        <?php
        if ($count_of_tasks_in_queue <= 0 )
            echo 'style="display: none"';
        ?> >
        <?php esc_html_e('Tasks in queue : ', 'gowatch-child'); ?>
        <span id = 'count-of-tasks-in-queue'> <?php echo $count_of_tasks_in_queue ?>  </span>
    </h2>

    <div id="tasks-in-queue">
        <?php
        // Show the data
        echo get_html_for_tasks($tasks_in_queue);
        ?>
    </div>

    <h2 id = 'tasks-failed-title'
        <?php
        if ($count_of_tasks_failed <= 0 )
            echo 'style="display: none"';
        ?> >
        <?php esc_html_e('Tasks failed : ', 'gowatch-child'); ?>
        <span id = 'count-of-tasks-failed'> <?php echo $count_of_tasks_failed ?>  </span>
    </h2>

    <div id="tasks-failed">
        <?php
        // Show the data
        echo get_html_for_tasks($tasks_failed);
        ?>
    </div>

</div>

