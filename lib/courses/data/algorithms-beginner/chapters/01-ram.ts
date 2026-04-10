export const mdx = `
Before we talk about data structures, we need a simple mental model for how your computer stores data. That model is **Random Access Memory** — RAM.

## What is RAM?

Think of RAM as a giant row of boxes. Each box can hold a single byte, and each box has a unique address (an index). When your program runs, variables and arrays live in these boxes.

The key property of RAM is right there in the name: **random access**. You can jump to any address in constant time — O(1) — without scanning the boxes in between.

## Why This Matters

Because accessing any address is O(1), operations like "read the i-th element of an array" are instant. This is the foundation for why arrays are so fast.

\`\`\`python
# Reading arr[5] takes the same amount of time as reading arr[5000]
arr = [10, 20, 30, 40, 50, 60]
print(arr[5])  # O(1)
\`\`\`

## Memory Has Limits

RAM is fast but finite. When we talk about **space complexity** later, we're talking about how much RAM an algorithm uses. A program that uses less memory can run on more machines and scale to larger inputs.

> **Remember:** Every data structure in this course is ultimately a pattern for arranging bytes in RAM. Keep that picture in the back of your mind.
`
