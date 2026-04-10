export const mdx = `
A **static array** is a fixed-size sequence of elements stored in contiguous memory. The size is decided up front and can't change.

## Key Properties

- **Contiguous memory** — every element sits right next to the previous one
- **Fixed size** — allocated once, never grows
- **O(1) random access** — jump to any index instantly

## Reading and Writing

Because elements are laid out contiguously, the address of \`arr[i]\` is easy to compute:

\`\`\`
address(arr[i]) = base_address + i * size_of_element
\`\`\`

That formula takes constant time, which is why reads and writes are O(1):

\`\`\`java
int[] nums = new int[5];
nums[2] = 42;        // O(1) write
int x = nums[2];     // O(1) read
\`\`\`

## Insertion and Deletion

The catch: inserting or deleting anywhere except the end is slow. To insert at index \`i\`, you have to shift every element from \`i\` onward one slot to the right. That's O(n).

| Operation | Time |
|---|---|
| Read / write by index | O(1) |
| Insert at end (if space) | O(1) |
| Insert in middle | O(n) |
| Delete from middle | O(n) |

> **Note:** Languages like Java and C use static arrays directly. Python and JavaScript give you dynamic arrays by default — we'll see those next.
`
