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
