export type WorkspaceLanguage = "python" | "javascript" | "java" | "cpp"

export type ProblemOperation = {
  signature: string
  description: string
}

export type ProblemExample = {
  title: string
  input: string
  output: string
}

export type ProblemTestCase = {
  label: string
  input: string
}

export type ProblemWorkspaceContent = {
  concept: string
  aliases: string[]
  className: string
  overview: string
  operations: ProblemOperation[]
  notes: string[]
  examples: ProblemExample[]
  constraints: string[]
  starterCode: Record<WorkspaceLanguage, string>
  testCases: ProblemTestCase[]
}

const dynamicArrayWorkspace: ProblemWorkspaceContent = {
  concept: "dynamic array",
  aliases: ["Resizable Array", "ArrayList", "vector"],
  className: "DynamicArray",
  overview:
    "Design a dynamic array class. The data structure should expose indexed reads/writes, support appending/removing from the end, and report its current capacity.",
  operations: [
    {
      signature: "DynamicArray(int capacity)",
      description: "Initialize an empty array with the provided capacity.",
    },
    {
      signature: "int get(int i)",
      description: "Return the element at index i. Assume 0 <= i < length.",
    },
    {
      signature: "void set(int i, int n)",
      description: "Set the element at index i to n.",
    },
    {
      signature: "void pushback(int n)",
      description: "Add element n to the end of the array.",
    },
    {
      signature: "int popback()",
      description: "Remove and return the element at the end of the array.",
    },
    {
      signature: "int getCapacity()",
      description: "Return the current capacity of the array.",
    },
  ],
  notes: [
    "If pushback() is called when the array is full, double the capacity before inserting the new element.",
  ],
  examples: [
    {
      title: "Example 1:",
      input: `["push", 1, "getCap", "push", 2]`,
      output: `[null, null, 1, null]`,
    },
  ],
  constraints: ["1 <= capacity <= 1000", "0 <= n <= 1000"],
  starterCode: {
    python: `class DynamicArray:
    def __init__(self, capacity: int):
        pass

    def get(self, i: int) -> int:
        pass

    def set(self, i: int, n: int) -> None:
        pass

    def pushback(self, n: int) -> None:
        pass

    def popback(self) -> int:
        pass

    def getCapacity(self) -> int:
        pass
`,
    javascript: `class DynamicArray {
  constructor(capacity) {}

  get(i) {}

  set(i, n) {}

  pushback(n) {}

  popback() {}

  getCapacity() {}
}
`,
    java: `class DynamicArray {
    public DynamicArray(int capacity) {}

    public int get(int i) { return 0; }

    public void set(int i, int n) {}

    public void pushback(int n) {}

    public int popback() { return 0; }

    public int getCapacity() { return 0; }
}
`,
    cpp: `class DynamicArray {
public:
    DynamicArray(int capacity) {}

    int get(int i) {}

    void set(int i, int n) {}

    void pushback(int n) {}

    int popback() {}

    int getCapacity() {}
};
`,
  },
  testCases: [
    {
      label: "Case 1",
      input: "capacity = 1\nops = [push(1), get(0), pushback(2)]",
    },
    {
      label: "Case 2",
      input: "capacity = 2\nops = [push(5), push(6), popback()]",
    },
    {
      label: "Case 3",
      input: "capacity = 4\nops = [getCapacity(), push(9)]",
    },
  ],
}

export const problemWorkspaceById: Record<string, ProblemWorkspaceContent> = {
  "design-dynamic-array": dynamicArrayWorkspace,
}

export const showcaseProblemWorkspace = dynamicArrayWorkspace

export function getProblemWorkspaceContent(
  id: string
): ProblemWorkspaceContent {
  return problemWorkspaceById[id] ?? showcaseProblemWorkspace
}
