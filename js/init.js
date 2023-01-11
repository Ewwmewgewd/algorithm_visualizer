import { animation } from './animation.js';
import { update_chart, bar_chart_init } from './bar_chart.js';
import { sort_array } from './algorithms.js';

// Initialize bar chart.
const ctx = document.getElementById('bar_chart');
const main_chart =  bar_chart_init(ctx, []);

animation.array = get_rand_array(animation.array_size, animation.max_value);
update_chart(main_chart);

// Input handling.
export const algorithm_type_input = document.getElementById('algorithm_type');
algorithm_type_input.addEventListener('change', () => {
    animation.algorithm_type = algorithm_type_input.value;
    reset_array();
});

export const sorting_speed_input = document.getElementById('sorting_speed');
sorting_speed_input.addEventListener('change', () => {
    animation.sorting_speed = +sorting_speed_input.value;
});

export const arr_size_input = document.getElementById('arr_size');
arr_size_input.addEventListener('change', () => {
    animation.array_size = +arr_size_input.value;
    reset_array();
});

export const max_val_input = document.getElementById('max_val');
max_val_input.addEventListener('change', () => {
    animation.max_value = +max_val_input.value;
    reset_array();
});

export const play_btn = document.getElementById('play_button');
play_btn.addEventListener('click', () => {
    if (animation.is_playing) {
        animation.is_playing = false;
        play_btn.innerHTML = 'PLAY';
    }
    else {
        animation.is_playing = true;
        play_btn.innerHTML = 'PAUSE';

        sort_array(main_chart);
    }
});

export const reset_btn = document.getElementById('reset_button');
reset_btn.addEventListener('click', reset_array);

// Array stuff.
function reset_array() {
    animation.is_playing = false;
    animation.array = get_rand_array(animation.array_size, animation.max_value);
    animation.state_i = 0;
    animation.state_j = 0;

    play_btn.innerHTML = 'PLAY';
    document.getElementById('elapsed_time').innerHTML = '0ms (0.0s)';
    animation.time_at_pause = 0;

    update_chart(main_chart);
}

function get_rand_array(arr_size, max_value) {
    let rand_arr = [];

    for (let i = 0; i < arr_size; i++) {
        rand_arr[i] = Math.floor(Math.random() * max_value + 1);
    }

    return rand_arr;
}
