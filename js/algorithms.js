import { animation, end_animation } from './animation.js';
import { sleep } from './sleep.js';
import { update_chart, update_chart_color } from './bar_chart.js';

export async function sort_array(chart) {
    const timer_HTML = document.getElementById('elapsed_time');
    let is_running = true;

    switch (animation.algorithm_type) {
        case 'selection_sort':
            selection_sort(chart).then(() => { is_running = false; });
            break;
        case 'bubble_sort':
            bubble_sort(chart).then(() => { is_running = false; });
            break;
        case 'merge_sort':
            merge_sort(chart).then(() => { is_running = false; });
            break;
        default:
            alert("Uh oh something broke...");
            return;
    }

    const timer = async function() {
        const time_at_start = Date.now() - animation.time_at_pause;
        let time_elapsed = 0;
        
        while (is_running) {
            time_elapsed = Date.now() - time_at_start;
            timer_HTML.innerHTML = `${time_elapsed}ms (${time_elapsed / 1000}s)`;
            await sleep (150);
        }

        animation.time_at_pause = time_elapsed;
    };

    timer();
}

// Swap two numbers in the array.
function swap(x, y) {
    const temp = animation.array[y];
    animation.array[y] = animation.array[x];
    animation.array[x] = temp;
}

// Selection sort.
async function selection_sort(chart) {
    const arr_size = animation.array_size;

    for (let i = animation.state_i; i < arr_size - 1; i++) {
        animation.state_i = i;
        
        let min_i = i;

        for (let j = i + 1; j < arr_size; j++) {
            if (animation.array[j] < animation.array[min_i]) {
                min_i = j;
                update_chart_color(chart, j);
            }
        }

        swap(i, min_i);
        
        await sleep(animation.sorting_speed);

        if (!animation.is_playing)
            break;
    }

    update_chart(chart);
    end_animation();
}

// Bubble sort. (UNOPTIMIZED)
async function bubble_sort(chart) {
    const arr_size = animation.array_size;

    for (let i = animation.state_i; i < arr_size - 1; i++) {
        for (let j = animation.state_j; j < arr_size - i - 1; j++) {
            animation.state_i = j;

            if (animation.array[j] > animation.array[j + 1]) {
                update_chart_color(chart, j + 1);
                swap(j, j + 1);
            }
            else {
                update_chart_color(chart);
            }

            await sleep(animation.sorting_speed);

            if (!animation.is_playing) {
                animation.state_j = j;
                break;
            }
        }

        if (!animation.is_playing) {
            animation.state_i = i;
            break;
        }

        animation.state_j = 0;
    }

    update_chart(chart);
    end_animation();
}

// Merge sort.
async function merge_sort(chart) {
    await merge_sort_rec(chart);

    update_chart(chart);
    end_animation();
}

async function merge_sort_rec(chart, left_i = 0, right_i = animation.array_size - 1) {
    if (left_i >= right_i)
        return;

    const middle_i = left_i + parseInt((right_i - left_i) / 2);

    

    await merge_sort_rec(chart, left_i, middle_i);
    await merge_sort_rec(chart, middle_i + 1, right_i);

    if (!animation.is_playing) {
        // Find a way to save animation state.
        return;
    }

    await merge(chart, left_i, middle_i, right_i);
}

async function merge(chart, left_i, middle_i, right_i) {
    var n1 = middle_i - left_i + 1;
    var n2 = right_i - middle_i;

    // Temp arrays.
    let l_arr = new Array(n1);
    let r_arr = new Array(n2);

    // Copy data into temp arrays.
    for (let i = 0; i < n1; i++)
        l_arr[i] = animation.array[left_i + i];
    for (let j = 0; j < n2; j++)
        r_arr[j] = animation.array[middle_i + 1 + j];

    // Merge the temp arrays.
    var i = 0;
    var j = 0;
    var k = left_i;

    while (i < n1 && j < n2) {
        if (l_arr[i] <= r_arr[j]) {
            animation.array[k] = l_arr[i];
            i++;
        }
        else {
            animation.array[k] = r_arr[j];
            j++;
        }

        k++;
    }

    while (i < n1) {
        animation.array[k] = l_arr[i];
        i++;
        k++;
    }

    while (j < n2) {
        animation.array[k] = r_arr[j];
        j++;
        k++;
    }

    animation.state_i = left_i;
    update_chart_color(chart, right_i);
    await sleep (animation.sorting_speed);
}
