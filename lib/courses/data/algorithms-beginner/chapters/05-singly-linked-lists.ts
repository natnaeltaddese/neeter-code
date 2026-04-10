export const mdx = `
A **singly linked list** is a sequence of nodes where each node holds a value and a pointer to the next node. Unlike arrays, linked list nodes don't have to sit next to each other in memory.

## Node Structure

Each node has two fields: a value and a \`next\` pointer. The list as a whole is tracked by a pointer to the first node (the **head**).

\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 1 → 2 → 3 → None
head = ListNode(1, ListNode(2, ListNode(3)))
\`\`\`

## Traversing

To visit every element, walk the \`next\` pointers until you hit \`None\`:

\`\`\`python
curr = head
while curr is not None:
    print(curr.val)
    curr = curr.next
\`\`\`

## Why Not Just Use Arrays?

Linked lists shine when you're inserting or deleting at the front: both are O(1) because you just rewire a pointer. Arrays would have to shift every subsequent element.

| Operation | Linked List | Array |
|---|---|---|
| Access by index | O(n) | O(1) |
| Insert at head | O(1) | O(n) |
| Insert at tail | O(n) or O(1) with tail pointer | O(1) amortized |
| Search | O(n) | O(n) |

> **Tip:** If you find yourself pushing to the front of an array repeatedly, a linked list might be a better fit.
`
