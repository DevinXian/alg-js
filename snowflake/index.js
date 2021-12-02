// 题外话  Number.MAX_SAFE_INTEGER 为 2^53 - 1 IEEE754规范，64位 = 1位符号位 + 11指数 + 52位尾数
/**
 * twitter 64位ID雪花算法
 * 1位空置
 * 41位时间戳 2^41 个数 [0, 2^41-1]
 * 5位数据中心ID 2^5 [0...31]
 * 5为机器ID 2^5 [0...31]
 * 12位递增序列 2^12 [0...4095]
 */
const workerIdBits = 5n;
const maxWorkerId = -1n ^ (-1n << workerIdBits);
const dcIdBits = 5n;
const maxDcId = -1n ^ (-1n << dcIdBits);
const sequenceBits = 12n;
const sequenceMask = -1n ^ (-1n << sequenceBits)

const baseTime = 949334400000n; // 2020-1-1
const workerIdShift = sequenceBits; // 12
const dcIdShift = sequenceBits + workerIdBits; // 17
const timestampLeftShift = sequenceBits + workerIdBits + dcIdBits; // 22

// 必须全程使用 js BigInt
class Snowflake {
  constructor({ workerId, dcId, sequence }) {
    if (workerId > maxWorkerId || workerId < 0) throw new TypeError('workerId invalid')
    if (dcId > maxDcId || dcId < 0) throw new TypeError('dcId invalid')

    this.workerId = workerId;
    this.dcId = dcId;
    this.sequence = sequence & sequenceMask;
    this.lastTimestamp = 0n;
  }

  waitNextMilliseconds(target) {
    let temp = Date.now();
    while (temp <= target) {
      temp = Date.now();
    }
    return BigInt(temp); // 终于大于 this.lastTimestamp
  }

  nextId() {
    let timestamp = BigInt(Date.now());

    if (timestamp < this.lastTimestamp) {
      throw new Error('Clock move backwards!')
    }

    // 同一毫秒内
    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1n) & sequenceMask;

      if (this.sequence === 0n) {
        timestamp = this.waitNextMilliseconds(this.lastTimestamp);
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    return ((timestamp - baseTime) << timestampLeftShift) //  262 不指定BigInt，返回是32整数，左侧溢出变负数了
      | (this.dcId << dcIdShift)
      | (this.workerId << workerIdShift)
      | this.sequence
  }
}

console.time('my');
const inst = new Snowflake({
  workerId: 2n,
  dcId: 3n,
  sequence: 1n,
})
for (let i = 0; i < 10; i++) {
  console.log(inst.nextId())
}
console.timeEnd('my')