export const mdx = `
A **stack** is a last-in, first-out (LIFO) collection. Think of a pile of plates: you can only add a plate to the top, and you can only take a plate from the top.

## Operations

Stacks expose just a handful of operations:

- \`push(x)\` — add \`x\` to the top
- \`pop()\` — remove and return the top element
- \`peek()\` — look at the top element without removing it
- \`isEmpty()\` — check if the stack has any elements

Every operation is O(1).

## Implementation

The easiest way to implement a stack is with a dynamic array. Append to the end for push, pop the end for pop. That's it.

\`\`\`python
stack = []
stack.append(1)   # push
stack.append(2)
stack.append(3)
print(stack[-1])  # peek → 3
print(stack.pop()) # pop → 3
\`\`\`

## Why Stacks Matter

Stacks show up everywhere in programming:

- **Function calls** — the call stack is literally a stack
- **Undo/redo** — each action is pushed, undo pops
- **Parsing** — matching brackets and parentheses
- **Depth-first search** — we'll see this in the trees section

> **Note:** Anything that naturally "nests" is usually a stack problem.
`
