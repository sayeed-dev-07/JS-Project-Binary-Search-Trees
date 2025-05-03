export default function mergeSort(arr) {
    let mid = Math.floor(arr.length / 2);
    if (arr.length <= 1) {
        return arr;
    }
    let leftSide = mergeSort(arr.slice(0, mid));
    let rightSide = mergeSort(arr.slice(mid));

    return merge(leftSide, rightSide);
}

function merge(first, last) {
    let i = 0;
    let j = 0;
    let nArr = [];

    while (i < first.length && j < last.length) {
        if (first[i] < last[j]) {
            nArr.push(first[i]);
            i++;
        } else {
            nArr.push(last[j]);
            j++;
        }
    }
    let sorted = nArr.concat(first.slice(i)).concat(last.slice(j));
    return duplicateRmv(sorted);
}

function duplicateRmv(arr) {
    let prev = null;
    let newArr = arr.filter((element) => {
        if (element !== prev) {
            prev = element;
            return true;
        }
        prev = element;
        return false;
    });
    return newArr;
}
