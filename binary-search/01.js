// 假设list增序
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

// 向左边界收敛
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

  if (left >= list.length) return -1; // 全部比target小，left + 1 溢出
  if (list[left] !== target) return -1; // 全部比target大，left = 0; left总是在mid右侧，故不会小于0

  return left
}
