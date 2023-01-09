import { animation, end_animation } from './animation.js';
import { sleep } from './sleep.js';
import { update_chart, update_chart_color } from './bar_chart.js';

export async function sort_array(chart) {
    switch (animation.algorithm_type) {
        case 'selection_sort':
            await selection_sort(chart);
            break;
        case 'bubble_sort':
            await bubble_sort(chart);
            break;
        case 'merge_sort':
            await merge_sort(chart);
            break;
        default:
            alert("Uh oh something broke...");
            break;
    }
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
    const timer_HTML = document.getElementById('elapsed_time');
    
    let time_at_start = Date.now() - animation.time_at_pause;

    for (let i = animation.state; i < arr_size - 1; i++) {
        animation.state = i;
        
        let min_i = i;

        for (let j = i + 1; j < arr_size; j++) {
            if (animation.array[j] < animation.array[min_i]) {
                min_i = j;
                update_chart_color(chart, j);
            }
        }

        swap(i, min_i);
        
        const time_elapsed = Date.now() - time_at_start;
        timer_HTML.innerHTML = `${time_elapsed}ms (${time_elapsed / 1000}s)`;
        
        time_at_start += await sleep(animation.sorting_speed);

        if (!animation.is_playing)
            break;
        else
            animation.time_at_pause = time_elapsed;
    }

    update_chart(chart);
    end_animation();
}

// Bubble sort.
async function bubble_sort(chart) {
    const arr_size = animation.array_size;
    const timer_HTML = document.getElementById('elapsed_time');

    let time_at_start = Date.now() - animation.time_at_pause;

    for (let i = animation.state; i < arr_size - 1; i++)
    {
        for (let j = 0; j < arr_size - i - 1; j++)
        {
            animation.state = j;
            
            if (animation.array[j] > animation.array[j + 1])
            {
                update_chart_color(chart, j + 1);
                swap(j, j + 1);
            }
            else {
                update_chart_color(chart);
            }

            const time_elapsed = Date.now() - time_at_start;
            timer_HTML.innerHTML = `${time_elapsed}ms (${time_elapsed / 1000}s)`;
            
            time_at_start += await sleep(animation.sorting_speed);

            if (!animation.is_playing)
            {
                animation.state = i;
                i = arr_size;
                break;
            }
            else {
                animation.time_at_pause = time_elapsed;
            }
        }
    }

    update_chart(chart);
    end_animation();
}

// Merge sort.
async function merge_sort(chart, left_i = 0, right_i = animation.array_size - 1) {
    if (left_i >= right_i)
        return;

    const middle_i = left_i + parseInt((right_i - left_i) / 2);

    await merge_sort(chart, left_i, middle_i);
    await merge_sort(chart, middle_i + 1, right_i);
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

    update_chart(chart);
    await sleep (animation.sorting_speed);
}
