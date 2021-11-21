// 假设list增序 - 无法去除重复
exports.bs = function bs(list, target) {
  if (!list.length) return -1;

  let left = 0;
  let right = list.length - 1;

  while (left <= right) {
    // Math.floor 也行
    // (right + left) / 2  不溢出也可用
    const mid = Math.ceil(left + (right - left) / 2)

    if (target === list[mid]) {
      return mid;
    } else if (target > list[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// 向左边收敛 - 可去重复,取最左边第一个
exports.bs_left_boundary = function (list, target) {
  if (!list.length) return -1;
  let left = 0;
  let right = list.length - 1;

  while (left <= right) {
    let mid = Math.ceil(left + (right - left) / 2)

    if (target < list[mid]) { // 缩小范围到左半区
      right = mid - 1;
    } else if (target > list[mid]) { // 缩小范围到右半区
      left = mid + 1;
    } else {
      right = mid - 1; // 找到后，向左边收缩边界
    }
  }

  if (left >= list.length) return -1; // 全部比target小，left一直向右移动到溢出
  if (list[left] !== target) return -1; // 全部比target大，left = 0; left总是在mid右侧，故不会小于0

  return left // 别搞错了，当right在==target时候总会-1，向左收敛，返回left
}

// 向右边收敛 - 可去重复，取最右边第一个
exports.bs_right_boundary = function (list, target) {
  if (!list.length) return -1;
  let left = 0;
  let right = list.length - 1;

  while (left <= right) {
    let mid = Math.ceil(left + (right - left) / 2)

    if (target < list[mid]) { // 缩小范围到左半区
      right = mid - 1;
    } else if (target > list[mid]) { // 缩小范围到右半区
      left = mid + 1;
    } else {
      left = mid + 1; // 找到后，向右边收缩边界
    }
  }

  // 全部比target大,右边界(right)一直往左移动, right==left==0时，right变为-1,循环中止
  if (right < 0) return -1;
  // 全部比target小，right = list.length - 1不动，left不断向右移动,但总是不会大于right
  if (list[right] !== target) return -1;

  return right // 别搞错了
}
