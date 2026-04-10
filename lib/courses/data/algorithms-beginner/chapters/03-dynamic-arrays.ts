export const mdx = `
Static arrays are fast but rigid. **Dynamic arrays** fix the rigidity: they grow as you append to them.

## How They Work

A dynamic array wraps a static array plus two numbers: the current **length** and the allocated **capacity**. When length reaches capacity, the array allocates a new, larger backing store (usually 2× the current size), copies the elements over, and frees the old one.

\`\`\`python
# In Python, list is a dynamic array
nums = []
nums.append(1)   # length=1, capacity=4
nums.append(2)   # length=2, capacity=4
nums.append(3)   # length=3, capacity=4
nums.append(4)   # length=4, capacity=4
nums.append(5)   # length=5, capacity=8 (grew!)
\`\`\`

## Amortized O(1) Append

Most appends are O(1): you just write to the next free slot. Occasionally, an append triggers a resize, which is O(n). But because resizes get rarer as the array grows, the **amortized** cost is O(1) — averaged over many operations.

## Other Operations

Inserting or deleting in the middle still shifts elements, so those remain O(n). Random access by index is still O(1) because the underlying storage is still contiguous.

| Operation | Time |
|---|---|
| Read / write by index | O(1) |
| Append to end | O(1) amortized |
| Insert in middle | O(n) |
| Delete from middle | O(n) |

> **Tip:** When you know the final size ahead of time, pre-allocate it. This avoids repeated resizing and can meaningfully speed up tight loops.
`
