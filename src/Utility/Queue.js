// src/utils/ArtworkQueue.js
class ArtworkQueue {
    constructor(maxSize = 7) {
        this.queue = [];
        this.maxSize = maxSize;
    }

    // Add artwork to the queue
    enqueue(artwork) {
        // Check if artwork already exists in queue
        const exists = this.queue.some(item => item.artwork_id === artwork.artwork_id);
        if (exists) {
            return false; // Already in queue
        }

        // If queue is full, remove the oldest item
        if (this.queue.length >= this.maxSize) {
            this.dequeue();
        }

        // Add new artwork to the end of the queue
        this.queue.push(artwork);
        return true;
    }

    // Remove and return the oldest artwork from the queue
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift();
    }

    // Get all artworks in the queue (in display order)
    getQueue() {
        return [...this.queue]; // Return a copy to prevent direct manipulation
    }

    // Get the size of the queue
    size() {
        return this.queue.length;
    }

    // Check if queue is empty
    isEmpty() {
        return this.queue.length === 0;
    }

    // Check if queue is full
    isFull() {
        return this.queue.length >= this.maxSize;
    }

    // Clear the queue
    clear() {
        this.queue = [];
    }

    // Initialize queue from an array of artworks (for persistence)
    initializeFromArray(artworks) {
        this.clear();
        artworks.forEach(artwork => this.enqueue(artwork));
    }
}

export default ArtworkQueue;