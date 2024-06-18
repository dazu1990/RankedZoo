<?php
    /*
    * @wordpress-plugin
    * Plugin Name:       Ranked Zoo
    * Plugin URI:        https://github.com/dazu1990/RankedZoo/tree/main/RZ_Backend/plugins
    * Description:       Custom functionality for rankedzoo
    * Author:            wordpressdotorg
    * Author URI:        https://github.com/dazu1990/
    * Version:           0.0.2
    * Requires at least: 5.2
    * Requires PHP:      5.6
    * Text Domain:       wordpress-importer
    * License:           GPLv2 or later
    * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
    */
    function create_rz_endpoints(){
        register_rest_route(
            'rz/v1',
            '/animals',
            [
                'methods' => 'GET',
                'callback' => 'get_animal_data_response',
            ]
        );
    }

    function get_animal_data_response(){
        $animal_args = [
            'post_type' => 'animal', // Replace with your custom post type
            'posts_per_page' => 1000000, // Number of posts per page
        ];

        $rank_change_record_args = [
            'post_type' => 'rank-change-record', // Replace with your custom post type
            'posts_per_page' => 1000000, // Number of posts per page
        ];

        $animalQuery = new WP_Query($animal_args);
        $rankChangeRecordQuery = new WP_Query($rank_change_record_args);

        $animals = $animalQuery->posts;
        $rankChangeRecords = $rankChangeRecordQuery->posts;

        
        foreach($animals as &$animal){
            $animalID = $animal->ID;
            $rankings_filtered_to_animal = array_filter($rankChangeRecords, function ($rankChangeRecord) use($animalID) {
                $animal_relation = get_field('animal', $rankChangeRecord->ID);
                return $animal_relation === $animalID;
            });
            $total_sum_of_rankings = 0;

            foreach($rankings_filtered_to_animal as $rankChangeRecord) {
                $rank_change_record_value = get_field('value', $rankChangeRecord->ID);

                $total_sum_of_rankings += $rank_change_record_value;
            }

            $animal->all_rankings = $rankings_filtered_to_animal;
            $animal->overall_ranking_total = $total_sum_of_rankings;

        }


        return new WP_REST_Response($animals);
    }

    add_action('rest_api_init', 'create_rz_endpoints');

