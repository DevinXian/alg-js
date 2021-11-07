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

    if (target < list[mid]) {
      right = mid - 1;
    } else if (target > list[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1; // 相当查找左半区
    }
  }

  if (left >= list.length || list[left] !== target) return -1
  return left
}

