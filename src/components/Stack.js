class Stack {
    constructor(maxSize = 10) {
        this.items = [];
        this.maxSize = maxSize;
    }

    // Push element to the stack
    push(element) {
        if (this.isFull()) {
            throw new Error("Stack overflow: Cannot push to a full stack");
        }
        this.items.push(element);
        return this.items.length;
    }

    // Pop element from the stack
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: Cannot pop from an empty stack");
        }
        return this.items.pop();
    }

    // Peek at the top element
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    // Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Check if stack is full
    isFull() {
        return this.items.length >= this.maxSize;
    }

    // Get current size
    size() {
        return this.items.length;
    }

    // Clear the stack
    clear() {
        this.items = [];
    }

    // Convert stack to array (for display)
    toArray() {
        return [...this.items];
    }
}

export default Stack;