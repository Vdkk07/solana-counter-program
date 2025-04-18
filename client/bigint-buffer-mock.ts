// bigint-buffer-mock.ts
export function toBufferLE(bigint: bigint, width: number) {
  return Buffer.alloc(width); // dummy buffer
}

export function toBigIntLE(buffer: Buffer) {
  return BigInt(0); // dummy value
}


