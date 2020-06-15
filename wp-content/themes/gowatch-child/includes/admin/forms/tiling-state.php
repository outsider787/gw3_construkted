<?php

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Tiling State Page
 */

$api_urls = CONSTRUKTED_API_URLS;
?>
<div class="wrap">
    <h2><?php esc_html_e('Processing State', 'gowatch-child'); ?></h2>
    <table>
        <tbody>
            <?php
                foreach($api_urls as $api_url){
                    $all_tasks = construkted_get_all_task($api_url);

                    $tasks_being_processed = [];
                    $tasks_in_queue = [];
                    $tasks_failed = [];
                    $tasks_completed = [];

                    if(!is_null($all_tasks))
                        foreach ($all_tasks as $task) {
                            $status_code = $task['status']['code'];

                            if($status_code == 10) // queued
                                array_push($tasks_in_queue, $task);
                            else if ($status_code == 20) // running
                                array_push($tasks_being_processed, $task);
                            else if ($status_code == 40) // failed
                                array_push($tasks_failed, $task);
                            else if ($status_code == 50) // completed
                                array_push($tasks_completed, $task);
                            else
                                continue;
                        }

                    $count_of_tasks_being_processed = count($tasks_being_processed);
                    $count_of_tasks_in_queue = count($tasks_in_queue);
                    $count_of_tasks_failed = count($tasks_failed);
                    $count_of_tasks_completed = count($tasks_completed);

                    $id_suffix = str_replace('//', '', $api_url);
                    $id_suffix = str_replace(':', '', $id_suffix);
                    $id_suffix = str_replace('.', '', $id_suffix);
            ?>

                    <p>
                        <input id="refresh-tiling-state-<?php echo $id_suffix?>" type="button" class="button-primary" value="Click to Refresh"/>
                        <span id = 'construkted-api-state-<?php echo $id_suffix?>' style="font-size: 1.5em; margin-left: 10px">
                            <?php
                            if(is_null($all_tasks))
                                echo '<strong>Not Live</strong>(' . $api_url . ')';
                            else
                                echo '<strong>Live</strong>(' . $api_url . ')';
                            ?>
                        </span>
                    </p>

                    <h2 id = 'tasks-being-processed-title-<?php echo $id_suffix?>'
                        <?php
                        if ($count_of_tasks_being_processed <= 0 )
                            echo 'style="display: none"';
                        ?> >
                        <?php esc_html_e('Tasks being processed : ', 'gowatch-child'); ?>
                        <span id = 'count-of-tasks-being-processed-<?php echo $id_suffix?>'> <?php echo $count_of_tasks_being_processed ?>  </span>
                    </h2>

                    <div id="tasks-being-processed-<?php echo $id_suffix?>">
                        <?php
                        // Show the data
                        echo get_html_for_tasks($tasks_being_processed);
                        ?>
                    </div>

                    <h2 id = 'tasks-in-queue-title-<?php echo $id_suffix?>'
                        <?php
                        if ($count_of_tasks_in_queue <= 0 )
                            echo 'style="display: none"';
                        ?> >
                        <?php esc_html_e('Tasks in queue : ', 'gowatch-child'); ?>
                        <span id = 'count-of-tasks-in-queue-<?php echo $id_suffix?>'> <?php echo $count_of_tasks_in_queue ?>  </span>
                    </h2>

                    <div id="tasks-in-queue-<?php echo $id_suffix?>">
                        <?php
                        // Show the data
                        echo get_html_for_tasks($tasks_in_queue);
                        ?>
                    </div>

                    <h2 id = 'tasks-failed-title-<?php echo $id_suffix?>'
                        <?php
                        if ($count_of_tasks_failed <= 0 )
                            echo 'style="display: none"';
                        ?> >
                        <?php esc_html_e('Tasks failed : ', 'gowatch-child'); ?>
                        <span id = 'count-of-tasks-failed-<?php echo $id_suffix?>'> <?php echo $count_of_tasks_failed ?>  </span>
                    </h2>

                    <div id="tasks-failed-<?php echo $id_suffix?>">
                        <?php
                        // Show the data
                        echo get_html_for_tasks($tasks_failed);
                        ?>
                    </div>

                    <h2 id = 'tasks-completed-title-<?php echo $id_suffix?>'
                        <?php
                        if ($count_of_tasks_completed <= 0 )
                            echo 'style="display: none"';
                        ?> >
                        <?php esc_html_e('Tasks completed : ', 'gowatch-child'); ?>
                        <span id = 'count-of-tasks-failed-<?php echo $id_suffix?>'> <?php echo $count_of_tasks_completed ?>  </span>
                    </h2>

                    <div id="tasks-completed-<?php echo $id_suffix?>">
                        <?php
                        // Show the data
                        echo get_html_for_tasks($tasks_completed);
                        ?>
                    </div>

                    <?php
                        }
                    ?>
        </tbody>
    </table>
</div>

