/**
 * 算法时间复杂度O(n^2)
 */
exports.dp = function (list) {
  if (!list || !list.length) return 0;

  /**
   * 思路分析:
   * 1. 增长序列如何变长？
   *    易设以当前元素结尾的增长序列长度为dp[i]，若后续元素满足递增，则增长序列长度增加
   * 2. 初始状态，子序列起码包含元素自身，所以dp均初始化为1
   * 3. dp如何转移？  dp[0..i-1] => dp[i]
   *    遍历 dp[0..i-1]，相当于拿到前面每个增长子序列，查看当前元素i是否依旧满足递增，满足则当前元素拟加入该增长子序列，保留最大
   */

  // 保存当前元素所在序列最大长度
  const dp = new Array(list.length).fill(1);

  // 从每个元素出发，寻找最长子序列
  for (let i = 0; i < list.length; i++) {
    // 从dp[0..i-1]找 Max(dp[i])
    for (let j = 0; j < i; j++) {
      // 大于前序，则前序长度+1，并取最大值
      if (list[i] > list[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  // 寻找最大值 - 可能有多段或者交叉增长子序列，跟i无关，所以需要遍历
  return dp.reduce((prev, curr) => Math.max(prev, curr), dp[0]);
};

/**
 * 这个算法纯属书中记载，确实想不到；尝试解析一二
 * 算法过程类似纸牌堆叠成若干堆，规则如下：
 * 1. 小压大
 * 2. 当前牌不满足条件1，则新起牌堆
 * 3. 多个牌堆可选，放左边；因为要满足有序顶部；
 *    举例：顶部有3和4（注意，因条件1，不可能是3和4），则2放在左侧，可有[2,4]排列，反过来则不成立
 * 4. 则最后堆数即为结果
 *    解析：1跟2保证了每个牌堆至少有一个元素是大于上一个牌堆某元素（典型为最上面牌)，则堆数就是最长递增子序列
 */
exports.piles = function (list) {
  if (!list || !list.length) return 0;

  let result = 0; // 堆数
  const top = []; // 保存每个堆顶部的元素

  for (let i = 0; i < list.length; i++) {
    const ele = list[i];

    // 找堆-往左边放-找左侧边界的二分查找法
    let left = 0;
    let right = result - 1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      if (top[mid] > ele) {
        right = mid - 1;
      } else if (top[mid] < ele) {
        left = mid + 1;
      } else {
        right = mid - 1; // 相等则向左侧收敛边界
      }
    }

    // 没找到牌堆，left都溢出了，则新起一堆
    if (left === result) result += 1;

    // 放堆顶元素 --- ps：进一步可以存数组，方便直观查看LIS
    top[left] = ele;
  }

  return result;
};
