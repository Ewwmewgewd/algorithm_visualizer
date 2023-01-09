export const animation = {
    sorting_speed: 150, // ms
    array: [],
    array_size: 30,
    max_value: 100,
    state: 0,
    is_playing: false,
    algorithm_type: 'selection_sort',
    time_at_pause: 0,
    
    // Chart colors.
    default_color: 'rgba(54,  162, 235, 0.6)',
    index_color:   'rgba(172, 255, 47,  0.6)',
    swap_color:    'rgba(255, 0,   0,   0.6)'
};

export function end_animation() {
    animation.is_playing = false;
    document.getElementById('play_button').innerHTML = 'PLAY';
}
