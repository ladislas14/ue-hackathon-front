import {SuccessfulRequestResponse} from "../utils";

/* General response-related types */

// Any response from the server should follow this structure
export type OFFResponse = /*BackendErrorResponse |*/ OFFSuccessfulResponse | OFFPaginatedResponse;
// export type BackendErrorResponse = {status: number; errorType: string; description: string};
export type OFFSuccessfulResponse = SuccessfulRequestResponse;
export type OFFPaginatedResponse = OFFSuccessfulResponse & {
    page: number;
    page_size: number;
    count: number;
    page_count: number;
};

/* Specific DTOs */

export type OFFProductDto = {
    id: string;
    categories: string;
    categories_hierarchy: string[];
    product_name: string;
    image_front_url: string;
    image_front_thumb_url: string;
    image_small_url: string;
    image_packaging_url: string;
    image_packaging_thumb_url: string;
    image_url: string;
    image_thumb_url: string;
    /*
    "states",
    "data_quality_tags",
    "traces_tags",
    "generic_name_de",
    "interface_version_created",
    "labels",
    "nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value",
    "nutrition_data_prepared",
    "code",
    "product_quantity",
    "image_ingredients_thumb_url",
    "countries_tags",
    "entry_dates_tags",
    "category_properties",
    "allergens_tags",
    "nucleotides_tags",
    "countries",
    "nova_groups_tags",
    "last_checked_t",
    "categories",
    "countries_lc",
    "image_nutrition_url",
    "ingredients_original_tags",
    "image_ingredients_small_url",
    "ingredients_tags",
    "codes_tags",
    "ingredients_that_may_be_from_palm_oil_tags",
    "vitamins_tags",
    "traces_from_ingredients",
    "traces",
    "image_front_url",
    "correctors",
    "_keywords",
    "nutriscore_score",
    "unique_scans_n",
    "generic_name_fr",
    "ecoscore_grade",
    "ingredients_text_with_allergens",
    "generic_name",
    "origins_tags",
    "ingredients_text_debug",
    "allergens",
    "image_packaging_small_url",
    "brands",
    "image_packaging_url",
    "obsolete_since_date",
    "states_hierarchy",
    "packaging_text_fr",
    "additives_prev_original_tags",
    "unknown_nutrients_tags",
    "packagings",
    "last_modified_t",
    "nutrition_data",
    "data_quality_bugs_tags",
    "nutrient_levels_tags",
    "packaging",
    "completeness",
    "categories_properties_tags",
    "ingredients_analysis_tags",
    "photographers_tags",
    "rev",
    "nutrition_score_beverage",
    "sources",
    "packaging_tags",
    "generic_name_de_debug_tags",
    "amino_acids_tags",
    "lc",
    "ingredients_n",
    "ingredients_text_with_allergens_it",
    "labels_tags",
    "ingredients_text_fr",
    "expiration_date",
    "minerals_prev_tags",
    "emb_codes_tags",
    "unknown_ingredients_n",
    "additives_old_tags",
    "teams_tags",
    "popularity_key",
    "interface_version_modified",
    "scans_n",
    "popularity_tags",
    "id",
    "informers",
    "languages_tags",
    "compared_to_category",
    "countries_beforescanbot",
    "obsolete",
    "ingredients_that_may_be_from_palm_oil_n",
    "known_ingredients_n",
    "image_packaging_thumb_url",
    "allergens_lc",
    "last_edit_dates_tags",
    "emb_codes",
    "traces_hierarchy",
    "debug_param_sorted_langs",
    "new_additives_n",
    "other_nutritional_substances_prev_tags",
    "misc_tags",
    "url",
    "nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients",
    "pnns_groups_2_tags",
    "ingredients_from_palm_oil_n",
    "creator",
    "ingredients_text_de",
    "checkers",
    "vitamins_prev_tags",
    "categories_lc",
    "stores",
    "nutrition_data_prepared_per",
    "allergens_from_user",
    "ecoscore_data",
    "allergens_hierarchy",
    "quantity",
    "allergens_from_ingredients",
    "categories_hierarchy",
    "labels_hierarchy",
    "nucleotides_prev_tags",
    "categories_old",
    "image_front_thumb_url",
    "image_small_url",
    "ingredients_hierarchy",
    "ingredients_text",
    "_id",
    "languages_codes",
    "emb_codes_20141016",
    "purchase_places",
    "data_sources",
    "selected_images",
    "generic_name_it",
    "last_editor",
    "complete",
    "images",
    "last_image_dates_tags",
    "stores_tags",
    "minerals_tags",
    "ingredients",
    "image_ingredients_url",
    "checked",
    "nova_group_debug",
    "update_key",
    "countries_hierarchy",
    "max_imgid",
    "data_quality_errors_tags",
    "nutriscore_data",
    "manufacturing_places_tags",
    "image_nutrition_small_url",
    "additives_old_n",
    "ecoscore_tags",
    "no_nutrition_data",
    "cities_tags",
    "data_sources_tags",
    "pnns_groups_1_tags",
    "pnns_groups_1",
    "lang",
    "image_thumb_url",
    "ingredients_text_it",
    "generic_name_en",
    "editors",
    "ingredients_from_palm_oil_tags",
    "nova_groups",
    "data_quality_warnings_tags",
    "manufacturing_places",
    "categories_properties",
    "origins_hierarchy",
    "last_check_dates_tags",
    "last_checker",
    "categories_tags",
    "nutriments",
    "image_url",
    "nutriscore_grade",
    "languages_hierarchy",
    "product_name_de_debug_tags",
    "traces_from_user",
    "pnns_groups_2",
    "fruits-vegetables-nuts_100g_estimate",
    "nutrient_levels",
    "ingredients_debug",
    "amino_acids_prev_tags",
    "languages",
    "origins_old",
    "nutrition_grades",
    "ecoscore_score",
    "product_name",
    "nova_group",
    "product_name_en",
    "ingredients_from_or_that_may_be_from_palm_oil_n",
    "ingredients_text_debug_tags",
    "labels_lc",
    "environment_impact_level_tags",
    "completed_t",
    "product_name_it",
    "emb_codes_orig",
    "packaging_text_it",
    "debug_tags",
    "brands_tags",
    "additives_debug_tags",
    "sortkey",
    "states_tags",
    "ingredients_text_with_allergens_fr",
    "correctors_tags",
    "informers_tags",
    "product_name_fr",
    "origins_lc",
    "nutrition_grade_fr",
    "data_quality_info_tags",
    "ingredients_ids_debug",
    "purchase_places_tags",
    "image_nutrition_thumb_url",
    "ingredients_text_en",
    "last_modified_by",
    "additives_tags",
    "additives_original_tags",
    "last_image_t",
    "product_name_de",
    "other_nutritional_substances_tags",
    "ingredients_n_tags",
    "photographers",
    "editors_tags",
    "created_t",
    "traces_lc",
    "origins",
    "packaging_text",
    "additives_n",
    "ciqual_food_name_tags",
    "nutrition_data_per",
    "ingredients_text_de_debug_tags",
    "nova_group_tags",
    "packaging_text_en",
    "image_front_small_url",
    "link",
    "ingredients_text_with_allergens_en",
    "nutrition_grades_tags",
    "nutriscore_score_opposite",
    "teams",
    "checkers_tags",
    "environment_impact_level",
    */
};
